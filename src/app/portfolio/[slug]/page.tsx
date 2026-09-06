"use client";

import Link from "next/link";
import { use } from "react";
import PortfolioGallery from "@/components/PortfolioGallery";
import { portfolioImages } from "@/content/portfolioImages";

function formatSlug(slug: string) {
  return slug.replace(/-/g, " ").toUpperCase();
}

export default function PortfolioPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const images = portfolioImages[slug] || [];

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
            ? "A curated gallery of our finest work in this category."
            : "Gallery coming soon. Check back as we add new work."}
        </p>
      </div>

      {images.length > 0 && (
        <div className="mt-16">
          <PortfolioGallery images={images} alt={formatSlug(slug)} />
        </div>
      )}
    </main>
  );
}
