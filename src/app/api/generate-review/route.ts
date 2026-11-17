import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const CONDITIONS = new Set([
  "Back / Neck Pain",
  "Knee / Joint Pain",
  "Post-Surgery Rehab",
  "Sports Injury (ACL / Muscle)",
  "Frozen Shoulder / Sciatica",
  "Home Physiotherapy Visit",
]);

const DOCTORS = new Set([
  "Dr. Prajwal L Naik",
  "Dr. Bhavana R",
  "Arjun (Nutrition & Dietetics)",
  "Entire Clinic Team",
]);

const HIGHLIGHTS = new Set([
  "Significant Pain Relief",
  "Clear Exercise Guidance",
  "Punctual Home Visits",
  "Caring & Patient Staff",
  "Clean & Well-Equipped Clinic",
  "Convenient Doddaballapura Location",
]);

const MAX_ADDITIONAL_FEEDBACK = 400;
const MAX_BODY_BYTES = 8_192;

const PRIMARY_MODEL = "gemini-3.8-flash";
const FALLBACK_MODEL = "gemini-3.5-flash-lite";
const REQUEST_TIMEOUT_MS = 15_000;
const PRIMARY_MAX_ATTEMPTS = 3; // initial + 2 retries on 503/unavailable
const FALLBACK_MAX_ATTEMPTS = 2; // initial + 1 retry on 503/unavailable
const PRIMARY_BACKOFF_MS = [500, 1500];
const FALLBACK_BACKOFF_MS = [500];

type RateBucket = { count: number; resetAt: number };
const rateBuckets = new Map<string, RateBucket>();
const RATE_LIMIT = 10;
const RATE_WINDOW_MS = 60_000;

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() || "unknown";
  return req.headers.get("x-real-ip") || "unknown";
}

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const bucket = rateBuckets.get(ip);
  if (!bucket || now > bucket.resetAt) {
    rateBuckets.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS });
    return true;
  }
  if (bucket.count >= RATE_LIMIT) return false;
  bucket.count += 1;
  return true;
}

function parseJsonArray(text: string): unknown {
  const trimmed = text.trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("[");
    const end = trimmed.lastIndexOf("]");
    if (start !== -1 && end !== -1 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error("Invalid JSON");
  }
}

function normalizeReviews(value: unknown): string[] | null {
  let arr: unknown = value;
  if (arr && typeof arr === "object" && !Array.isArray(arr) && "reviews" in arr) {
    arr = (arr as { reviews: unknown }).reviews;
  }
  if (!Array.isArray(arr) || arr.length !== 3) return null;
  const reviews = arr.map((item) => (typeof item === "string" ? item.trim() : ""));
  if (reviews.some((r) => r.length === 0)) return null;
  return reviews;
}

type GeminiErrorDetails = {
  name: string;
  status?: number | string;
  code?: number | string;
  message: string;
  unavailable: boolean;
  quota: boolean;
  auth: boolean;
  timeout: boolean;
};

function getGeminiErrorDetails(error: unknown): GeminiErrorDetails {
  const err = error as {
    message?: unknown;
    status?: unknown;
    code?: unknown;
    name?: unknown;
    error?: { status?: unknown; code?: unknown; message?: unknown };
  };
  const status =
    typeof err?.status === "number" || typeof err?.status === "string"
      ? err.status
      : typeof err?.error?.status === "string" || typeof err?.error?.code === "number"
        ? (err.error.status ?? err.error.code)
        : undefined;
  const code =
    typeof err?.code === "number" || typeof err?.code === "string"
      ? err.code
      : typeof err?.error?.code === "number" || typeof err?.error?.code === "string"
        ? err.error.code
        : undefined;
  const normalizedStatus: number | string | undefined =
    typeof status === "number" || typeof status === "string" ? status : undefined;
  const normalizedCode: number | string | undefined =
    typeof code === "number" || typeof code === "string" ? code : undefined;
  const message =
    typeof err?.message === "string"
      ? err.message
      : typeof err?.error?.message === "string"
        ? err.error.message
        : String(error);
  const name = typeof err?.name === "string" ? err.name : "Error";
  const combined = `${status ?? ""} ${code ?? ""} ${message}`.toLowerCase();
  return {
    name,
    status: normalizedStatus,
    code: normalizedCode,
    message: message.slice(0, 300),
    unavailable: /503|unavailable|high demand|overloaded/.test(combined),
    quota: /429|quota|rate|resource.?exhausted/.test(combined),
    auth: /401|403|permission|unauth|api key/.test(combined),
    timeout:
      /504|deadline|timeout|timed out|aborted|aborterror/.test(combined) ||
      name === "AbortError",
  };
}

