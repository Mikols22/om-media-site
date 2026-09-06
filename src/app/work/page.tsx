import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { industryItems } from "@/components/IndustryGrid";
import { portfolioImages } from "@/content/portfolioImages";

const title = "Portfolio | OM Media";
const description =
  "Browse OM Media's portfolio by industry — real estate, interior design, architecture, commercial, hospitality, golf courses, food & beverage, lifestyle, and headshots.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
};

// Display order for this page only — independent of industryItems' own
// order, which drives the homepage bento grid's className spans.
const WORK_PAGE_ORDER = [
  "real-estate",
  "interior-design",
  "architecture",
  "commercial",
  "hospitality",
  "golf-courses",
  "food-and-bev",
  "lifestyle",
  "headshots",
];

const categories = WORK_PAGE_ORDER.map((slug) => {
  const item = industryItems.find((candidate) => candidate.slug === slug);
  if (!item) {
    throw new Error(`WORK_PAGE_ORDER references unknown slug: ${slug}`);
  }
  return item;
});

function CategoryCard({
  slug,
  title: categoryTitle,
  imageSrc,
}: {
  slug: string;
  title: string;
  imageSrc: string;
}) {
  const hasGallery = (portfolioImages[slug] ?? []).length > 0;

  return (
    <Link
      href={`/portfolio/${slug}`}
      className={`group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl border p-6 transition-colors duration-300 ${
        hasGallery
          ? "border-white/10 hover:border-white/30"
          : "border-dashed border-white/15 hover:border-white/25"
      }`}
    >
      {hasGallery ? (
        <>
          <Image
            src={imageSrc}
            alt={categoryTitle}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover opacity-70 transition-all duration-500 group-hover:scale-105 group-hover:opacity-100"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
        </>
      ) : (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 border-b border-white/5 bg-zinc-950">
          <span className="text-xs uppercase tracking-[0.3em] text-neutral-600">
            Coming Soon
          </span>
        </div>
      )}

      <div className="relative z-10">
        <h2 className="text-xl font-bold tracking-tight text-white sm:text-2xl">
          {categoryTitle}
        </h2>
      </div>
    </Link>
  );
}

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-black pt-16 lg:pt-20">
      <div className="px-6 py-20 lg:px-12 lg:py-28">
        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
          Portfolio
        </p>
        <h1 className="mt-4 text-5xl font-bold tracking-tighter text-white sm:text-6xl lg:text-7xl">
          Our Work
        </h1>
        <p className="mt-6 max-w-xl text-lg text-neutral-400">
          Browse our portfolio by industry.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 px-6 pb-20 sm:grid-cols-2 lg:grid-cols-3 lg:px-12 lg:pb-28">
        {categories.map((category) => (
          <CategoryCard
            key={category.slug}
            slug={category.slug}
            title={category.title}
            imageSrc={category.imageSrc}
          />
        ))}
      </div>
    </main>
  );
}
