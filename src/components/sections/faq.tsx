"use client";

import { useState } from "react";
import { Container } from "@/components/ui/container";

const FAQS = [
  {
    q: "Where is PRAJWAL PHYSIOTHERAPY REHAB CENTRE located?",
    a: "PRAJWAL PHYSIOTHERAPY REHAB CENTRE is located near LIC Office, Opposite Ashith Motors, Ayyappa Swami Temple Road, beside Bank of Baroda, D Cross, Doddaballapura, Karnataka 561203. View the location on Google Maps: https://maps.app.goo.gl/3uyYc1RfiRZw4Av69",
  },
  {
    q: "What physiotherapy services are available at the clinic?",
    a: "The clinic offers orthopaedic and pain rehabilitation, sports rehabilitation, neurological rehabilitation, electrotherapy and specialised care including paediatric and geriatric physiotherapy.",
  },
  {
    q: "Do you provide sports injury rehabilitation?",
    a: "Yes, sports injury rehabilitation is available, including injury recovery and functional rehabilitation.",
  },
  {
    q: "Can I book a physiotherapy appointment?",
    a: "Yes. Call +91 9606114273 to book an appointment or enquire about available care options.",
  },
  {
    q: "Do you provide physiotherapy for back pain and joint pain?",
    a: "Yes, the clinic provides physiotherapy for back pain, joint pain and related orthopaedic conditions.",
  },
  {
    q: "How can I contact PRAJWAL PHYSIOTHERAPY REHAB CENTRE?",
    a: "Call +91 9606114273 or visit the clinic in Doddaballapura, Karnataka. Google Maps: https://maps.app.goo.gl/3uyYc1RfiRZw4Av69",
  },
  {
    q: "Who is the founder of PRAJWAL PHYSIOTHERAPY REHAB CENTRE?",
    a: "The founder is PRAJWAL L NAIK (PT) (MIAP).",
  },
  {
    q: "Do I need an appointment before visiting the clinic?",
    a: "Booking an appointment is recommended. Contact +91 9606114273 to confirm availability before visiting.",
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <section id="faq" className="bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Container className="py-8 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-center max-w-[1200px] mx-auto">
          <div>
            <div className="text-center lg:text-left mb-6">
              <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-deep-teal uppercase">
                Frequently Asked Questions
              </span>
              <h2 className="mb-4 text-3xl lg:text-4xl font-bold tracking-tight text-charcoal leading-[1.2]">
                FAQ
              </h2>
            </div>
            <div className="space-y-1">
              {FAQS.map((f, i) => {
                const isOpen = openIndex === i;
                return (
                  <div key={f.q} className="border border-charcoal/10 rounded-lg bg-soft-ivory overflow-hidden">
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className={`w-full flex items-center gap-3 px-4 py-3.5 text-left rounded-lg transition-all ${
                        isOpen ? "bg-deep-teal text-white" : "text-charcoal hover:bg-charcoal/5 hover:text-deep-teal"
                      }`}
                    >
                      <span className={`text-sm font-medium flex-1 ${isOpen ? "text-white" : "text-charcoal"}`}>{f.q}</span>
                      <span className={`w-5 h-5 flex items-center justify-center ${isOpen ? "text-white" : "text-deep-teal"}`} aria-hidden="true">
                        {isOpen ? "−" : "+"}
                      </span>
                    </button>
                    <div
                      className={`px-4 overflow-hidden transition-all duration-300 ${
                        isOpen ? "max-h-96 pb-3" : "max-h-0"
                      }`}
                    >
                      <p className="text-sm text-muted-text leading-relaxed">{f.a}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="relative w-full h-[320px] rounded-2xl overflow-hidden border border-charcoal/10">
            <img
              src="/images/clinic/repet.webp"
              alt="PRAJWAL PHYSIOTHERAPY REHAB CENTRE clinic"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </div>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      </Container>
    </section>
  );
}

export default FAQ;
