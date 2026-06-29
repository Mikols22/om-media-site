"use client";

import Image from "next/image";
import Link from "next/link";
import { use } from "react";

const portfolioImages: Record<string, string[]> = {
  "real-estate": [
    "/images/real-estate-1.jpg",
    "/images/real-estate-2.jpg",
    "/images/real-estate-3.jpg",
    "/images/real-estate-4.jpg",
    "/images/real-estate-5.jpg",
  ],
  "interior-design": ["/images/outside-interiors-1.jpg"],
  architecture: ["/images/river-rd-caryn-black.jpg"],
  lifestyle: ["/images/lifestyle-place-holder.jpg"],
  commercial: ["/images/silverstein-properties.jpg"],
  hospitality: [],
  "food-and-bev": [],
  "golf-courses": [],
  headshots: [],
};

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
    <main className="min-h-screen bg-black px-6 py-24 lg:px-12 lg:py-32">
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

      {images.length > 0 && (
        <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          {images.map((src, index) => (
            <div
              key={src}
              className={`group relative w-full overflow-hidden rounded-xl bg-zinc-900 ${
                index === 0
                  ? "aspect-square md:col-span-2 md:row-span-2 md:aspect-auto md:min-h-[28rem]"
                  : "aspect-video md:aspect-square"
              }`}
            >
              <Image
                src={src}
                alt={`${slug} portfolio image ${index + 1}`}
                fill
                sizes={
                  index === 0
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
