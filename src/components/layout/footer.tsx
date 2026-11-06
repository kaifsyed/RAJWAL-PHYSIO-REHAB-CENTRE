"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { LOGO_PATH } from "@/lib/site";

const PHONE = "096061 14273";

const SOCIAL_LINKS = [
  {
    name: "Instagram",
    url: "https://www.instagram.com/physio_kannadiga?rpxt=MXE2aDg1NndwdWJlZQ==",
    handle: "@physio_kannadiga",
  },
  {
    name: "YouTube",
    url: "https://youtube.com/@physiokannadiga?si=BMlvFzaSnXGu2vRh",
    handle: "@physiokannadiga",
  },
  {
    name: "Gmail",
    url: "mailto:prajwalphysio@gmail.com",
    handle: "prajwalphysio@gmail.com",
  },
];

const TAGLINE = "EXERCISE TODAY, LIVE A QUALITY LIFE TOMORROW";

const FOOTER_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const SERVICES = [
  "Orthopaedic & Pain Rehabilitation",
  "Sports Rehabilitation",
  "Neurological Rehabilitation",
  "Electrotherapy",
  "Specialised Care",
  "Home Physiotherapy",
];

const HOURS = [
  { label: "Monday – Saturday", time: "10 AM – 9 PM" },
  { label: "Sunday", time: "10 AM – 4 PM" },
];

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="5" width="20" height="14" rx="4" />
      <polygon points="10,9 16,12 10,15" />
    </svg>
  );
}

function GmailIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="M2 6l10 7 10-7" />
    </svg>
  );
}

const IconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Instagram: InstagramIcon,
  YouTube: YouTubeIcon,
  Gmail: GmailIcon,
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-deep-teal border-t border-dark-teal/30">
      <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 py-10 lg:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 mb-12">

          <div className="col-span-1 lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Image
                src={LOGO_PATH}
                alt="PRAJWAL PHYSIOTHERAPY REHAB CENTRE"
                width={120}
                height={40}
                className="block"
                priority
              />
            </div>
            <p className="text-[#FFFFFF] leading-relaxed mb-6 text-sm">
              Physiotherapy and rehabilitation care in Doddaballapura,
              Karnataka.
            </p>
            <p className="text-white font-semibold tracking-wide text-sm lg:text-base uppercase">
              {TAGLINE}
            </p>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
              Quick Navigation
            </h3>
            <ul className="space-y-3">
              {FOOTER_LINKS.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="block text-[#FFFFFF] hover:text-sage-green transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
              Services
            </h3>
            <ul className="space-y-3">
              {SERVICES.map((service) => (
                <li key={service}>
                  <p className="text-[#FFFFFF]">{service}</p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold text-white uppercase tracking-wider">
              Contact & Hours
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="flex shrink-0 items-center w-5 h-5 text-[#FFFFFF] mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <a
                  href={`tel:+919606114273`}
                  className="text-[#FFFFFF] hover:text-sage-green transition-colors"
                >
                  {PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex shrink-0 items-center w-5 h-5 text-[#FFFFFF] mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="text-[#FFFFFF] leading-relaxed">
                  Doddaballapura, Karnataka 561203
                </p>
              </li>
              <li className="space-y-1">
                {HOURS.map((hour) => (
                  <p key={hour.label} className="text-[#FFFFFF]">
                    {hour.label}: {hour.time}
                  </p>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4 justify-start mb-12">
          {SOCIAL_LINKS.map((social) => {
            const Icon = IconMap[social.name];
            return (
              <a
                key={social.name}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Follow us on ${social.name} (${social.handle})`}
                className="w-10 h-10 rounded-full bg-white/10 backdrop-blur flex items-center justify-center text-white hover:bg-sage-green hover:text-sage-green transition-all"
              >
                <Icon className="w-5 h-5" aria-hidden="true" />
              </a>
            );
          })}
        </div>

        <div className="border-t border-dark-teal/20 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[#FFFFFF] text-sm">
            &copy; {currentYear} PRAJWAL PHYSIOTHERAPY REHAB CENTRE. All rights
            reserved.
          </p>
          <p className="text-[#FFFFFF] text-sm">
            A Digital Experience by{" "}
            <a
              href="https://www.linkedin.com/in/syedkaifabbas?utm_source=share_via&utm_content=profile&utm_medium=member_android"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold hover:text-sage-green transition-colors"
            >
              KS Developers
            </a>
          </p>
          <div className="flex items-center gap-4 text-xs text-[#FFFFFF]">
            <span>Physiotherapy &amp; Rehabilitation</span>
            <span>Doddaballapura, Karnataka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
