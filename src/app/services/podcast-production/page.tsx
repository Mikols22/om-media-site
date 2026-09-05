import type { Metadata } from "next";
import ServiceCTA from "@/components/ServiceCTA";
import ServiceHero from "@/components/ServiceHero";
import { LOCAL_SERVICE_AREAS } from "@/content/localSeo";
import { buildLocalBusinessSchema } from "@/lib/localBusinessSchema";

const PATH = "/services/podcast-production";
const title = "Podcast Production | Bucks County & Philadelphia | OM Media";
const description =
  "Full podcast production for Bucks County and Philadelphia-based shows — recording, editing, and distribution from OM Media.";

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
  serviceName: "Podcast Production",
  description,
});

export default function PodcastProductionPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <ServiceHero
        eyebrow="Podcast Production"
        title="Podcast Production for Bucks County & Philadelphia Shows"
        intro="Studio-quality recording and editing, start to finish — so you can focus on the conversation, not the technical side."
        serviceAreas={LOCAL_SERVICE_AREAS}
      />

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          What&apos;s Included
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400">
          [PLACEHOLDER: expanded description of recording setup, editing
          turnaround, and distribution support included in this service.]
        </p>
      </div>

      <ServiceCTA
        title="Ready to launch or level up your show?"
        description="Tell us about your podcast and where you'd like to take it."
      />
    </main>
  );
}
