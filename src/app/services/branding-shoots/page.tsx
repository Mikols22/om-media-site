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

const localBusinessSchema = buildLocalBusinessSchema({
  path: PATH,
  serviceName: "Branding Shoots",
  description,
});

export default function BrandingShootsPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <ServiceHero
        eyebrow="Branding Shoots"
        title="Branding Shoots for Bucks County & Philadelphia Executives"
        intro="Executive portraits and brand photography that command attention — for founders, executives, and teams who refuse to blend in."
        serviceAreas={LOCAL_SERVICE_AREAS}
      />

      <div className="border-t border-white/10 px-6 py-20 lg:px-12 lg:py-28">
        <h2 className="text-3xl font-bold tracking-tight text-white lg:text-4xl">
          What&apos;s Included
        </h2>
        <p className="mt-4 max-w-2xl text-neutral-400">
          [PLACEHOLDER: expanded description — session length, deliverables,
          location options. See PersonalBranding component for existing
          homepage copy to adapt.]
        </p>
      </div>

      <ServiceCTA
        title="Ready for your close-up?"
        description="Tell us about you or your team and we'll set up a shoot."
      />
    </main>
  );
}
