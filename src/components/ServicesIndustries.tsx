import Link from "next/link";
import IndustryGrid from "@/components/IndustryGrid";

// Apple Podcasts and Spotify links aren't available yet — add them back
// here once supplied. YouTube points at the channel (same URL as the Footer).
const podcastPlatforms = [
  {
    name: "YouTube",
    href: "https://www.youtube.com/@ommediallc",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M23.5 6.2a3.03 3.03 0 00-2.14-2.16C19.55 3.5 12 3.5 12 3.5s-7.55 0-9.36.54A3.03 3.03 0 00.5 6.2 31.6 31.6 0 000 12a31.6 31.6 0 00.5 5.8 3.03 3.03 0 002.14 2.16c1.81.54 9.36.54 9.36.54s7.55 0 9.36-.54a3.03 3.03 0 002.14-2.16A31.6 31.6 0 0024 12a31.6 31.6 0 00-.5-5.8zM9.75 15.02V8.98L15.5 12l-5.75 3.02z" />
      </svg>
    ),
  },
];

export default function ServicesIndustries() {
  return (
    <section id="services" className="scroll-mt-20 bg-black lg:scroll-mt-[100px]">
      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6 lg:mb-16">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              What We Do
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tighter text-white lg:text-6xl">
              Services & Industries
            </h2>
          </div>

          <Link
            href="/services"
            className="text-sm font-medium uppercase tracking-[0.2em] text-white underline-offset-4 transition-opacity duration-300 hover:opacity-70"
          >
            View All Services →
          </Link>
        </div>

        <IndustryGrid />
      </div>

      <div className="border-t border-white/10">
        <div className="overflow-hidden border-b border-white/10 bg-zinc-950 py-3">
          <div className="marquee-track flex w-max items-center gap-12">
            {Array.from({ length: 8 }).map((_, index) => (
              <span
                key={index}
                className="flex shrink-0 items-center gap-4 text-sm font-medium uppercase tracking-[0.25em] text-white/80"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-white" />
                New Podcast Episode
                <span className="text-neutral-500">—</span>
                The Future of Brand Storytelling
              </span>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-start justify-between gap-10 px-6 py-16 lg:flex-row lg:items-center lg:px-12 lg:py-20">
          <div className="max-w-xl">
            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
              Podcast
            </p>
            <h3 className="mt-4 text-3xl font-bold tracking-tight text-white lg:text-4xl">
              Dominate the Conversation
            </h3>
            <p className="mt-4 text-base leading-relaxed text-neutral-400 lg:text-lg">
              Weekly insights on video production, digital strategy, and building
              brands that command attention.
            </p>
          </div>

          <div className="flex items-center gap-4">
            {podcastPlatforms.map((platform) => (
              <a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Listen on ${platform.name}`}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                {platform.icon}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
