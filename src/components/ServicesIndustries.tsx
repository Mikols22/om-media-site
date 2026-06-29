"use client";

import Image from "next/image";
import Link from "next/link";

type GridItem = {
  id: string;
  slug: string;
  title: string;
  category: "INDUSTRY";
  description: string;
  imageSrc: string;
  className: string;
};

const gridItems: GridItem[] = [
  {
    id: "real-estate",
    slug: "real-estate",
    title: "Real Estate",
    category: "INDUSTRY",
    description: "Luxury properties brought to life on screen.",
    imageSrc: "/images/high-dunes-avalon.png",
    className: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: "interior-design",
    slug: "interior-design",
    title: "Interior Design",
    category: "INDUSTRY",
    description: "Spaces styled with cinematic precision.",
    imageSrc: "/images/outside-interiors-1.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "architecture",
    slug: "architecture",
    title: "Architecture",
    category: "INDUSTRY",
    description: "Structural beauty captured from every angle.",
    imageSrc: "/images/river-rd-caryn-black.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "hospitality",
    slug: "hospitality",
    title: "Hospitality",
    category: "INDUSTRY",
    description: "Hotels and venues with unforgettable visual identity.",
    imageSrc: "/images/hotel-fort-myers-fl.jpeg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "lifestyle",
    slug: "lifestyle",
    title: "Lifestyle",
    category: "INDUSTRY",
    description: "Aspirational content that connects with audiences.",
    imageSrc: "/images/lifestyle-place-holder.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "golf-courses",
    slug: "golf-courses",
    title: "Golf Courses",
    category: "INDUSTRY",
    description: "Sweeping aerials and course cinematography.",
    imageSrc: "/images/hole-2.jpg",
    className: "col-span-2 row-span-1 md:col-span-2",
  },
  {
    id: "food-bev",
    slug: "food-and-bev",
    title: "Food & Bev",
    category: "INDUSTRY",
    description: "Restaurants and brands served with visual appetite.",
    imageSrc: "/images/shrimp-pasta.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "commercial",
    slug: "commercial",
    title: "Commercial",
    category: "INDUSTRY",
    description: "High-impact campaigns for businesses that scale.",
    imageSrc: "/images/silverstein-properties.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "headshots",
    slug: "headshots",
    title: "Headshots",
    category: "INDUSTRY",
    description: "Professional portraits that command attention.",
    imageSrc: "/images/jim-blake-headshot.jpg",
    className: "col-span-2 row-span-1 md:col-span-2",
  },
];

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

const BentoCard = ({ item }: { item: GridItem }) => {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className={`group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-6 transition-colors duration-300 hover:border-white/20 ${item.className}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={item.imageSrc || "/placeholder.jpg"}
          alt={item.title}
          fill
          className="object-cover opacity-30 transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
      </div>

      <div className="relative z-10 mt-auto pointer-events-none">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
          INDUSTRY
        </p>
        <h3 className="text-2xl font-bold tracking-tight text-white">
          {item.title}
        </h3>
      </div>
    </Link>
  );
};

export default function ServicesIndustries() {
  return (
    <section className="bg-black">
      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <div className="mb-12 lg:mb-16">
          <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
            What We Do
          </p>
          <h2 className="mt-4 text-4xl font-bold tracking-tighter text-white lg:text-6xl">
            Services & Industries
          </h2>
        </div>

        <div className="grid auto-rows-[minmax(12rem,auto)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
          {gridItems.map((item, index) => (
            <BentoCard key={index} item={item} />
          ))}
        </div>
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
