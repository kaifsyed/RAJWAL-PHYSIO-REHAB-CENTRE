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

function getGeminiErrorDetails(error: unknown) {
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
  const message =
    typeof err?.message === "string"
      ? err.message
      : typeof err?.error?.message === "string"
        ? err.error.message
        : String(error);
  const name = typeof err?.name === "string" ? err.name : "Error";
  return { name, status, code, message: message.slice(0, 500) };
}

function logGeminiFailure(stage: string, error: unknown) {
  if (process.env.NODE_ENV === "production") return;
  const details = getGeminiErrorDetails(error);
  console.error(`[generate-review] ${stage}`, details);
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

    const { condition, doctor, highlights, additionalFeedback } = body as {
      condition?: unknown;
      doctor?: unknown;
      highlights?: unknown;
      additionalFeedback?: unknown;
    };

    if (typeof condition !== "string" || !CONDITIONS.has(condition)) {
      return NextResponse.json({ error: "Invalid condition." }, { status: 400 });
    }
    if (typeof doctor !== "string" || !DOCTORS.has(doctor)) {
      return NextResponse.json({ error: "Invalid specialist selection." }, { status: 400 });
    }
    if (!Array.isArray(highlights)) {
      return NextResponse.json({ error: "Invalid highlights." }, { status: 400 });
    }
    const cleanHighlights = highlights.filter(
      (h): h is string => typeof h === "string" && HIGHLIGHTS.has(h)
    );
    if (cleanHighlights.length === 0 || cleanHighlights.length !== highlights.length) {
      return NextResponse.json({ error: "Invalid highlights." }, { status: 400 });
    }

    let feedback = "";
    if (additionalFeedback !== undefined && additionalFeedback !== null && additionalFeedback !== "") {
      if (typeof additionalFeedback !== "string") {
        return NextResponse.json({ error: "Invalid additional feedback." }, { status: 400 });
      }
      feedback = additionalFeedback.trim().slice(0, MAX_ADDITIONAL_FEEDBACK);
    }

    const feedbackInstruction = feedback
      ? `Additional patient feedback (must be incorporated naturally into ALL THREE variations, preserving its meaning, without copying it verbatim and without adding unsupported claims):\n"""${feedback}"""\n- Variation 1: introduce this feedback in its opening sentence.\n- Variation 2: incorporate this feedback into the middle.\n- Variation 3: express this feedback using a different natural sentence structure.`
      : "No additional feedback was provided. Base the reviews on the selected condition, specialist and highlights only.";

    const prompt = `You write Google review suggestions for PRAJWAL PHYSIOTHERAPY REHAB CENTRE in Doddaballapura, Karnataka, India.

Task: Generate exactly 3 distinct Google review variations as a JSON array of 3 strings.

Patient selections:
- Condition/Service: ${condition}
- Specialist: ${doctor}
- Highlights: ${cleanHighlights.join(", ")}

${feedbackInstruction}

Strict rules:
- Return ONLY a valid JSON array of exactly 3 strings. No markdown, no commentary.
- Each review must be approximately 30-55 words and use 2-3 short sentences.
- Warm, natural, conversational Indian-English tone.
- Naturally mention the selected condition/service and the selected specialist where appropriate.
- Include "Doddaballapura" naturally in each review.
- Avoid repetitive opening sentences across the 3 variations.
- No emojis, no hashtags, no exaggerated marketing language.
- Never invent treatments, recovery outcomes, timelines, or specific patient experiences beyond what is provided.
- Do not make medical claims or guarantees.
- Keep each review suitable to be posted as a genuine patient Google review.`;

    const ai = new GoogleGenAI({ apiKey });
    let response;
    try {
      response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          temperature: 0.8,
          responseMimeType: "application/json",
        },
      });
    } catch (error) {
      logGeminiFailure("Gemini API request failed", error);
      const details = getGeminiErrorDetails(error);
      const combined = `${details.status ?? ""} ${details.code ?? ""} ${details.message}`.toLowerCase();
      const unavailable = /503|unavailable|high demand|overloaded/.test(combined);
      const quota = /429|quota|rate|resource.?exhausted/.test(combined);
      const auth = /401|403|permission|unauth|api key|invalid argument/.test(combined);
      if (quota) {
        return NextResponse.json(
          { error: "The service is busy. Please try again in a moment." },
          { status: 429 }
        );
      }
      if (unavailable) {
        return NextResponse.json(
          { error: "The service is temporarily unavailable. Please try again shortly." },
          { status: 503 }
        );
      }
      if (auth) {
        return NextResponse.json(
          { error: "Could not generate reviews. Please try again." },
          { status: 502 }
        );
      }
      return NextResponse.json(
        { error: "Could not generate reviews. Please try again." },
        { status: 502 }
      );
    }

    const text = response.text;
    if (!text) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[generate-review] Gemini response missing text");
      }
      return NextResponse.json(
        { error: "Could not generate reviews. Please try again." },
        { status: 502 }
      );
    }

    let parsed: unknown;
    try {
      parsed = parseJsonArray(text);
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[generate-review] Failed to parse Gemini JSON response");
      }
      return NextResponse.json(
        { error: "Received an invalid response. Please try again." },
        { status: 502 }
      );
    }

    const reviews = normalizeReviews(parsed);
    if (!reviews) {
      if (process.env.NODE_ENV !== "production") {
        console.error("[generate-review] Gemini response did not contain exactly 3 review strings");
      }
      return NextResponse.json(
        { error: "Received an invalid response. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ reviews });
  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("[generate-review] Unexpected route error", {
        name: error instanceof Error ? error.name : "Error",
        message: error instanceof Error ? error.message.slice(0, 200) : "Unknown error",
      });
    }
    return NextResponse.json(
      { error: "Could not generate reviews. Please try again." },
      { status: 502 }
    );
  }
}
