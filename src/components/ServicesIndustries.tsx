import Link from "next/link";
import IndustryGrid from "@/components/IndustryGrid";

const podcastPlatforms = [
  {
    name: "Spotify",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.49 17.28a.75.75 0 01-1.02.27c-2.8-1.71-6.32-2.1-10.47-1.15a.75.75 0 11-.33-1.46c4.52-1.03 8.42-.58 11.58 1.28a.75.75 0 01.24 1.06zm1.47-3.27a.94.94 0 01-1.28.34c-3.2-1.95-8.08-2.52-11.87-1.38a.94.94 0 11-.55-1.8c4.35-1.32 9.75-.67 13.42 1.57a.94.94 0 01.28 1.27zm.13-3.41C15.24 8.4 8.82 8.16 5.16 9.28a1.12 1.12 0 11-.65-2.15c4.17-1.27 11.28-1.02 15.63 1.4a1.12 1.12 0 11-1.17 1.95z" />
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
  {
    name: "Apple Podcasts",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M5.34 0A5.34 5.34 0 000 5.34v13.32A5.34 5.34 0 005.34 24h13.32A5.34 5.34 0 0024 18.66V5.34A5.34 5.34 0 0018.66 0H5.34zm9.3 4.07c2.84 0 5.14 2.3 5.14 5.14 0 1.92-1.06 3.59-2.62 4.47.09.35.14.72.14 1.1v1.55a2.07 2.07 0 01-4.13 0v-1.55c0-.38.05-.75.14-1.1a5.13 5.13 0 01-2.62-4.47c0-2.84 2.3-5.14 5.14-5.14zm0 2.07a3.07 3.07 0 100 6.14 3.07 3.07 0 000-6.14zm-3.1 9.28a3.1 3.1 0 016.2 0H11.54z" />
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
              <Link
                key={platform.name}
                href={platform.href}
                aria-label={`Listen on ${platform.name}`}
                className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-black"
              >
                {platform.icon}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
