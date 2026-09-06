import Image from "next/image";
import Link from "next/link";
import { LOCAL_BUSINESS_INFO } from "@/content/localSeo";
import { serviceAreaOptions } from "@/content/serviceAreas";
import { serviceLines } from "@/content/services";
import { LOGO_URL } from "@/lib/assets";

const exploreLinks = [
  { href: "/work", label: "Work" },
  { href: "/services", label: "Services" },
  { href: "/hospitality", label: "Hospitality" },
  { href: "/golf", label: "Golf" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

const getStartedLinks = [
  { href: "/book", label: "Book a Shoot" },
  { href: "/creators", label: "Become a Creator" },
];

// Placeholder social links — replace with real profile URLs.
const socialLinks = [
  {
    name: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.23-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.65-.07-4.85s.02-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-4.35.2-6.78 2.62-6.98 6.98C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.2-4.35-2.62-6.78-6.98-6.98C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4zm6.41-10.85a1.44 1.44 0 1 1-1.44-1.44 1.44 1.44 0 0 1 1.44 1.44z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    name: "YouTube",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.5 6.2a3.03 3.03 0 00-2.14-2.16C19.55 3.5 12 3.5 12 3.5s-7.55 0-9.36.54A3.03 3.03 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3.03 3.03 0 002.14 2.16c1.81.54 9.36.54 9.36.54s7.55 0 9.36-.54a3.03 3.03 0 002.14-2.16A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-black">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-12 lg:py-20">
        <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="inline-flex items-center">
              <Image
                src={LOGO_URL}
                alt="OM Media"
                width={128}
                height={128}
                className="h-12 w-12"
              />
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-neutral-400">
              Award-winning video production and digital strategy.
            </p>
            <div className="mt-6 flex items-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  aria-label={`[PLACEHOLDER] ${social.name} — replace href with real profile URL`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              Explore
            </h3>
            <ul className="mt-4 space-y-3">
              {exploreLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <h4 className="mt-6 text-xs uppercase tracking-[0.2em] text-neutral-600">
              Services
            </h4>
            <ul className="mt-3 space-y-3">
              {serviceLines.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="text-sm text-neutral-400 transition-colors duration-300 hover:text-white"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              Get Started
            </h3>
            <ul className="mt-4 space-y-3">
              {getStartedLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-neutral-300 transition-colors duration-300 hover:text-white"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://om-media-crm.vercel.app/portal/login"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-300 transition-colors duration-300 hover:text-white"
                >
                  Client Login
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-neutral-300">
              <li>
                <a
                  href={`mailto:${LOCAL_BUSINESS_INFO.email}`}
                  className="transition-colors duration-300 hover:text-white"
                >
                  {LOCAL_BUSINESS_INFO.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${LOCAL_BUSINESS_INFO.telephone}`}
                  className="transition-colors duration-300 hover:text-white"
                >
                  {LOCAL_BUSINESS_INFO.phoneDisplay}
                </a>
              </li>
            </ul>

            <h3 className="mt-8 text-sm uppercase tracking-[0.2em] text-neutral-500">
              Service Areas
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-neutral-300">
              {serviceAreaOptions.join(" · ")}
            </p>
          </div>
        </div>

        <div className="mt-16 border-t border-white/10 pt-8 text-xs text-neutral-500">
          © {year} OM Media. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
