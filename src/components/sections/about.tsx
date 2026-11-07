"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";

export function AboutUs() {
  return (
    <section id="about" className="bg-soft-ivory">
      <Container className="py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="lg:pr-10">
            <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-deep-teal uppercase">
              About Us
            </span>
            <h2 className="mb-4 text-3xl lg:text-4xl font-bold tracking-tight text-charcoal leading-[1.2]">
              Helping You Move Better, One Step at a Time.
            </h2>
            <p className="mb-4 max-w-lg text-charcoal leading-relaxed text-lg">
              PRAJWAL PHYSIOTHERAPY REHAB CENTRE is a physiotherapy and rehabilitation
              centre located in Doddaballapura, Karnataka.
            </p>
            <p className="mb-6 max-w-lg text-charcoal leading-relaxed text-lg">
              We focus on physiotherapy care and rehabilitation services across
              orthopaedic, sports and neurological conditions, with care options
              for different age groups.
            </p>
            <p className="mb-6 max-w-lg text-charcoal leading-relaxed text-lg">
              Physiotherapy helps restore movement, reduce pain, and improve
              physical function through assessment, exercise therapy, and
              rehabilitation. It can support recovery from injury, surgery, or
              conditions affecting mobility — without guarantees of specific
              outcomes.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 p-6 bg-white rounded-xl border border-charcoal/10">
              <div className="flex items-center gap-3">
                <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-sage-green/20 text-sage-green">
                  <svg
                    width="18"
                    height="18"
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
                </div>
                <div>
                  <span className="block text-sm font-semibold text-charcoal">
                    Founder
                  </span>
                  <span className="block text-sm text-muted-text">
                    PRAJWAL L NAIK (PT) (MIAP)
                  </span>
                </div>
              </div>
              <div className="border-l border-charcoal/5 hidden sm:block pl-6" />
              <div className="flex items-center gap-3">
                <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-sage-green/20 text-sage-green">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-5 w-5"
                  >
                    <path d="M12 2L2 7l10 5 10-5-10-5z" />
                    <path d="M2 17l10 5 10-5" />
                    <path d="M2 12l10 5 10-5" />
                  </svg>
                </div>
                <div>
                  <span className="block text-sm font-semibold text-charcoal">
                    Education
                  </span>
                  <span className="block text-sm text-muted-text">
                    Harsha Institutions of Physiotherapy
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative mt-8 lg:mt-0">
            <div className="absolute inset-0 bg-soft-ivory border border-charcoal/10 rounded-2xl overflow-hidden" />
            <div className="relative z-10 h-[240px] lg:h-[320px] w-full rounded-2xl border border-sage-green/30 bg-white/80 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/clinic/reception.webp"
                alt="PRAJWAL PHYSIOTHERAPY REHAB CENTRE reception area"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 320px"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default AboutUs;
