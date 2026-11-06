// Industry/portfolio category data shared by IndustryGrid (client), /work
// and sitemap.ts (server), and ContactFlow. Lives here rather than in
// IndustryGrid.tsx because that file is "use client": plain arrays exported
// from a client module become client references when imported by a server
// component, so `.map` on them throws at render time (this broke /work and
// /sitemap.xml with a 500 when IndustryGrid gained "use client").

export type GridItem = {
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

// Categories with a dedicated landing page link there instead of their
// /portfolio/[slug] gallery — used by both /work and the homepage
// IndustryGrid so the two stay in sync.
export const LANDING_PAGE_HREFS: Record<string, string> = {
  hospitality: "/hospitality",
  "golf-courses": "/golf",
};

export function categoryHref(slug: string): string {
  return LANDING_PAGE_HREFS[slug] ?? `/portfolio/${slug}`;
}
