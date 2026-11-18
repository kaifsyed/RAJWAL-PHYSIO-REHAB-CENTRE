"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type ComponentType } from "react";
import {
  Accessibility,
  Activity,
  Apple,
  Bone,
  BriefcaseMedical,
  Check,
  ChevronLeft,
  Clock,
  Copy,
  Dumbbell,
  ExternalLink,
  HeartHandshake,
  HeartPulse,
  House,
  Loader2,
  MapPin,
  Sparkles,
  Stethoscope,
  UserRound,
  Users,
} from "lucide-react";
import { LOGO_PATH } from "@/lib/site";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

export const GOOGLE_REVIEW_URL =
  "https://search.google.com/local/writereview?placeid=ChIJrw_MRQDfsTsROOWnc3M-ROo";
const MAX_FEEDBACK_LENGTH = 400;

type OptionItem = {
  label: string;
  icon: ComponentType<{ className?: string }>;
};

const CONDITIONS: OptionItem[] = [
  { label: "Back / Neck Pain", icon: Activity },
  { label: "Knee / Joint Pain", icon: Bone },
  { label: "Post-Surgery Rehab", icon: BriefcaseMedical },
  { label: "Sports Injury (ACL / Muscle)", icon: Dumbbell },
  { label: "Frozen Shoulder / Sciatica", icon: Accessibility },
  { label: "Home Physiotherapy Visit", icon: House },
];

const DOCTORS: OptionItem[] = [
  { label: "Dr. Prajwal L Naik", icon: Stethoscope },
  { label: "Dr. Bhavana R", icon: UserRound },
  { label: "Arjun (Nutrition & Dietetics)", icon: Apple },
  { label: "Entire Clinic Team", icon: Users },
];

const HIGHLIGHTS: OptionItem[] = [
  { label: "Significant Pain Relief", icon: HeartPulse },
  { label: "Clear Exercise Guidance", icon: Dumbbell },
  { label: "Punctual Home Visits", icon: Clock },
  { label: "Caring & Patient Staff", icon: HeartHandshake },
  { label: "Clean & Well-Equipped Clinic", icon: Sparkles },
  { label: "Convenient Doddaballapura Location", icon: MapPin },
];

type Step = 1 | 2 | 3;

function pushDataLayer(event: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(event);
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 text-sm font-semibold text-charcoal sm:text-base">{children}</h2>
  );
}

function OptionCard({
  item,
  selected,
  onClick,
  compact = false,
}: {
  item: OptionItem;
  selected: boolean;
  onClick: () => void;
  compact?: boolean;
}) {
  const Icon = item.icon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={cn(
        "group flex h-full min-h-[84px] w-full min-w-0 flex-col items-center justify-center rounded-xl border text-center transition-all focus:outline-none focus:ring-2 focus:ring-deep-teal focus:ring-offset-2 sm:min-h-[96px]",
        compact ? "gap-1 px-1.5 py-2.5 sm:px-2 sm:py-3" : "gap-1.5 px-2 py-3 sm:px-3 sm:py-3.5",
        selected
          ? "border-deep-teal bg-deep-teal/5 text-deep-teal shadow-sm ring-1 ring-deep-teal/20"
          : "border-charcoal/10 bg-white text-charcoal hover:border-deep-teal/30 hover:bg-soft-ivory/70"
      )}
    >
      <span
        className={cn(
          "flex items-center justify-center rounded-full transition-colors",
          compact ? "h-7 w-7 sm:h-8 sm:w-8" : "h-8 w-8 sm:h-9 sm:w-9",
          selected ? "bg-deep-teal/10 text-deep-teal" : "bg-soft-ivory text-muted-text group-hover:text-deep-teal"
        )}
      >
        <Icon className={compact ? "h-3.5 w-3.5 sm:h-4 sm:w-4" : "h-4 w-4 sm:h-[18px] sm:w-[18px]"} aria-hidden="true" />
      </span>
      <span
        className={cn(
          "w-full whitespace-normal break-words font-medium leading-tight",
          compact ? "text-[10px] sm:text-[11px]" : "text-[11px] sm:text-xs"
        )}
      >
        {item.label}
      </span>
    </button>
  );
}

