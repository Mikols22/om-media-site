"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LOGO_URL } from "@/lib/assets";
import { serviceLines } from "@/content/services";

type NavLink = {
  href: string;
  label: string;
  children?: { href: string; label: string }[];
};

const navLinks: NavLink[] = [
  { href: "/work", label: "Work" },
  {
    href: "/services",
    label: "Services",
    children: serviceLines.map((service) => ({
      href: `/services/${service.slug}`,
      label: service.name,
    })),
  },
  { href: "/hospitality", label: "Hospitality" },
  { href: "/golf", label: "Golf" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function ChevronIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className}>
      <path
        fillRule="evenodd"
        d="M5.23 7.21a.75.75 0 0 1 1.06.02L10 11.168l3.71-3.938a.75.75 0 1 1 1.08 1.04l-4.25 4.5a.75.75 0 0 1-1.08 0l-4.25-4.5a.75.75 0 0 1 .02-1.06z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [isDesktopServicesOpen, setIsDesktopServicesOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  };

  const closeDesktopServices = () => setIsDesktopServicesOpen(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/20 backdrop-blur-md">
      {/* Gradient scrim: extends past the nav's own bottom edge so content
          scrolling underneath fades out instead of being cut mid-line. */}
      <div className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-40 bg-gradient-to-b from-black/90 via-black/40 to-transparent lg:h-56" />

      <div className="relative mx-auto flex h-20 items-center justify-between px-6 lg:h-[100px] lg:px-12">
        <Link href="/" onClick={closeMenu} className="flex items-center">
          <Image
            src={LOGO_URL}
            alt="OM Media"
            width={128}
            height={128}
            priority
            className="h-[50px] w-[50px] lg:h-[60px] lg:w-[60px]"
          />
        </Link>

        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <li
                key={link.href}
                className="relative"
                onMouseEnter={() => setIsDesktopServicesOpen(true)}
                onMouseLeave={closeDesktopServices}
                onFocus={() => setIsDesktopServicesOpen(true)}
                onBlur={(event) => {
                  if (
                    !event.currentTarget.contains(
                      event.relatedTarget as Node | null,
                    )
                  ) {
                    closeDesktopServices();
                  }
                }}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    closeDesktopServices();
                    event.currentTarget
                      .querySelector<HTMLAnchorElement>("a")
                      ?.focus();
                  }
                }}
              >
                <Link
                  href={link.href}
                  onClick={closeDesktopServices}
                  className="flex items-center gap-1 text-sm font-medium tracking-wide text-white transition-opacity duration-300 hover:opacity-70"
                >
                  {link.label}
                  <ChevronIcon
                    className={`h-3.5 w-3.5 transition-transform duration-200 ${
                      isDesktopServicesOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                <div
                  className={`absolute left-0 top-full z-50 w-64 pt-3 transition-opacity duration-200 ${
                    isDesktopServicesOpen
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  }`}
                >
                  <div className="rounded-2xl border border-white/10 bg-zinc-950 p-2 shadow-xl">
                    {link.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        onClick={closeDesktopServices}
                        className="block rounded-xl px-4 py-3 text-sm text-neutral-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm font-medium tracking-wide text-white transition-opacity duration-300 hover:opacity-70"
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            onClick={closeMenu}
            className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_28px_rgba(255,255,255,0.25)] sm:px-5"
          >
            Book a Shoot
          </Link>

          <a
            href="https://om-media-crm.vercel.app/portal/login"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden rounded-full border border-white px-5 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-black lg:inline-block"
          >
            Client Login
          </a>

          <button
            type="button"
            onClick={() => setIsMenuOpen((open) => !open)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 lg:hidden"
          >
            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${
                isMenuOpen ? "translate-y-[7px] rotate-45" : ""
              }`}
            />
            <span
              className={`h-px w-6 bg-white transition-opacity duration-300 ${
                isMenuOpen ? "opacity-0" : "opacity-100"
              }`}
            />
            <span
              className={`h-px w-6 bg-white transition-transform duration-300 ${
                isMenuOpen ? "-translate-y-[7px] -rotate-45" : ""
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-white/10 bg-black lg:hidden"
          >
            <ul className="flex flex-col px-6 py-6">
              {navLinks.map((link) =>
                link.children ? (
                  <li key={link.href}>
                    <div className="flex items-center justify-between">
                      <Link
                        href={link.href}
                        onClick={closeMenu}
                        className="block py-3 text-lg font-medium tracking-wide text-white"
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        onClick={() => setIsServicesOpen((open) => !open)}
                        aria-expanded={isServicesOpen}
                        aria-label={
                          isServicesOpen
                            ? `Collapse ${link.label}`
                            : `Expand ${link.label}`
                        }
                        className="p-3 text-white"
                      >
                        <ChevronIcon
                          className={`h-4 w-4 transition-transform duration-300 ${
                            isServicesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    </div>

                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.ul
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                          className="overflow-hidden pl-4"
                        >
                          {link.children.map((child) => (
                            <li key={child.href}>
                              <Link
                                href={child.href}
                                onClick={closeMenu}
                                className="block py-2.5 text-base text-neutral-300"
                              >
                                {child.label}
                              </Link>
                            </li>
                          ))}
                        </motion.ul>
                      )}
                    </AnimatePresence>
                  </li>
                ) : (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={closeMenu}
                      className="block py-3 text-lg font-medium tracking-wide text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ),
              )}
              <li className="mt-2 border-t border-white/10 pt-5">
                <a
                  href="https://om-media-crm.vercel.app/portal/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={closeMenu}
                  className="block py-3 text-lg font-medium tracking-wide text-white"
                >
                  Client Login
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
