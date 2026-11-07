"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";
import { useEffect, useState } from "react";
import { HERO_IMAGES } from "@/lib/hero-images";

const CTA_HREF = "tel:+919606114273";

export function Hero() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (document.visibilityState === "visible") {
        setCurrent((prev) => (prev + 1) % HERO_IMAGES.length);
      }
    }, 4500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative bg-gradient-to-br from-sky-50 via-white to-blue-50">
      <Container className="pt-10 pb-14 lg:pt-14 lg:pb-18">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:pr-8"
          >
            <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-deep-teal uppercase">
              Your partner in movement &amp; recovery
            </span>
            <h1 className="mb-4 text-4xl lg:text-5xl font-bold tracking-tight text-charcoal leading-[1.15]">
              Move Better. <br />
              <span className="font-serif italic text-deep-teal">Live Better.</span> <br />
              Feel Like Yourself Again.
            </h1>
            <p className="mb-5 max-w-lg text-muted-text leading-relaxed text-lg">
              Personalised physiotherapy and rehabilitation care focused on
              helping you move with greater comfort, rebuild strength and return
              to the activities you love.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href={CTA_HREF}
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md !text-white bg-deep-teal shadow-sm transition-all hover:bg-dark-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal disabled:pointer-events-none disabled:opacity-50 text-sm font-semibold px-6 py-3"
              >
                Book an Appointment
              </Link>
              <Link
                href="#services"
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-charcoal bg-white border border-charcoal/20 shadow-sm transition-all hover:bg-charcoal/5 hover:text-deep-teal hover:border-deep-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal disabled:pointer-events-none disabled:opacity-50 text-sm font-semibold px-6 py-3"
              >
                Explore Our Services <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="mt-6 flex items-center gap-2 text-sm font-medium text-charcoal">
              <span className="w-1 h-1 rounded-full bg-deep-teal" />
              <span>Doddaballapura, Karnataka</span>
            </div>
          </motion.div>

          <div
            className="relative h-[240px] lg:h-[360px] mt-10"
          >
            {HERO_IMAGES.map((src, index) => (
              <Image
                key={src}
                src={src}
                alt="PRAJWAL PHYSIOTHERAPY REHAB CENTRE clinic and rehabilitation environment"
                fill
                className={`rounded-2xl border border-sage-green/30 object-cover object-center transition-opacity duration-1000 ${
                  index === current ? "opacity-100" : "opacity-0"
                }`}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                loading={index === 0 ? "eager" : "lazy"}
                fetchPriority={index === 0 ? "high" : "low"}
                priority={index === 0}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
