"use client";

import Link from "next/link";
import {
  Phone,
  MapPin,
  Clock,
  Home,
  ArrowRight,
  ExternalLink,
} from "lucide-react";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/utils";
import { PHONE_LINK, MAPS_LINK } from "@/lib/config";

const ADDRESS =
  "Near LIC Office, Opposite Ashith Motors, Ayyappa Swami Temple Road, beside Bank of Baroda, D Cross, Doddaballapura, Karnataka 561203.";

const HOURS = [
  { label: "Monday – Saturday", time: "10:00 AM – 9:00 PM" },
  { label: "Sunday", time: "10:00 AM – 4:00 PM" },
];

const CONTACT_ACTIONS = [
  {
    label: "Call Now",
    href: PHONE_LINK,
    icon: Phone,
    description: "Speak with our team about appointments",
  },
  {
    label: "Get Directions",
    href: MAPS_LINK,
    icon: MapPin,
    description: "Find us on Google Maps",
    external: true,
  },
  {
    label: "Book an Appointment",
    href: PHONE_LINK,
    icon: Phone,
    description: "Schedule your physiotherapy session",
  },
  {
    label: "Enquire About Home Visits",
    href: PHONE_LINK,
    icon: Home,
    description: "Home physiotherapy within 20 km",
  },
];

export function Contact() {
  return (
    <section id="contact" className="bg-white">
      <Container className="py-8 lg:py-12">
        <div className="lg:grid lg:grid-cols-2 lg:gap-16">
          <div className="lg:pr-10 mb-12 lg:mb-0">
            <span className="inline-block mb-3 text-sm font-semibold tracking-wider text-deep-teal uppercase">
              Contact Us
            </span>
            <h2 className="mb-4 text-3xl lg:text-4xl font-bold tracking-tight text-charcoal leading-[1.2]">
              Your Journey Towards Better Movement Starts Here.
            </h2>
            <p className="mb-5 max-w-lg text-muted-text leading-relaxed text-lg">
              Have questions about physiotherapy or rehabilitation services? Get
              in touch with PRAJWAL PHYSIO REHAB CENTRE to enquire about
              appointments and available care options.
            </p>

            <div className="space-y-4">
              {CONTACT_ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <Link
                    key={action.label}
                    href={action.href}
                    target={action.external ? "_blank" : undefined}
                    rel={action.external ? "noopener noreferrer" : undefined}
                    className={cn(
                      "flex items-center gap-4 px-6 py-4 rounded-xl border border-charcoal/10 bg-white transition-all hover:bg-charcoal/2 hover:border-deep-teal/30 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal",
                      action.external ? "pr-4" : "",
                    )}
                  >
                    <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-lg bg-deep-teal/10 text-deep-teal">
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <span className="block text-sm font-semibold text-charcoal">
                        {action.label}
                      </span>
                      <span className="block text-xs text-muted-text">
                        {action.description}
                      </span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-muted-text transition-transform group-hover:translate-x-1" />
                  </Link>
                );
              })}
            </div>

            <div className="mt-6 p-6 rounded-xl border border-sage-green/30 bg-sage-green/5">
              <div className="flex items-start gap-4">
                <div className="flex shrink-0 items-center justify-center w-10 h-10 rounded-full bg-sage-green/20 text-sage-green mt-0.5">
                  <Home className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold text-charcoal">
                    Physiotherapy at Your Doorstep
                  </h3>
                  <p className="text-sm text-muted-text leading-relaxed">
                    Unable to visit the clinic? Home physiotherapy visits are
                    available within 20 km of the centre.
                  </p>
                </div>
              </div>
              <div className="mt-5">
                <Link
                  href={PHONE_LINK}
                  className="inline-flex items-center justify-center whitespace-nowrap rounded-md text-white bg-deep-teal shadow-sm transition-all hover:bg-dark-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal disabled:pointer-events-none disabled:opacity-50 text-sm font-semibold px-6 py-3"
                >
                  Enquire About Home Visits
                </Link>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div
              className="absolute inset-0 bg-soft-ivory border border-charcoal/10 rounded-2xl overflow-hidden"
            />
            <div className="relative z-10 h-[360px] w-full rounded-2xl border border-sage-green/30 bg-white flex flex-col">
              <div className="p-6 border-b border-charcoal/5">
                <h3 className="mb-2 text-lg font-semibold text-charcoal">
                  Visit Us
                </h3>
                <p className="text-sm text-muted-text">
                  Our clinic is located near LIC Office, D Cross,
                  Doddaballapura.
                </p>
              </div>
              <div className="flex-1 p-6 flex flex-col gap-4">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 mt-0.5 text-deep-teal flex-shrink-0" />
                  <div>
                    <p className="text-sm font-semibold text-charcoal">
                      PRAJWAL PHYSIO REHAB CENTRE
                    </p>
                    <p className="text-sm text-muted-text leading-relaxed">
                      {ADDRESS}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="w-5 h-5 text-deep-teal flex-shrink-0" />
                  <p className="text-sm font-semibold text-charcoal">
                      096061 14273
                    </p>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-deep-teal flex-shrink-0" />
                  <div className="flex flex-col">
                    {HOURS.map((hour) => (
                      <p key={hour.label} className="text-sm text-muted-text">
                        {hour.label}: {hour.time}
                      </p>
                    ))}
                  </div>
                </div>
                <Link
                  href={MAPS_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center whitespace-nowrap rounded-md text-white bg-deep-teal shadow-sm transition-all hover:bg-dark-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal disabled:pointer-events-none disabled:opacity-50 text-sm font-semibold px-6 py-3"
                >
                  Get Directions <ExternalLink className="ml-2 w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:hidden mt-8">
            <div className="relative h-[240px] w-full rounded-2xl border border-sage-green/30 bg-soft-ivory overflow-hidden flex items-center justify-center">
              <div className="text-center px-6">
                <div className="flex items-center justify-center w-12 h-12 rounded-full bg-sage-green/20 text-sage-green mx-auto mb-4">
                  <MapPin className="w-6 h-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-charcoal">
                  Visit Us
                </h3>
                <p className="text-sm text-muted-text">
                  Map location to be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Contact;
