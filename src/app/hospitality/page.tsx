import type { Metadata } from "next";
import Image from "next/image";
import ServiceCTA from "@/components/ServiceCTA";
import { HOSPITALITY_SERVICE_AREAS } from "@/content/localSeo";
import { portfolioImages } from "@/content/portfolioImages";
import { buildLocalBusinessSchema } from "@/lib/localBusinessSchema";

const PATH = "/hospitality";
const title =
  "Hospitality Production for Hotels, Resorts & Restaurants | OM Media";
const description =
  "Photography and video production for hotel groups, boutique properties, resorts, and restaurants — OM Media works with hospitality brands worldwide.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

// National/global landing page — LocalBusiness data included for
// consistency, but deliberately not geo-targeted the way the five
// /services/[slug] pages are.
const localBusinessSchema = buildLocalBusinessSchema({
  path: PATH,
  serviceName: "Hospitality Production",
  description,
  areaServed: HOSPITALITY_SERVICE_AREAS,
});

const whatWeProduce = [
  "Guest room and suite photography",
  "Food and beverage photography, styled and shot on site",
  "Lifestyle and event coverage",
  "Video and social reels for Instagram and TikTok",
  "Full brand campaigns and multi-day productions",
];

// Golf courses now have their own dedicated page at /golf — this gallery
// shows hospitality work only, to avoid overlapping content between pages.
const images = portfolioImages.hospitality;

export default function HospitalityPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <div className="px-6 py-20 lg:px-12 lg:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          Hospitality
        </p>
        <h1 className="mt-4 max-w-4xl text-5xl font-bold tracking-tighter text-white sm:text-6xl lg:text-7xl">
          Hospitality Production for Hotels, Resorts & Restaurants
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-neutral-400">
          Photography and video that makes people want to stay, dine, and
          come back.
        </p>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-2xl space-y-6 text-neutral-400">
          <p>
            Guests choose where to stay and where to eat long before they
            arrive. OM Media produces the imagery and video that makes them
            choose your property.
          </p>
          <p>
            We work with hotel groups, boutique properties, resorts, and
            restaurants — including Hyatt, Hilton, Hyatt Times Square, The
            Pridwin in the Hamptons, and Peddler&apos;s Village.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Capture the Experience
        </h2>
        <p className="mt-6 max-w-2xl text-neutral-400">
          Our hospitality work goes beyond rooms and plates. We tell the
          story of the property: the atmosphere, the amenities, the service,
          the reason someone books you instead of the place down the road.
          Luxury suites and rooftop lounges, chef-crafted plates, full bar
          scenes, and the moments in between that make a property feel like
          somewhere worth being.
        </p>
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
            ? "A curated selection of our hospitality production."
            : "Gallery coming soon. Check back as we add hospitality work."}
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
                  alt={`Hospitality portfolio image ${index + 1}`}
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
          Built for Scale
        </h2>
        <p className="mt-6 max-w-2xl text-neutral-400">
          Larger properties need more than a photographer with a camera. We
          scout locations, build shot lists with your marketing team, and
          bring a full crew when the project calls for it. Multi-day
          productions, coordinated across departments, delivered on an
          agreed timeline.
        </p>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Where We Work
        </h2>
        <p className="mt-6 max-w-2xl text-neutral-400">
          Headquartered in Doylestown, Pennsylvania. We work throughout the
          East Coast and travel for projects worldwide, including
          productions in Costa Rica.
        </p>
      </div>

      <ServiceCTA
        title="Have a property in mind?"
        description="Tell us about your hotel, resort, or restaurant and what you're looking to create."
      />
    </main>
  );
}