export function ReviewAssistant() {
  const [step, setStep] = useState<Step>(1);
  const [conditions, setConditions] = useState<string[]>([]);
  const [specialists, setSpecialists] = useState<string[]>([]);
  const [highlights, setHighlights] = useState<string[]>([]);
  const [additionalFeedback, setAdditionalFeedback] = useState<string>("");
  const [reviews, setReviews] = useState<string[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  const canGenerate = conditions.length > 0 && specialists.length > 0 && highlights.length > 0 && !loading;

  const selectedReview = useMemo(
    () => (selectedIndex !== null ? reviews[selectedIndex] : null),
    [reviews, selectedIndex]
  );

  function toggleCondition(value: string) {
    setConditions((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function toggleSpecialist(value: string) {
    setSpecialists((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  function toggleHighlight(value: string) {
    setHighlights((prev) =>
      prev.includes(value) ? prev.filter((h) => h !== value) : [...prev, value]
    );
  }

  async function handleGenerate() {
    if (conditions.length === 0 || specialists.length === 0 || highlights.length === 0) {
      setError("Please select at least one condition/service, one specialist, and one highlight.");
      return;
    }
    setLoading(true);
    setError(null);
    setCopied(false);
    setSelectedIndex(null);
    try {
      const res = await fetch("/api/generate-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          conditions,
          specialists,
          highlights,
          additionalFeedback: additionalFeedback.trim(),
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        reviews?: unknown;
        error?: string;
      };
      if (!res.ok) {
        throw new Error(
          typeof data.error === "string" ? data.error : "Could not generate reviews. Please try again."
        );
      }
      if (
        !Array.isArray(data.reviews) ||
        data.reviews.length !== 2 ||
        data.reviews.some((r) => typeof r !== "string")
      ) {
        throw new Error("Received an invalid response. Please try again.");
      }
      const nextReviews = data.reviews as string[];
      setReviews(nextReviews);
      setStep(2);
      pushDataLayer({
        event: "review_ai_generated",
        conditions,
        specialists,
        highlights_count: highlights.length,
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Could not generate reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCopyAndPost() {
    if (selectedIndex === null || !selectedReview) return;
    try {
      await navigator.clipboard.writeText(selectedReview);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = selectedReview;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand("copy");
      document.body.removeChild(textarea);
    }
    setCopied(true);
    pushDataLayer({
      event: "google_review_copied",
      conditions,
      specialists,
      review_index: selectedIndex,
    });
    setStep(3);
    window.setTimeout(() => {
      window.location.href = GOOGLE_REVIEW_URL;
    }, 1200);
  }

  function handleDirectClick() {
    pushDataLayer({ event: "google_review_direct_click" });
  }

  return (
    <main className="min-h-screen overflow-x-hidden bg-soft-ivory">
      <div className="mx-auto w-full max-w-xl px-3 py-5 sm:px-4 sm:py-10">
        <header className="mb-5 flex flex-col items-center text-center sm:mb-6">
          <Link href="/" aria-label="PRAJWAL PHYSIOTHERAPY home" className="mb-3">
            <Image
              src={LOGO_PATH}
              alt="PRAJWAL PHYSIOTHERAPY REHAB CENTRE"
              width={168}
              height={56}
              priority
              className="h-auto w-[140px] sm:w-[168px]"
            />
          </Link>
          <p className="text-[11px] font-semibold uppercase tracking-wider text-deep-teal sm:text-xs">
            AI Google Review Assistant
          </p>
          <h1 className="mt-1 whitespace-nowrap text-[1.3rem] font-bold leading-tight text-charcoal min-[360px]:text-[1.45rem] min-[390px]:text-[1.6rem] sm:text-2xl">
            Share your experience
          </h1>
          <p className="mt-1.5 max-w-md px-1 text-xs text-muted-text sm:text-sm">
            Select a few details and we&apos;ll help you draft a review for our clinic in Doddaballapura.
          </p>
        </header>

        {step === 1 && (
          <section className="rounded-2xl border border-charcoal/10 bg-white p-4 shadow-sm sm:p-6">
            <div className="space-y-5 sm:space-y-6">
              <div>
                <SectionTitle>Condition / Service</SectionTitle>
                <p className="mb-2.5 text-[11px] text-muted-text sm:text-xs">Select all that apply</p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {CONDITIONS.map((item) => (
                    <OptionCard
                      key={item.label}
                      item={item}
                      selected={conditions.includes(item.label)}
                      onClick={() => toggleCondition(item.label)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle>Specialist</SectionTitle>
                <p className="mb-2.5 text-[11px] text-muted-text sm:text-xs">Select all that apply</p>
                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                  {DOCTORS.map((item) => (
                    <OptionCard
                      key={item.label}
                      item={item}
                      selected={specialists.includes(item.label)}
                      onClick={() => toggleSpecialist(item.label)}
                    />
                  ))}
                </div>
              </div>

              <div>
                <SectionTitle>Highlights</SectionTitle>
                <p className="mb-2.5 text-[11px] text-muted-text sm:text-xs">Select all that apply</p>
                <div className="grid grid-cols-3 gap-2 sm:gap-3">
                  {HIGHLIGHTS.map((item) => (
                    <OptionCard
                      key={item.label}
                      item={item}
                      selected={highlights.includes(item.label)}
                      onClick={() => toggleHighlight(item.label)}
                      compact
                    />
                  ))}
                </div>
              </div>

              <div>
                <label
                  htmlFor="additional-feedback"
                  className="mb-2 block text-sm font-semibold text-charcoal sm:text-base"
                >
                  Any Additional Feedback?
                </label>
                <textarea
                  id="additional-feedback"
                  value={additionalFeedback}
                  onChange={(e) => setAdditionalFeedback(e.target.value.slice(0, MAX_FEEDBACK_LENGTH))}
                  placeholder="Share anything specific about your experience..."
                  rows={4}
                  maxLength={MAX_FEEDBACK_LENGTH}
                  className="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal placeholder:text-muted-text/70 focus:border-deep-teal focus:outline-none focus:ring-2 focus:ring-deep-teal/20"
                />
                <p className="mt-1 text-right text-xs text-muted-text">
                  {additionalFeedback.length}/{MAX_FEEDBACK_LENGTH}
                </p>
              </div>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleGenerate}
                disabled={!canGenerate}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-deep-teal px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-dark-teal focus:outline-none focus:ring-2 focus:ring-deep-teal focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                    Generating suggestions...
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" aria-hidden="true" />
                    Generate Review Suggestions
                  </>
                )}
              </button>
            </div>
          </section>
        )}

        {step === 2 && (
          <section className="space-y-4">
            <button
              type="button"
              onClick={() => {
                setStep(1);
                setError(null);
              }}
              className="inline-flex items-center gap-1 rounded-md px-1 py-1 text-sm font-medium text-deep-teal hover:text-dark-teal focus:outline-none focus:ring-2 focus:ring-deep-teal focus:ring-offset-2"
            >
              <ChevronLeft className="h-4 w-4" aria-hidden="true" />
              Back to selections
            </button>

            <div className="rounded-2xl border border-charcoal/10 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="text-lg font-semibold text-charcoal">Choose a review</h2>
              <p className="mt-1 text-sm text-muted-text">
                Select one suggestion to copy and post on Google.
              </p>

              <div className="mt-4 space-y-3" role="radiogroup" aria-label="Review suggestions">
                {reviews.map((text, index) => {
                  const selected = selectedIndex === index;
                  return (
                    <button
                      key={index}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => setSelectedIndex(index)}
                      className={cn(
                        "w-full rounded-xl border p-4 text-left transition-all focus:outline-none focus:ring-2 focus:ring-deep-teal focus:ring-offset-2",
                        selected
                          ? "border-deep-teal bg-deep-teal/5 ring-1 ring-deep-teal/30"
                          : "border-charcoal/10 bg-soft-ivory/40 hover:border-deep-teal/30 hover:bg-white"
                      )}
                    >
                      <div className="mb-2 flex items-center justify-between gap-3">
                        <span className="text-xs font-semibold uppercase tracking-wide text-muted-text">
                          Suggestion {index + 1}
                        </span>
                        <span
                          className={cn(
                            "flex h-5 w-5 items-center justify-center rounded-full border",
                            selected
                              ? "border-deep-teal bg-deep-teal text-white"
                              : "border-charcoal/20 bg-white"
                          )}
                          aria-hidden="true"
                        >
                          {selected && <Check className="h-3 w-3" />}
                        </span>
                      </div>
                      <p className="whitespace-pre-line text-sm leading-relaxed text-charcoal">{text}</p>
                    </button>
                  );
                })}
              </div>

              {error && (
                <div
                  role="alert"
                  className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              <button
                type="button"
                onClick={handleCopyAndPost}
                disabled={selectedIndex === null}
                className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-deep-teal px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition-all hover:bg-dark-teal focus:outline-none focus:ring-2 focus:ring-deep-teal focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Copy className="h-4 w-4" aria-hidden="true" />
                {copied ? "Copied! Opening Google Reviews..." : "Copy & Post on Google"}
              </button>

              <div className="mt-4 text-center">
                <a
                  href={GOOGLE_REVIEW_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDirectClick}
                  className="inline-flex items-center gap-1 rounded text-xs font-medium text-muted-text underline-offset-2 hover:text-deep-teal hover:underline focus:outline-none focus:ring-2 focus:ring-deep-teal focus:ring-offset-2"
                >
                  Prefer to write your own? Go directly to Google Reviews
                  <ExternalLink className="h-3 w-3" aria-hidden="true" />
                </a>
              </div>
            </div>
          </section>
        )}

        {step === 3 && (
          <section className="rounded-2xl border border-charcoal/10 bg-white p-6 text-center shadow-sm sm:p-8">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-deep-teal/10 text-deep-teal">
              <Check className="h-6 w-6" aria-hidden="true" />
            </div>
            <h2 className="text-lg font-semibold text-charcoal">Copied! Opening Google Reviews...</h2>
            <p className="mt-2 text-sm text-muted-text">
              Your selected review has been copied. Paste it on Google to share your experience.
            </p>
            {selectedReview && (
              <div className="mt-4 rounded-xl border border-charcoal/10 bg-soft-ivory p-4 text-left">
                <p className="whitespace-pre-line text-sm leading-relaxed text-charcoal">{selectedReview}</p>
              </div>
            )}
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleDirectClick}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-deep-teal px-5 py-3 text-sm font-semibold text-white hover:bg-dark-teal focus:outline-none focus:ring-2 focus:ring-deep-teal focus:ring-offset-2"
              >
                Open Google Reviews
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
              </a>
              <button
                type="button"
                onClick={() => {
                  setStep(2);
                  setCopied(false);
                }}
                className="inline-flex items-center justify-center rounded-xl border border-charcoal/15 bg-white px-5 py-3 text-sm font-semibold text-charcoal hover:bg-soft-ivory focus:outline-none focus:ring-2 focus:ring-deep-teal focus:ring-offset-2"
              >
                Back to suggestions
              </button>
            </div>
          </section>
        )}

        <div className="mt-6 text-center">
          <p className="text-xs text-muted-text">
            A Digital Experience by{" "}
            <a
              href="https://www.linkedin.com/in/syedkaifabbas?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-deep-teal transition-colors hover:text-dark-teal"
            >
              KS Developers
            </a>
          </p>
          <p className="mt-1.5 text-xs text-muted-text">
            PRAJWAL PHYSIOTHERAPY REHAB CENTRE · Doddaballapura, Karnataka
          </p>
        </div>
      </div>
    </main>
  );
}
