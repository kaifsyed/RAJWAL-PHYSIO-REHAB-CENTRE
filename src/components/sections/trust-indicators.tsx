"use client";

import Link from "next/link";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface TrustItem {
  label: string;
  value: string;
  supportText?: string;
  icon: React.ReactNode;
}

const TRUST_ITEMS: TrustItem[] = [
  {
    label: "Google Rating",
    value: "5.0 / 5",
    supportText: "58+ Google Reviews",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    ),
  },
  {
    label: "Home Physiotherapy",
    value: "At Your Doorstep",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  {
    label: "Care Focus",
    value: "Patient-Focused Physiotherapy",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
        <polyline points="17 21 17 13 7 13 7 21" />
        <polyline points="7 3 7 8 15 8 15 3" />
      </svg>
    ),
  },
  {
    label: "Location",
    value: "Doddaballapura, Karnataka",
    icon: (
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
];

export function TrustIndicators() {
  return (
    <section className="bg-white border-b border-charcoal/10">
      <Container className="py-4 lg:py-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {TRUST_ITEMS.map((item) => {
            const card = (
              <div
                className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 md:pl-4 border-l border-charcoal/10 md:border-l-0 md:border-t border-t-0 pl-4 pt-4 md:pt-0 hover:bg-charcoal/5 transition-colors cursor-pointer"
              >
                <div
                  className={cn(
                    "flex shrink-0 items-center justify-center w-8 h-8 rounded-md bg-soft-ivory text-deep-teal",
                  )
                }>
                  {item.icon}
                </div>
                <div>
                  <span className="block text-xs font-medium text-muted-text tracking-wide uppercase">
                    {item.label}
                  </span>
                  <span className="block text-base font-semibold text-charcoal">
                    {item.value}
                  </span>
                  {item.supportText && (
                    <span className="block text-xs text-muted-text">{item.supportText}</span>
                  )}
                </div>
              </div>
            );
            if (item.label === "Home Physiotherapy") {
              return (
                <Link
                  key={item.label}
                  href="#home-physiotherapy"
                  aria-label="Go to Home Physiotherapy section"
                  className="block"
                >
                  {card}
                </Link>
              );
            }
            return <div key={item.label}>{card}</div>;
          })}
        </div>
      </Container>
    </section>
  );
}

export default TrustIndicators;