function safeLog(event: string, data: Record<string, unknown>) {
  if (process.env.NODE_ENV === "production") return;
  console.info(`[generate-review] ${event}`, data);
}

function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function generateWithModel(
  ai: GoogleGenAI,
  model: string,
  prompt: string,
  maxAttempts: number,
  backoffMs: number[]
): Promise<
  | { ok: true; text: string; attempts: number }
  | { ok: false; error: unknown; attempts: number; lastUnavailable: boolean }
> {
  let lastError: unknown = null;
  let attempts = 0;
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    attempts = attempt;
    safeLog("model_attempt", { model, attempt, maxAttempts });
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          temperature: 0.8,
          responseMimeType: "application/json",
          abortSignal: controller.signal,
          httpOptions: { timeout: REQUEST_TIMEOUT_MS },
        },
      });
      clearTimeout(timeout);
      const text = response.text;
      if (!text) {
        return { ok: false, error: new Error("Empty response text"), attempts, lastUnavailable: false };
      }
      return { ok: true, text, attempts };
    } catch (error) {
      clearTimeout(timeout);
      lastError = error;
      const details = getGeminiErrorDetails(error);
      safeLog("model_attempt_failed", {
        model,
        attempt,
        maxAttempts,
        status: details.status ?? null,
        code: details.code ?? null,
        unavailable: details.unavailable,
        quota: details.quota,
        auth: details.auth,
        timeout: details.timeout,
        message: details.message,
      });
      if (details.unavailable && attempt < maxAttempts) {
        const delay = backoffMs[Math.min(attempt - 1, backoffMs.length - 1)] ?? 1000;
        safeLog("model_retry_scheduled", { model, nextAttempt: attempt + 1, delayMs: delay });
        await wait(delay);
        continue;
      }
      return { ok: false, error, attempts, lastUnavailable: details.unavailable };
    }
  }
  const details = getGeminiErrorDetails(lastError);
  return { ok: false, error: lastError, attempts, lastUnavailable: details.unavailable };
}

