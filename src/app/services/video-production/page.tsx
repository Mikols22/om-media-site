import type { Metadata } from "next";
import ServiceCTA from "@/components/ServiceCTA";
import ServiceHero from "@/components/ServiceHero";
import { LOCAL_SERVICE_AREAS } from "@/content/localSeo";
import { buildLocalBusinessSchema } from "@/lib/localBusinessSchema";

const PATH = "/services/video-production";
const title = "Video Production Services | Bucks County & Philadelphia | OM Media";
const description =
  "Cinematic video production for Bucks County and Philadelphia-area brands — from concept to final cut with OM Media.";

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
  serviceName: "Video Production",
  description,
});

export default function VideoProductionPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <ServiceHero
        eyebrow="Video Production"
        title="Video Production for Bucks County & Philadelphia Brands"
        intro="Cinematic video production for brands that want to be seen — from concept and shoot to final cut."
        serviceAreas={LOCAL_SERVICE_AREAS}
      />

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          What&apos;s Included
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400">
          [PLACEHOLDER: expanded description of pre-production, shoot days,
          and post-production included in this service.]
        </p>
      </div>

      <ServiceCTA
        title="Have a video project in mind?"
        description="Tell us what you're looking to create and we'll take it from there."
      />
    </main>
  );
}
