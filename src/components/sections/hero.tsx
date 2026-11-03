"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/container";

const CTA_HREF = "tel:+919606114273";

export function Hero() {
  return (
    <section id="home" className="relative bg-white">
      <Container className="pt-10 pb-14 lg:pt-14 lg:pb-18">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:pr-8"
          >
            <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-deep-teal uppercase">
              Your partner in movement &amp; recovery
            </span>
            <h1 className="mb-4 text-4xl lg:text-5xl font-bold tracking-tight text-charcoal leading-[1.15]">
              Move Better. <br />
              Live Better. <br />
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
                className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-white bg-deep-teal shadow-sm transition-all hover:bg-dark-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal disabled:pointer-events-none disabled:opacity-50 text-sm font-semibold px-6 py-3"
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

          <div className="relative h-[360px] hidden lg:block">
            <Image
              src="/images/clinic/exterior.png"
              alt="Prajwal Physio Rehab Centre clinic exterior"
              fill
              className="rounded-2xl border border-sage-green/30 object-cover object-center"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              priority
            />
          </div>

          <div className="lg:hidden mt-10 relative h-[240px]">
            <Image
              src="/images/clinic/exterior.png"
              alt="Prajwal Physio Rehab Centre clinic exterior"
              fill
              className="rounded-2xl border border-sage-green/30 object-cover object-center"
              sizes="100vw"
              priority
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
