import type { Metadata } from "next";
import ServiceCTA from "@/components/ServiceCTA";
import ServiceHero from "@/components/ServiceHero";
import { LOCAL_SERVICE_AREAS } from "@/content/localSeo";
import { buildLocalBusinessSchema } from "@/lib/localBusinessSchema";

const PATH = "/services/content-creation";
const title = "Content Creation Services | Bucks County & Philadelphia | OM Media";
const description =
  "On-location content creation for Bucks County and Philadelphia-area brands — photo and video built for how people actually scroll.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

const localBusinessSchema = buildLocalBusinessSchema({
  path: PATH,
  serviceName: "Content Creation",
  description,
});

export default function ContentCreationPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <ServiceHero
        eyebrow="Content Creation"
        title="Content Creation for Bucks County & Philadelphia Brands"
        intro="Photo and video content built for how people actually scroll — shot on location, edited for the platforms your audience is on."
        serviceAreas={LOCAL_SERVICE_AREAS}
      />

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          What&apos;s Included
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400">
          [PLACEHOLDER: expanded description of content creation deliverables
          — shoot cadence, deliverable formats, turnaround times.]
        </p>
      </div>

      <ServiceCTA
        title="Have a content need in mind?"
        description="Tell us about your brand and what you're looking to create."
      />
    </main>
  );
}
