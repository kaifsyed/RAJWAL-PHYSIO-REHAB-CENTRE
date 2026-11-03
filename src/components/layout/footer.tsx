"use client";

import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";

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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YouTubeIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A2.78 2.78 0 0 0 2 12.54a2.78 2.78 0 0 0 2 1.94c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 2.78 2.78 0 0 0 2-1.94 2.78 2.78 0 0 0 2-1.94" />
      <polygon points="10 15 15 12 10 9 10 15" />
    </svg>
  );
}

function GmailIcon({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" ry="2" />
      <path d="M22 4l-2 1.5L12 9 2 6.5l2-1.5z" />
      <path d="M2 12l3.5 3.5L22 19l-3.5-3.5z" />
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
                src="/logo/prajwal-logo.png"
                alt="Prajwal Physio Rehab Centre"
                width={100}
                height={33}
                className="block"
                priority
              />
            </div>
            <p className="text-[#F1F5F4] leading-relaxed mb-6 text-sm">
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
                    className="block text-[#F1F5F4] hover:text-sage-green transition-colors"
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
                  <p className="text-[#F1F5F4]">{service}</p>
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
                <div className="flex shrink-0 items-center w-5 h-5 text-[#F1F5F4] mt-0.5">
                  <Phone className="w-4 h-4" />
                </div>
                <a
                  href={`tel:+919606114273`}
                  className="text-[#F1F5F4] hover:text-sage-green transition-colors"
                >
                  {PHONE}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <div className="flex shrink-0 items-center w-5 h-5 text-[#F1F5F4] mt-0.5">
                  <MapPin className="w-4 h-4" />
                </div>
                <p className="text-[#F1F5F4] leading-relaxed">
                  Doddaballapura, Karnataka 561203
                </p>
              </li>
              <li className="space-y-1">
                {HOURS.map((hour) => (
                  <p key={hour.label} className="text-[#F1F5F4]">
                    {hour.label}: {hour.time}
                  </p>
                ))}
              </li>
            </ul>
          </div>
        </div>

        <div className="flex gap-4 justify-center mb-12">
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
          <p className="text-[#F1F5F4] text-sm">
            &copy; {currentYear} PRAJWAL PHYSIO REHAB CENTRE. All rights
            reserved.
          </p>
          <div className="flex items-center gap-4 text-xs text-[#F1F5F4]">
            <span>Physiotherapy &amp; Rehabilitation</span>
            <span>Doddaballapura, Karnataka</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
