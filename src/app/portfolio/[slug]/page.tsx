import type { Metadata } from "next";
import Link from "next/link";
import PortfolioGallery from "@/components/PortfolioGallery";
import { portfolioCategoryContent } from "@/content/portfolioCategories";
import { portfolioImages } from "@/content/portfolioImages";

function formatSlug(slug: string) {
  return slug.replace(/-/g, " ").toUpperCase();
}

// Per-category override for the base alt text PortfolioGallery appends an
// index to (e.g. "Executive headshot 1") — falls back to formatSlug(slug)
// for categories that don't need anything more descriptive.
const ALT_TEXT_OVERRIDES: Record<string, string> = {
  headshots: "Executive headshot",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const content = portfolioCategoryContent[slug];
  const title = content?.metaTitle ?? `${formatSlug(slug)} | OM Media`;
  const description =
    content?.metaDescription ??
    "Browse OM Media's portfolio of video production and photography.";

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
    },
  };
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const images = portfolioImages[slug] || [];
  const content = portfolioCategoryContent[slug];

  return (
    <main className="min-h-screen bg-black py-24 lg:py-32">
      <div className="px-6 lg:px-12">
        <Link
          href="/"
          className="inline-flex items-center text-sm font-medium uppercase tracking-[0.2em] text-neutral-500 transition-colors duration-300 hover:text-white"
        >
          ← Back to Home
        </Link>

        <h1 className="mt-12 text-5xl font-bold tracking-tighter text-white sm:text-6xl md:text-7xl lg:text-8xl">
          {formatSlug(slug)}
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-neutral-400">
          {images.length > 0
            ? (content?.intro ??
              "A curated gallery of our finest work in this category.")
            : "Gallery coming soon. Check back as we add new work."}
        </p>
      </div>

      {images.length > 0 && (
        <div className="mt-16">
          <PortfolioGallery
            images={images}
            alt={ALT_TEXT_OVERRIDES[slug] ?? formatSlug(slug)}
          />
        </div>
      )}
    </main>
  );
}
