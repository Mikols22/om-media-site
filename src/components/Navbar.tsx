import Link from "next/link";

const navLinks = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#about", label: "About" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <nav className="fixed top-0 z-50 w-full bg-black/20 backdrop-blur-md">
      <div className="mx-auto flex h-16 items-center justify-between px-6 lg:h-20 lg:px-12">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-white lg:text-xl"
        >
          OM Media
        </Link>

        <ul className="hidden items-center gap-10 md:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium tracking-wide text-white transition-opacity duration-300 hover:opacity-70"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <Link
            href="/book"
            className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-black shadow-[0_0_20px_rgba(255,255,255,0.15)] transition-all duration-300 hover:bg-neutral-200 hover:shadow-[0_0_28px_rgba(255,255,255,0.25)]"
          >
            Book a Shoot
          </Link>
          <a
            href="https://om-media-crm.vercel.app/portal/login"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-white px-5 py-2 text-sm font-medium text-white transition-colors duration-300 hover:bg-white hover:text-black"
          >
            Client Login
          </a>
        </div>
      </div>
    </nav>
  );
}
