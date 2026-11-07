"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
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
  const [openMobileId, setOpenMobileId] = useState<string | null>(null);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const activeCategory = SERVICE_CATEGORIES.find(
    (c) => c.id === activeCategoryId,
  )!;

  const activateTab = useCallback((index: number) => {
    const category = SERVICE_CATEGORIES[index];
    if (!category) return;
    setActiveCategoryId(category.id);
    tabRefs.current[index]?.focus();
  }, []);

  const handleTabKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
      const lastIndex = SERVICE_CATEGORIES.length - 1;
      let nextIndex: number | null = null;

      switch (event.key) {
        case "ArrowRight":
        case "ArrowDown":
          nextIndex = index >= lastIndex ? 0 : index + 1;
          break;
        case "ArrowLeft":
        case "ArrowUp":
          nextIndex = index <= 0 ? lastIndex : index - 1;
          break;
        case "Home":
          nextIndex = 0;
          break;
        case "End":
          nextIndex = lastIndex;
          break;
        default:
          return;
      }

      event.preventDefault();
      activateTab(nextIndex);
    },
    [activateTab],
  );

  return (
    <section id="services" className="bg-white">
      <Container className="py-8 lg:py-12">
        <div className="text-center max-w-3xl mx-auto mb-10">
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

        <div className="hidden lg:flex flex-col lg:flex-row lg:items-start gap-8">
          <div className="flex-1 max-w-xs shrink-0 lg:max-w-full lg:sticky lg:top-24">
            <div
              role="tablist"
              aria-label="Service categories"
              aria-orientation="vertical"
              className="flex flex-col gap-1 border-r border-charcoal/10 pr-8"
            >
              {SERVICE_CATEGORIES.map((category, index) => {
                const Icon = ICON_MAP[category.icon];
                const isActive = activeCategoryId === category.id;
                return (
                  <button
                    key={category.id}
                    ref={(el) => {
                      tabRefs.current[index] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`services-tab-${category.id}`}
                    aria-selected={isActive}
                    aria-controls={`services-panel-${category.id}`}
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveCategoryId(category.id)}
                    onKeyDown={(event) => handleTabKeyDown(event, index)}
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
                id={`services-panel-${activeCategoryId}`}
                role="tabpanel"
                aria-labelledby={`services-tab-${activeCategoryId}`}
                tabIndex={0}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 outline-none"
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

        <div className="lg:hidden space-y-3 mt-8">
          {SERVICE_CATEGORIES.map((category) => {
            const Icon = ICON_MAP[category.icon];
            const isOpen = openMobileId === category.id;
            return (
              <div key={category.id} className="border border-charcoal/10 rounded-lg overflow-hidden">
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() =>
                    setOpenMobileId((prev) =>
                      prev === category.id ? null : category.id,
                    )
                  }
                  className="w-full flex items-center justify-between gap-3 px-4 py-3.5 text-left bg-white hover:bg-charcoal/5 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <Icon className="w-5 h-5 text-deep-teal" aria-hidden="true" />
                    <span className="text-sm font-medium text-charcoal">
                      {category.label}
                    </span>
                  </span>
                  <span className="text-deep-teal text-lg font-bold" aria-hidden="true">
                    {isOpen ? "-" : "+"}
                  </span>
                </button>
                {isOpen && (
                  <ul className="px-4 py-3 space-y-2 bg-soft-ivory">
                    {category.services.map((service) => (
                      <li
                        key={service.label}
                        className="flex items-center gap-3 px-3 py-2 rounded-lg bg-white border border-charcoal/10"
                      >
                        <Icon className="w-4 h-4 text-deep-teal" />
                        <span className="text-sm text-charcoal">{service.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            href={CTA_HREF}
            className="inline-flex items-center justify-center whitespace-nowrap rounded-md !text-white bg-deep-teal shadow-sm transition-all hover:bg-dark-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal disabled:pointer-events-none disabled:opacity-50 text-sm font-semibold px-6 py-3"
          >
            Book an Appointment
          </Link>
        </div>
      </Container>
    </section>
  );
}

export default OurServices;
