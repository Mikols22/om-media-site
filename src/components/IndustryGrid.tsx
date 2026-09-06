import Image from "next/image";
import Link from "next/link";

type GridItem = {
  id: string;
  slug: string;
  title: string;
  description: string;
  imageSrc: string;
  className: string;
};

// Canonical display order used anywhere all nine categories are listed
// together outside this component's own bento layout (e.g. /work,
// ContactFlow's project-type step) — independent of industryItems' own
// order below, which drives this file's bento className spans.
export const PORTFOLIO_CATEGORY_ORDER = [
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

export const industryItems: GridItem[] = [
  {
    id: "real-estate",
    slug: "real-estate",
    title: "Real Estate",
    description: "Luxury properties brought to life on screen.",
    imageSrc: "/images/high-dunes-avalon.png",
    className: "col-span-2 row-span-2 md:col-span-2 md:row-span-2",
  },
  {
    id: "interior-design",
    slug: "interior-design",
    title: "Interior Design",
    description: "Spaces styled with cinematic precision.",
    imageSrc: "/images/outside-interiors-1.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "architecture",
    slug: "architecture",
    title: "Architecture",
    description: "Structural beauty captured from every angle.",
    imageSrc: "/images/river-rd-caryn-black.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "hospitality",
    slug: "hospitality",
    title: "Hospitality",
    description: "Hotels and venues with unforgettable visual identity.",
    imageSrc: "/images/hotel-fort-myers-fl.jpeg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "lifestyle",
    slug: "lifestyle",
    title: "Lifestyle",
    description: "Aspirational content that connects with audiences.",
    imageSrc: "/images/lifestyle-place-holder.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "golf-courses",
    slug: "golf-courses",
    title: "Golf Courses",
    description: "Sweeping aerials and course cinematography.",
    imageSrc: "/images/hole-2.jpg",
    className: "col-span-2 row-span-1 md:col-span-2",
  },
  {
    id: "food-bev",
    slug: "food-and-bev",
    title: "Food & Bev",
    description: "Restaurants and brands served with visual appetite.",
    imageSrc: "/images/shrimp-pasta.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "commercial",
    slug: "commercial",
    title: "Commercial",
    description: "High-impact campaigns for businesses that scale.",
    imageSrc: "/images/silverstein-properties.jpg",
    className: "col-span-1 row-span-1",
  },
  {
    id: "headshots",
    slug: "headshots",
    title: "Headshots",
    description: "Professional portraits that command attention.",
    imageSrc: "/images/jim-blake-headshot.jpg",
    className: "col-span-2 row-span-1 md:col-span-2",
  },
];

function BentoCard({ item }: { item: GridItem }) {
  return (
    <Link
      href={`/portfolio/${item.slug}`}
      className={`group relative flex min-h-[240px] flex-col justify-end overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 p-6 transition-colors duration-300 hover:border-white/20 ${item.className}`}
    >
      <div className="absolute inset-0 z-0">
        <Image
          src={item.imageSrc || "/placeholder.jpg"}
          alt={item.title}
          fill
          sizes="(max-width: 768px) 50vw, 25vw"
          className="object-cover opacity-30 transition-all duration-700 group-hover:scale-105 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-500 group-hover:opacity-80" />
      </div>

      <div className="relative z-10 mt-auto pointer-events-none">
        <p className="mb-2 text-[10px] font-semibold uppercase tracking-widest text-neutral-400">
          INDUSTRY
        </p>
        <h3 className="text-2xl font-bold tracking-tight text-white">
          {item.title}
        </h3>
      </div>
    </Link>
  );
}

export default function IndustryGrid() {
  return (
    <div className="grid auto-rows-[minmax(12rem,auto)] grid-cols-2 gap-3 md:grid-cols-4 md:gap-4">
      {industryItems.map((item) => (
        <BentoCard key={item.id} item={item} />
      ))}
    </div>
  );
}
