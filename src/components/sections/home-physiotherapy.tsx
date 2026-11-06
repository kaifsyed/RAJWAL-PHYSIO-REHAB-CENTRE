"use client";

import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/container";

export function HomePhysiotherapy() {
  const waLink = "https://wa.me/919606114273?text=Hi%2C%20I%20would%20like%20to%20enquire%20about%20home%20physiotherapy%20visits.";

  return (
    <section id="home-physiotherapy" className="bg-gradient-to-br from-sky-50 via-white to-blue-50 scroll-mt-20">
      <Container className="py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
          <div className="lg:pr-10">
            <span className="inline-block mb-3 text-base font-bold tracking-wider text-deep-teal uppercase">
              Home Physiotherapy
            </span>
            <h2 className="mb-3 text-2xl lg:text-3xl font-bold tracking-tight text-charcoal leading-[1.2]">
              Compassionate Care, Right at Your <span className="font-serif italic text-deep-teal">Doorstep</span>
            </h2>
            <p className="mb-3 max-w-lg text-muted-text leading-relaxed text-base">
              Travelling to a clinic isn't always easy, especially during
              recovery or when caring for loved ones.
            </p>
            <p className="mb-3 max-w-lg text-muted-text leading-relaxed text-base">
              We bring professional physiotherapy care right to your doorstep, in
              the comfort of your home.
            </p>
            <p className="mb-4 max-w-lg text-charcoal font-medium leading-relaxed text-sm">
              Our home visits are available within a 20 km radius of our centre.
            </p>
            <p className="mb-2 max-w-lg text-muted-text leading-relaxed text-base italic">
              With compassionate care, personal attention, and the right
              guidance, every step towards recovery can feel easier.
            </p>
            <p className="mb-5 max-w-lg text-muted-text leading-relaxed text-base">
              Your comfort matters, your recovery matters, and we're here for
              you.
            </p>
            <Link
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center whitespace-nowrap rounded-md !text-white bg-deep-teal shadow-sm transition-all hover:bg-dark-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal disabled:pointer-events-none disabled:opacity-50 text-sm font-semibold px-6 py-3"
            >
              Enquire About Home Visits
            </Link>
          </div>

          <div className="relative mt-8 lg:mt-0 w-full">
            <div className="absolute inset-0 bg-soft-ivory border border-charcoal/10 rounded-2xl overflow-hidden" />
            <div className="relative z-10 h-[260px] lg:h-[480px] w-full rounded-2xl border border-sage-green/30 bg-white/80 flex items-center justify-center overflow-hidden">
              <Image
                src="/images/clinic/homephysio.webp"
                alt="Home physiotherapy care at your doorstep"
                fill
                className="object-cover object-center"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default HomePhysiotherapy;
