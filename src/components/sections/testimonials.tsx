"use client";

import { Star } from "lucide-react";
import { useState } from "react";
import { Container } from "@/components/ui/container";
import { REVIEWS } from "@/lib/reviews";

const EXCERPT_LENGTH = 150;

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}

function ReviewCard({ review }: { review: (typeof REVIEWS)[number] }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const isLong = review.text.length > EXCERPT_LENGTH;
  const displayText = isExpanded
    ? review.text
    : isLong
      ? review.text.slice(0, EXCERPT_LENGTH).trim() + "..."
      : review.text;

  return (
    <article className="rounded-xl border border-charcoal/10 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-3 mb-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-deep-teal text-white text-sm font-semibold">
          {getInitials(review.name)}
        </div>
        <div>
          <p className="text-sm font-semibold text-charcoal">{review.name}</p>
          <p className="text-xs text-muted-text">{review.date}</p>
        </div>
      </div>
      <div className="flex gap-1 mb-3 text-amber-400">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star key={i} className="w-4 h-4 fill-current" />
        ))}
      </div>
      <p className="text-muted-text leading-relaxed text-sm">{displayText}</p>
      {isLong && (
        <button
          type="button"
          onClick={() => setIsExpanded((prev) => !prev)}
          className="mt-3 text-xs font-medium text-deep-teal hover:text-dark-teal transition-colors"
        >
          {isExpanded ? "Show less" : "Read more"}
        </button>
      )}
    </article>
  );
}

export function PatientTestimonials() {
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="testimonials" className="bg-white">
      <Container className="py-10 lg:py-14">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-deep-teal uppercase">
            Patient Testimonials
          </span>
          <h2 className="mb-4 text-2xl lg:text-3xl font-bold tracking-tight text-charcoal leading-[1.2]">
            Real Experiences. Genuine Care.
          </h2>
          <p className="text-muted-text leading-relaxed text-sm">
            Read about the experiences shared by people who trusted Prajwal Physio Rehab Centre with their recovery.
          </p>
          <p className="mt-3 text-xs text-muted-text italic">
            All patient reviews displayed here have been personally verified by our team and are also available on Google.
          </p>
          <div className="mt-3 flex justify-center">
            <img
              src="https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google"
              width={110}
              height={36}
              className="h-8 w-auto"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {REVIEWS.map((review, index) => (
            <div
              key={review.name}
              className={index >= 4 && !showAll ? "hidden lg:block" : ""}
            >
              <ReviewCard review={review} />
            </div>
          ))}
        </div>

        {REVIEWS.length > 4 && (
          <div className="mt-6 flex justify-center lg:hidden">
            <button
              type="button"
              onClick={() => setShowAll((v) => !v)}
              className="inline-flex items-center justify-center rounded-md text-white bg-deep-teal px-6 py-2.5 text-sm font-semibold"
            >
              {showAll ? "See Less" : "See More"}
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}

export default PatientTestimonials;
