"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Bone, Activity, Brain, Zap, Heart } from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { SERVICE_CATEGORIES } from "@/lib/services";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  Bone,
  Activity,
  Brain,
  Zap,
  Heart,
};

interface ServiceCardProps {
  service: { label: string };
  icon: React.ComponentType<{ className?: string }>;
}

function ServiceCard({ service, icon: Icon }: ServiceCardProps) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-white border border-charcoal/10 hover:bg-charcoal/2 hover:border-deep-teal/30 transition-colors"
    >
      <Icon className="w-5 h-5 text-deep-teal" />
      <span className="text-sm text-charcoal">{service.label}</span>
    </motion.li>
  );
}

const CTA_HREF = "tel:+919606114273";

export function OurServices() {
  const [activeCategoryId, setActiveCategoryId] = useState<string>(
    SERVICE_CATEGORIES[0].id,
  );

  const activeCategory = SERVICE_CATEGORIES.find(
    (c) => c.id === activeCategoryId,
  )!;

  return (
    <section id="services" className="bg-white">
      <Container className="py-8 lg:py-12">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-deep-teal uppercase">
            Our Services
          </span>
          <h2 className="mb-4 text-3xl lg:text-4xl font-bold tracking-tight text-charcoal leading-[1.2]">
            Physiotherapy &amp; Rehabilitation Services
          </h2>
          <p className="text-muted-text leading-relaxed text-lg">
            Explore our physiotherapy and rehabilitation services designed to
            support movement, recovery and everyday function.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="flex-1 max-w-xs shrink-0 lg:max-w-full lg:sticky lg:top-24">
            <div
              role="tablist"
              aria-label="Service categories"
              className="flex flex-col gap-1 border-r border-charcoal/10 pr-8"
            >
              {SERVICE_CATEGORIES.map((category) => {
                const Icon = ICON_MAP[category.icon];
                const isActive = activeCategoryId === category.id;
                return (
                  <button
                    key={category.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`services-panel-${category.id}`}
                    id={`services-tab-${category.id}`}
                    onClick={() => setActiveCategoryId(category.id)}
                    className={cn(
                      "w-full flex items-center gap-3 px-4 py-3.5 text-left rounded-lg transition-all",
                      isActive
                        ? "bg-deep-teal text-white"
                        : "text-charcoal hover:bg-charcoal/5 hover:text-deep-teal",
                    )}
                  >
                    <Icon className="w-5 h-5" aria-hidden="true" />
                    <span className="text-sm font-medium">{category.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategoryId}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {activeCategory.services.map((service) => {
                  const Icon = ICON_MAP[activeCategory.icon];
                  return (
                    <ServiceCard
                      key={service.label}
                      service={service}
                      icon={Icon}
                    />
                  );
                })}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="mt-10 text-center">
          <Link
            href={CTA_HREF}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-white bg-deep-teal shadow-sm transition-all hover:bg-dark-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal disabled:pointer-events-none disabled:opacity-50 text-sm font-semibold px-6 py-3"
          >
            Book an Appointment
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default OurServices;
