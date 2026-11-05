"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback, useRef } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { LOGO_PATH } from "@/lib/site";

const NAV_LINKS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Our Team", href: "#team" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

const CTA_HREF = "tel:+919606114273";
const CTA_LABEL = "Book Appointment";

interface NavLinkProps {
  href: string;
  label: string;
  onClick?: () => void;
}

function NavLink({ href, label, onClick }: NavLinkProps) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="text-charcoal text-sm font-medium transition-colors px-3 py-2"
    >
      {label}
    </Link>
  );
}

interface CTAButtonProps {
  onClick?: () => void;
}

function CTAButton({ onClick }: CTAButtonProps) {
  return (
    <Link
      href={CTA_HREF}
      onClick={onClick}
      className="inline-flex items-center justify-center whitespace-nowrap rounded-md !text-white bg-deep-teal shadow-sm transition-all hover:bg-dark-teal focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-deep-teal disabled:pointer-events-none disabled:opacity-50 text-sm font-semibold px-5 py-2.5"
    >
      {CTA_LABEL}
    </Link>
  );
}

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const closeMenu = useCallback(() => {
    setIsMobileMenuOpen(false);
  }, []);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape" && isMobileMenuOpen) {
        closeMenu();
      }
    }
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isMobileMenuOpen, closeMenu]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <nav
        className="sticky top-0 z-50 w-full border-b border-charcoal/10 bg-white/95 backdrop-blur-sm transition-colors"
        aria-label="Main navigation"
      >
        <div className="w-full max-w-[1440px] mx-auto px-4 lg:px-8 flex h-16 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 flex-shrink-0"
            aria-label="Prajwal Physio Rehab Centre home"
          >
            <Image
              src={LOGO_PATH}
              alt="Prajwal Physio Rehab Centre"
              width={120}
              height={40}
              priority
              className="block"
            />
          </Link>
          <Link
            href={CTA_HREF}
            className="md:hidden inline-flex items-center justify-center whitespace-nowrap rounded-md !text-white bg-deep-teal shadow-sm text-xs font-semibold px-3 py-1.5 ml-2"
          >
            Book Now
          </Link>

          <div className="hidden md:flex items-center gap-8">
            <div className="hidden md:flex flex-1 justify-center items-center gap-6 text-sm font-medium">
              {NAV_LINKS.map((link) => (
                <NavLink key={link.label} href={link.href} label={link.label} />
              ))}
            </div>
            <div className="flex items-center gap-3">
              <CTAButton />
            </div>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-charcoal hover:bg-charcoal/5 focus:outline-none"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ translateX: "100%" }}
              animate={{ translateX: 0 }}
              exit={{ translateX: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed inset-y-0 right-0 z-50 w-full md:w-80 bg-white border-l border-charcoal/10 flex flex-col"
              aria-labelledby="mobile-menu-title"
              role="navigation"
              aria-label="Mobile navigation"
            >
              <div className="flex items-center justify-between px-6 py-5 border-b border-charcoal/5">
                <h2 id="mobile-menu-title" className="sr-only">
                  Mobile navigation menu
                </h2>
                <button
                  type="button"
                  className="rounded-md p-2 text-charcoal hover:bg-charcoal/5 focus:outline-none"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>
              <div className="flex-1 overflow-y-auto py-6 px-6">
                <nav className="flex flex-col gap-1">
                  {NAV_LINKS.map((link) => (
                    <NavLink
                      key={link.label}
                      href={link.href}
                      label={link.label}
                      onClick={closeMenu}
                    />
                  ))}
                </nav>
              </div>
              <div className="border-t border-charcoal/5 p-6">
                <CTAButton onClick={() => setIsMobileMenuOpen(false)} />
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

export default Navbar;
