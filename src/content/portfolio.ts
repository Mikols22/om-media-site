import { getAssetUrl } from "@/lib/assets";

// Case studies shared between the homepage's sticky-scroll teaser
// (StickyPortfolio) and the standalone /work overview page.
export type CaseStudy = {
  id: string;
  title: string;
  subheading: string;
  video: string;
  // Poster frame shown before the video mounts (see StickyPortfolio's
  // visibility-gated video loading). Add the file under
  // public/images/portfolio/ and set this path once available — until then,
  // components fall back to a placeholder. See PLACEHOLDER note below for
  // exact filenames and frame-grab guidance.
  poster?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    id: "meridian",
    title: "Avalon | Summerhouse Design",
    subheading: "High-end interior and architectural showcase.",
    video: getAssetUrl(
      "avalon-summerhouse-1920.mp4",
      "/videos/177-59th-st-horizontal.mp4",
    ),
    // [PLACEHOLDER] poster: "/images/portfolio/avalon-summerhouse-poster.jpg",
  },
  {
    id: "apex",
    title: "Warwick Farm Brewing | Bourbon Release",
    subheading: "Dynamic event coverage for an exclusive product launch.",
    video: getAssetUrl(
      "warwick-farm-bourbon-1920.mp4",
      "/videos/warwick_farm-brewing_bourbon-release.mov",
    ),
    // [PLACEHOLDER] poster: "/images/portfolio/warwick-farm-bourbon-poster.jpg",
  },
  {
    id: "noir",
    title: "Asher Architects | Ocean County NJ",
    subheading: "Stunning coastal architecture and luxury design.",
    video: getAssetUrl(
      "asher-architects-1920.mp4",
      "/videos/26-laurel-ridge-rd-asher-architects.mov",
    ),
    // [PLACEHOLDER] poster: "/images/portfolio/asher-architects-poster.jpg",
  },
];
