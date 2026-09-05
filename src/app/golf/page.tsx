import type { Metadata } from "next";
import Image from "next/image";
import ServiceCTA from "@/components/ServiceCTA";
import { GOLF_SERVICE_AREAS } from "@/content/localSeo";
import { portfolioImages } from "@/content/portfolioImages";
import { buildLocalBusinessSchema } from "@/lib/localBusinessSchema";

const PATH = "/golf";
const title = "Golf Course Photography & Video | OM Media";
const description =
  "Course, clubhouse, and membership marketing photography and video for private clubs and resorts — OM Media works with golf properties across the region and nationally.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

// Portfolio-led landing page, local geo-targeting plus national travel —
// distinct from /hospitality's global/no-geo treatment.
const localBusinessSchema = buildLocalBusinessSchema({
  path: PATH,
  serviceName: "Golf Course Photography & Video",
  description,
  areaServed: GOLF_SERVICE_AREAS,
});

const whatWeProduce = [
  "Hole-by-hole drone flyovers",
  "Clubhouse and amenity photography",
  "Lifestyle imagery of members and events",
  "Tournament coverage",
  "Membership and recruitment marketing videos",
];

const images = portfolioImages["golf-courses"];

export default function GolfPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="px-6 py-20 lg:px-12 lg:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          Golf
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tighter text-white sm:text-6xl lg:text-7xl">
          Golf Course Photography & Video
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-400">
          Course, clubhouse, and membership marketing for private clubs and
          resorts.
        </p>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-2xl space-y-6 text-neutral-400">
          <p>
            Golf is as much about scenery as it is about sport. OM Media
            captures the beauty, the challenge, and the lifestyle that makes
            a club worth joining.
          </p>
          <p>
            We work with private clubs and resort courses including Look
            Away Golf Club, Doylestown Country Club, and Rehoboth Beach
            Country Club.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          What We Produce
        </h2>
        <ul className="mt-6 max-w-2xl space-y-3">
          {whatWeProduce.map((item) => (
            <li key={item} className="flex items-start gap-3 text-neutral-400">
              <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-white/40" />
              {item}
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Our Work
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400">
          {images.length > 0
            ? "A curated selection of our golf course production."
            : "Gallery coming soon. Check back as we add golf course work."}
        </p>

        {images.length > 0 && (
          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
            {images.map((src, index) => (
              <div
                key={src}
                className="relative aspect-video w-full overflow-hidden rounded-xl bg-zinc-900"
              >
                <Image
                  src={src}
                  alt={`Golf course portfolio image ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  className="object-cover transition-transform duration-700 hover:scale-105"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Why It Matters
        </h2>
        <p className="mt-6 max-w-2xl text-neutral-400">
          Professional imagery attracts new members, supports tournament
          promotion, and elevates how a club presents itself against the
          course down the road. Prospective members decide from photographs
          long before they schedule a tour.
        </p>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Where We Work
        </h2>
        <p className="mt-6 max-w-2xl text-neutral-400">
          Headquartered in Doylestown, Pennsylvania. Regular work from Bucks
          County to the New Jersey and Delaware shore, and travel for
          projects nationally.
        </p>
      </div>

      <ServiceCTA
        title="Have a course in mind?"
        description="Tell us about your club or resort and what you're looking to create."
      />
    </main>
  );
}
