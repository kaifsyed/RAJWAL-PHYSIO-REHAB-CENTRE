"use client";

import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";

interface FeatureCard {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: "deep-teal" | "sage-green";
}

const FEATURES: FeatureCard[] = [
  {
    title: "Personalised Care",
    description:
      "Care focused on individual needs, movement goals and rehabilitation requirements.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    color: "deep-teal",
  },
  {
    title: "Rehabilitation-Focused Approach",
    description:
      "A focus on supporting movement, strength and everyday functional activities.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M22 12h-4l-3 9 L9 3l-3 9H2" />
      </svg>
    ),
    color: "sage-green",
  },
  {
    title: "Multiple Areas of Physiotherapy",
    description:
      "Services covering orthopaedic, sports, neurological and specialised physiotherapy.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <circle cx="12" cy="5" r="1" />
        <path d="M12 1v4M12 16v4M4.93 4.93l2.83 2.83M14.24 14.24l2.83 2.83M4.93 19.07l2.83-2.83M19.07 19.07l-2.83-2.83" />
      </svg>
    ),
    color: "deep-teal",
  },
  {
    title: "Convenient Location",
    description:
      "Located near LIC Office, D Cross, Doddaballapura, Karnataka.",
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-5 w-5"
      >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    color: "sage-green",
  },
];

export function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-soft-ivory">
      <Container className="py-8 lg:py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-deep-teal uppercase">
            Why Choose Us
          </span>
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold tracking-tight text-charcoal leading-[1.2]">
            Care That Moves With You.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => {
            const bgColor =
              feature.color === "deep-teal"
                ? "bg-deep-teal/10 text-deep-teal"
                : "bg-sage-green/10 text-sage-green";
            const borderColor =
              feature.color === "deep-teal"
                ? "border-deep-teal/20"
                : "border-sage-green/20";
            return (
              <div
                key={feature.title}
                className={cn(
                  "flex flex-col items-center justify-center p-6 rounded-xl border",
                  borderColor,
                  "bg-white hover:bg-charcoal/2 transition-colors",
                )}
              >
                <div className={cn(
                  "flex items-center justify-center w-10 h-10 rounded-lg mb-4",
                  bgColor,
                )}>
                  {feature.icon}
                </div>
                <h3 className="mb-2 text-lg font-semibold text-charcoal">
                  {feature.title}
                </h3>
                <p className="text-sm text-muted-text leading-relaxed text-center">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

export default WhyChooseUs;