export async function POST(req: Request) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please try again shortly." },
        { status: 429 }
      );
    }

    const contentLength = req.headers.get("content-length");
    if (contentLength && Number(contentLength) > MAX_BODY_BYTES) {
      return NextResponse.json({ error: "Request too large." }, { status: 413 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Review generation is not configured." },
        { status: 500 }
      );
    }

    let body: unknown;
    try {
      const raw = await req.text();
      if (raw.length > MAX_BODY_BYTES) {
        return NextResponse.json({ error: "Request too large." }, { status: 413 });
      }
      body = raw ? JSON.parse(raw) : null;
    } catch {
      return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json({ error: "Invalid request." }, { status: 400 });
    }

    const { conditions, specialists, highlights, additionalFeedback } = body as {
      conditions?: unknown;
      specialists?: unknown;
      highlights?: unknown;
      additionalFeedback?: unknown;
    };

    const validateStringArray = (
      value: unknown,
      allowed: Set<string>,
      fieldName: string
    ): string[] | NextResponse => {
      if (!Array.isArray(value) || value.length === 0) {
        return NextResponse.json(
          { error: `Invalid ${fieldName}.` },
          { status: 400 }
        );
      }
      const seen = new Set<string>();
      const cleaned: string[] = [];
      for (const item of value) {
        if (typeof item !== "string" || !allowed.has(item)) {
          return NextResponse.json(
            { error: `Invalid ${fieldName}.` },
            { status: 400 }
          );
        }
        if (!seen.has(item)) {
          seen.add(item);
          cleaned.push(item);
        }
      }
      if (cleaned.length === 0) {
        return NextResponse.json(
          { error: `Invalid ${fieldName}.` },
          { status: 400 }
        );
      }
      return cleaned;
    };

    const conditionsResult = validateStringArray(conditions, CONDITIONS, "conditions");
    if (conditionsResult instanceof NextResponse) return conditionsResult;
    const cleanConditions = conditionsResult;

    const specialistsResult = validateStringArray(specialists, DOCTORS, "specialists");
    if (specialistsResult instanceof NextResponse) return specialistsResult;
    const cleanSpecialists = specialistsResult;

    const highlightsResult = validateStringArray(highlights, HIGHLIGHTS, "highlights");
    if (highlightsResult instanceof NextResponse) return highlightsResult;
    const cleanHighlights = highlightsResult;

    let feedback = "";
    if (additionalFeedback !== undefined && additionalFeedback !== null && additionalFeedback !== "") {
      if (typeof additionalFeedback !== "string") {
        return NextResponse.json({ error: "Invalid additional feedback." }, { status: 400 });
      }
      feedback = additionalFeedback.trim().slice(0, MAX_ADDITIONAL_FEEDBACK);
    }

    const formatList = (items: string[]) => items.join(", ");

    const feedbackInstruction = feedback
      ? `Additional patient feedback (must be incorporated naturally into ALL THREE variations, preserving its meaning, without copying it verbatim and without adding unsupported claims):\n"""${feedback}"""\n- Variation 1: introduce this feedback in its opening sentence.\n- Variation 2: incorporate this feedback into the middle.\n- Variation 3: express this feedback using a different natural sentence structure.`
      : "No additional feedback was provided. Base the reviews on the selected conditions/services, specialists and highlights only.";

    const prompt = `You write Google review suggestions for PRAJWAL PHYSIOTHERAPY REHAB CENTRE in Doddaballapura, Karnataka, India.

Task: Generate exactly 3 distinct Google review variations as a JSON array of 3 strings.

Patient selections (arrays; do not awkwardly list every item, do not invent details, and weave them naturally):
- Conditions/Services: ${formatList(cleanConditions)}
- Specialist(s): ${formatList(cleanSpecialists)}
- Highlights: ${formatList(cleanHighlights)}

${feedbackInstruction}

Strict rules:
- Return ONLY a valid JSON array of exactly 3 strings. No markdown, no commentary.
- Each review must be approximately 30-55 words and use 2-3 short sentences.
- Warm, natural, conversational Indian-English tone.
- Naturally reflect the selected condition(s)/service(s) and the selected specialist(s)/team where appropriate, without forcing an unnatural list.
- Include "Doddaballapura" naturally in each review.
- Avoid repetitive opening sentences across the 3 variations.
- No emojis, no hashtags, no exaggerated marketing language.
- Never invent treatments, recovery outcomes, timelines, or specific patient experiences beyond what is provided.
- Do not make medical claims or guarantees.
- Keep each review suitable to be posted as a genuine patient Google review.`;

    const ai = new GoogleGenAI({ apiKey });

    safeLog("generation_start", { primaryModel: PRIMARY_MODEL, fallbackModel: FALLBACK_MODEL });

    let result = await generateWithModel(
      ai,
      PRIMARY_MODEL,
      prompt,
      PRIMARY_MAX_ATTEMPTS,
      PRIMARY_BACKOFF_MS
    );

    let fallbackUsed = false;
    let fallbackSucceeded = false;

    if (!result.ok) {
      const primaryDetails = getGeminiErrorDetails(result.error);
      if (primaryDetails.quota) {
        safeLog("generation_failed", {
          model: PRIMARY_MODEL,
          fallbackUsed,
          fallbackSucceeded,
          status: primaryDetails.status ?? null,
          message: primaryDetails.message,
        });
        return NextResponse.json(
          { error: "The service is busy. Please try again in a moment." },
          { status: 429 }
        );
      }
      if (primaryDetails.auth) {
        safeLog("generation_failed", {
          model: PRIMARY_MODEL,
          fallbackUsed,
          fallbackSucceeded,
          status: primaryDetails.status ?? null,
          message: primaryDetails.message,
        });
        return NextResponse.json(
          { error: "Could not generate reviews. Please try again." },
          { status: 502 }
        );
      }
      if (primaryDetails.unavailable || primaryDetails.timeout) {
        safeLog("primary_unavailable_try_fallback", {
          model: PRIMARY_MODEL,
          attempts: result.attempts,
          status: primaryDetails.status ?? null,
          message: primaryDetails.message,
          fallbackModel: FALLBACK_MODEL,
        });
        fallbackUsed = true;
        result = await generateWithModel(
          ai,
          FALLBACK_MODEL,
          prompt,
          FALLBACK_MAX_ATTEMPTS,
          FALLBACK_BACKOFF_MS
        );
        if (result.ok) {
          fallbackSucceeded = true;
          safeLog("fallback_succeeded", { model: FALLBACK_MODEL, attempts: result.attempts });
        } else {
          const fallbackDetails = getGeminiErrorDetails(result.error);
          safeLog("fallback_failed", {
            model: FALLBACK_MODEL,
            attempts: result.attempts,
            status: fallbackDetails.status ?? null,
            code: fallbackDetails.code ?? null,
            unavailable: fallbackDetails.unavailable,
            quota: fallbackDetails.quota,
            timeout: fallbackDetails.timeout,
            message: fallbackDetails.message,
          });
          if (fallbackDetails.quota) {
            return NextResponse.json(
              { error: "The service is busy. Please try again in a moment." },
              { status: 429 }
            );
          }
          if (fallbackDetails.unavailable || fallbackDetails.timeout) {
            return NextResponse.json(
              {
                error:
                  "The review assistant is temporarily unavailable due to high demand. Please try again in a moment.",
              },
              { status: 503 }
            );
          }
          return NextResponse.json(
            { error: "Could not generate reviews. Please try again." },
            { status: 502 }
          );
        }
      } else {
        safeLog("generation_failed", {
          model: PRIMARY_MODEL,
          fallbackUsed,
          fallbackSucceeded,
          status: primaryDetails.status ?? null,
          message: primaryDetails.message,
        });
        return NextResponse.json(
          { error: "Could not generate reviews. Please try again." },
          { status: 502 }
        );
      }
    }

    safeLog("generation_result", {
      primaryModel: PRIMARY_MODEL,
      fallbackModel: FALLBACK_MODEL,
      fallbackUsed,
      fallbackSucceeded,
      attempts: result.attempts,
    });

    if (!result.ok) {
      return NextResponse.json(
        {
          error:
            "The review assistant is temporarily unavailable due to high demand. Please try again in a moment.",
        },
        { status: 503 }
      );
    }

    const text = result.text;
    if (!text) {
      safeLog("response_missing_text", { fallbackUsed, fallbackSucceeded });
      return NextResponse.json(
        { error: "Could not generate reviews. Please try again." },
        { status: 502 }
      );
    }

    let parsed: unknown;
    try {
      parsed = parseJsonArray(text);
    } catch {
      safeLog("response_parse_failed", { fallbackUsed, fallbackSucceeded });
      return NextResponse.json(
        { error: "Received an invalid response. Please try again." },
        { status: 502 }
      );
    }

    const reviews = normalizeReviews(parsed);
    if (!reviews) {
      safeLog("response_invalid_reviews", { fallbackUsed, fallbackSucceeded });
      return NextResponse.json(
        { error: "Received an invalid response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reviews });
  } catch (error) {
    safeLog("unexpected_route_error", {
      name: error instanceof Error ? error.name : "Error",
      message: error instanceof Error ? error.message.slice(0, 200) : "Unknown error",
    });
    return NextResponse.json(
      { error: "Could not generate reviews. Please try again." },
      { status: 502 }
    );
  }
}
