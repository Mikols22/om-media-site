import { getAssetUrl } from "@/lib/assets";

// Shared between /portfolio/[slug] and /hospitality (which pulls the
// hospitality + golf-courses categories into one national landing page).
export const portfolioImages: Record<string, string[]> = {
  "real-estate": Array.from(
    { length: 27 },
    (_, i) =>
      `/images/portfolio/real-estate/real-estate-${String(i + 1).padStart(2, "0")}.jpg`,
  ),
  "interior-design": ["/images/outside-interiors-1.jpg"],
  // B2-hosted (Galleries/architecture/) — replaces the old single
  // placeholder image entirely.
  architecture: Array.from({ length: 22 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    return getAssetUrl(
      `Galleries/architecture/architecture-${num}.jpg`,
      `/images/portfolio/architecture/architecture-${num}.jpg`,
    );
  }),
  lifestyle: ["/images/lifestyle-place-holder.jpg"],
  commercial: ["/images/silverstein-properties.jpg"],
  // B2-hosted (Galleries/hospitality/) — see HOSPITALITY_FILES below for the
  // file list and per-image alt text (portfolioImageAlts.hospitality).
  hospitality: [],
  "food-and-bev": [],
  "golf-courses": [],
  headshots: Array.from(
    { length: 15 },
    (_, i) => `/images/portfolio/headshots/larken-${String(i + 1).padStart(2, "0")}.jpg`,
  ),
};

// Hospitality filenames are irregular (real camera exports + descriptive
// names, not a sequential pattern) and need real per-image alt text rather
// than a generic "base string + index" — see portfolioImageAlts below and
// PortfolioGallery's alt prop, which accepts a per-image array for exactly
// this case. Of the 47 files actually in the bucket, 3 are excluded here:
// the three Fairmount images exist twice (once as .webp, once as a
// " copy.jpg" duplicate) — kept the .webp versions, smaller and without the
// stray "copy" in the name.
const HOSPITALITY_FILES: { file: string; alt: string }[] = [
  { file: "DJI_20240422115219_0003_D.jpg", alt: "Hospitality photography 1" },
  { file: "DJI_20240422115712_0013_D.jpg", alt: "Hospitality photography 2" },
  { file: "DJI_20240422120420_0027_D-Edit.jpg", alt: "Hospitality photography 3" },
  { file: "DJI_20240817064956_0321_D.jpg", alt: "Hospitality photography 4" },
  { file: "DJI_20240817074811_0334_D-2.jpg", alt: "Hospitality photography 5" },
  { file: "DJI_20240822082637_0447_D 2.jpg", alt: "Hospitality photography 6" },
  { file: "DJI_20240822121830_0261_D.jpg", alt: "Hospitality photography 7" },
  { file: "DJI_20240822191532_0303_D.jpg", alt: "Hospitality photography 8" },
  { file: "DSC00979.jpg", alt: "Hospitality photography 9" },
  { file: "DSC00982.jpg", alt: "Hospitality photography 10" },
  { file: "DSC00990.jpg", alt: "Hospitality photography 11" },
  { file: "DSC01255.jpg", alt: "Hospitality photography 12" },
  { file: "DSC01447.jpg", alt: "Hospitality photography 13" },
  { file: "DSC01518.jpg", alt: "Hospitality photography 14" },
  { file: "DSC01585-Edit.jpg", alt: "Hospitality photography 15" },
  { file: "DSC01605.jpg", alt: "Hospitality photography 16" },
  { file: "DSC01645.jpg", alt: "Hospitality photography 17" },
  { file: "DSC01974.jpg", alt: "Hospitality photography 18" },
  { file: "DSC02048.jpg", alt: "Hospitality photography 19" },
  { file: "DSC02276.jpg", alt: "Hospitality photography 20" },
  { file: "DSC02444.jpg", alt: "Hospitality photography 21" },
  { file: "DSC02537.jpg", alt: "Hospitality photography 22" },
  { file: "DSC02683.jpg", alt: "Hospitality photography 23" },
  { file: "DSC02745.jpg", alt: "Hospitality photography 24" },
  { file: "DSC02823.jpg", alt: "Hospitality photography 25" },
  { file: "breckenridge-2.jpg", alt: "Breckenridge 2" },
  { file: "breckenridge.jpg", alt: "Breckenridge" },
  { file: "city.jpg", alt: "City" },
  { file: "conf 5.jpg", alt: "Hospitality photography 26" },
  { file: "costa-rica-1.jpg", alt: "Costa Rica 1" },
  { file: "costa-rica-2.jpg", alt: "Costa Rica 2" },
  { file: "costa-rica-3.jpg", alt: "Costa Rica 3" },
  { file: "costa-rica-4.JPEG", alt: "Costa Rica 4" },
  { file: "fairmount-country-club-bar-2.webp", alt: "Fairmount Country Club bar 2" },
  { file: "fairmount-country-club-bar.webp", alt: "Fairmount Country Club bar" },
  {
    file: "fairmount-country-club-dining-room.webp",
    alt: "Fairmount Country Club dining room",
  },
  { file: "hilton-tempo-bar.jpg", alt: "Hilton Tempo bar" },
  { file: "hilton-tempo-rooftop.jpg", alt: "Hilton Tempo rooftop bar" },
  { file: "lunch.jpg", alt: "Lunch" },
  { file: "mason-cottage-bar.jpg", alt: "Mason Cottage bar" },
  { file: "mason-cottage-lobby.jpg", alt: "Mason Cottage lobby" },
  { file: "mason-cottage-tub.jpg", alt: "Mason Cottage tub" },
  { file: "mirival-bourbon.jpg", alt: "Miraval bourbon" },
  { file: "mirival-resort-lexus.jpg", alt: "Miraval resort Lexus" },
];

portfolioImages.hospitality = HOSPITALITY_FILES.map(({ file }) =>
  getAssetUrl(`Galleries/hospitality/${file}`, `/images/portfolio/hospitality/${file}`),
);

// Per-image alt text for categories where "base string + index" isn't
// descriptive enough — parallel to portfolioImages[slug], same length and
// order. Categories without an entry here fall back to ALT_TEXT_OVERRIDES
// (or formatSlug) + index in /portfolio/[slug]/page.tsx.
export const portfolioImageAlts: Record<string, string[]> = {
  hospitality: HOSPITALITY_FILES.map(({ alt }) => alt),
};
