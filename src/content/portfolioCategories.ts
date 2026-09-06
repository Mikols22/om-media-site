// Per-category intro copy and page metadata for /portfolio/[slug], keyed by
// the same slugs as portfolioImages.ts. Kept separate from that file since
// portfolioImages is also consumed directly by /hospitality, /golf, /work,
// and ContactFlow for just the raw image arrays — this is /portfolio/[slug]
// specific content, but intro + metadata live together here so they can't
// drift apart from each other.
export type PortfolioCategoryContent = {
  intro: string;
  metaTitle: string;
  metaDescription: string;
};

export const portfolioCategoryContent: Record<string, PortfolioCategoryContent> = {
  "real-estate": {
    intro:
      "Listing photography for agents, builders, and developers across Pennsylvania, New Jersey, and Delaware. Interiors, exteriors, twilight, and aerial coverage — the full set a listing needs, delivered fast enough to hit your launch date.",
    metaTitle: "Real Estate Photography in Bucks County & Philadelphia | OM Media",
    metaDescription:
      "Listing photography for agents, builders, and developers across Pennsylvania, New Jersey, and Delaware.",
  },
  "interior-design": {
    intro:
      "Portfolio photography for interior designers who need their finished work documented properly. Detail shots, full room compositions, and styled vignettes that hold up in print and on a design firm's website.",
    metaTitle: "Interior Design Photography in Bucks County, PA | OM Media",
    metaDescription:
      "Portfolio photography for interior designers who need their finished work documented properly.",
  },
  architecture: {
    intro:
      "Architectural photography for firms across the Philadelphia region and beyond. Exteriors, interiors, and aerial context that shows how a building sits in its site — the images architects use for awards submissions, press, and their own portfolios.",
    metaTitle: "Architectural Photography in Bucks County, PA | OM Media",
    metaDescription:
      "Architectural photography for firms across the Philadelphia region and beyond. Exteriors, interiors, and aerial context.",
  },
  commercial: {
    intro:
      "Commercial photography and video for businesses across Bucks County and Philadelphia. Team, workspace, product, and client-facing imagery for companies that need their marketing to look like the work they do.",
    metaTitle: "Commercial Photography in Bucks County, PA | OM Media",
    metaDescription:
      "Commercial photography and video for businesses across Bucks County and Philadelphia.",
  },
  hospitality: {
    // [PLACEHOLDER] Write real intro copy once this gallery has images.
    intro:
      "[PLACEHOLDER] Intro copy for hospitality photography — write once this gallery has images.",
    metaTitle: "Hospitality Photography in Bucks County, PA | OM Media",
    metaDescription:
      "Hospitality and hotel photography for venues across Bucks County and beyond. Gallery coming soon.",
  },
  "golf-courses": {
    // [PLACEHOLDER] Write real intro copy once this gallery has images.
    intro:
      "[PLACEHOLDER] Intro copy for golf course photography — write once this gallery has images.",
    metaTitle: "Golf Course Photography in Bucks County, PA | OM Media",
    metaDescription:
      "Golf course and country club photography for properties across the region. Gallery coming soon.",
  },
  "food-and-bev": {
    // [PLACEHOLDER] Write real intro copy once this gallery has images.
    intro:
      "[PLACEHOLDER] Intro copy for food & beverage photography — write once this gallery has images.",
    metaTitle: "Food & Beverage Photography in Bucks County, PA | OM Media",
    metaDescription:
      "Food and beverage photography for restaurants and hospitality brands. Gallery coming soon.",
  },
  lifestyle: {
    intro:
      "Brand and lifestyle photography for businesses that need real images of real people. Shot on location, styled to your brand, built for social, web, and advertising.",
    metaTitle: "Lifestyle Photography in Bucks County, PA | OM Media",
    metaDescription:
      "Brand and lifestyle photography for businesses that need real images of real people.",
  },
  headshots: {
    intro:
      "Executive and team headshots for businesses across Bucks County, Philadelphia, and the surrounding region. Environmental portraits shot on location at your office, plus studio sessions when you need a clean backdrop. Consistent lighting and treatment across a full team, so everyone's photo looks like it belongs to the same company.",
    metaTitle: "Headshot Photography in Bucks County, PA | OM Media",
    metaDescription:
      "Executive and team headshots for businesses across Bucks County, Philadelphia, and the surrounding region.",
  },
};
