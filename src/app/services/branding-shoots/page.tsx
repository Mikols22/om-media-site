import type { Metadata } from "next";
import ServiceCTA from "@/components/ServiceCTA";
import ServiceHero from "@/components/ServiceHero";
import { LOCAL_SERVICE_AREAS } from "@/content/localSeo";
import { buildLocalBusinessSchema } from "@/lib/localBusinessSchema";

const PATH = "/services/branding-shoots";
const title =
  "Branding & Personal Branding Shoots | Bucks County & Philadelphia | OM Media";
const description =
  "Executive portraits and brand photography for founders, executives, and teams across Bucks County and Philadelphia.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

const SHOOT_INCLUDES = [
  "Founder and leadership portraits",
  "Team photography",
  "Environmental and lifestyle portraits",
  "Behind-the-scenes content",
  "Workspace and office imagery",
  "Process and craftsmanship",
  "Short-form video",
  "Drone photography and video",
];

const INDUSTRIES = [
  {
    label: "Builders, architects & interior designers",
    description:
      "Showcase your team, process, craftsmanship, finished work, and the people behind the projects.",
  },
  {
    label: "Real estate professionals",
    description:
      "Polished lifestyle imagery, headshots, community content, and social content that builds a recognizable personal brand.",
  },
  {
    label: "Hospitality & restaurants",
    description:
      "Capture the atmosphere, people, food, drinks, and experiences that make guests want to visit.",
  },
  {
    label: "Golf courses & country clubs",
    description:
      "Showcase the property, amenities, membership experience, events, dining, and the lifestyle around the club.",
  },
  {
    label: "Professional & service businesses",
    description:
      "Build trust through professional portraits, team imagery, client interaction, and authentic behind-the-scenes moments.",
  },
  {
    label: "Product & lifestyle brands",
    description:
      "Imagery and video that shows your products in context while reinforcing the identity of the brand behind them.",
  },
];

const localBusinessSchema = buildLocalBusinessSchema({
  path: PATH,
  serviceName: "Branding Shoots",
  description,
});

export default function BrandingShootsPage() {
  return (
    <main className="min-h-screen bg-black pt-20 lg:pt-[100px]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <ServiceHero
        eyebrow="Branding Shoots"
        title="Branding Shoots That Make Your Business More Recognizable"
        intro="Portraits, team imagery, and brand content that shows people who you are."
        serviceAreas={LOCAL_SERVICE_AREAS}
      />

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <div className="max-w-2xl space-y-6 text-neutral-400">
          <p>
            Your brand is more than a logo. It&apos;s the way your business
            looks, feels, communicates, and shows up across every platform.
          </p>
          <p>
            We create strategic branding photo and video shoots designed to
            give your business a strong, cohesive visual identity.
            Professional portraits, team imagery, lifestyle content, workspace
            photography, and brand video — a library that helps people
            understand who you are and what makes your company different.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Show people who you are
        </h2>
        <div className="mt-6 max-w-2xl space-y-6 text-neutral-400">
          <p>
            A strong branding shoot should tell the story of your business. We
            work with you beforehand to understand your company, your
            audience, your personality, and how you want to be perceived.
            From there we plan imagery that feels intentional and authentic to
            your brand.
          </p>
          <p>Depending on your business, a shoot may include:</p>
        </div>
        <ul className="mt-6 grid max-w-3xl grid-cols-1 gap-x-8 gap-y-3 text-neutral-400 sm:grid-cols-2">
          {SHOOT_INCLUDES.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="text-white">—</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          Built around your industry
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400">
          No two brands should look the same.
        </p>
        <dl className="mt-8 max-w-2xl space-y-6">
          {INDUSTRIES.map((item) => (
            <div
              key={item.label}
              className="border-t border-white/10 pt-6 first:border-t-0 first:pt-0"
            >
              <dt className="font-semibold text-white">{item.label}</dt>
              <dd className="mt-1 text-neutral-400">{item.description}</dd>
            </div>
          ))}
        </dl>
      </div>

      <ServiceCTA
        title="Ready for your close-up?"
        description="Tell us about you or your team and we'll set up a shoot."
      />
    </main>
  );
}
