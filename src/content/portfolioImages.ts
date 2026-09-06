// Shared between /portfolio/[slug] and /hospitality (which pulls the
// hospitality + golf-courses categories into one national landing page).
export const portfolioImages: Record<string, string[]> = {
  "real-estate": Array.from({ length: 27 }, (_, i) => {
    const num = String(i + 1).padStart(2, "0");
    const ext = num === "22" ? "png" : "jpg"; // real-estate-22 is the one PNG
    return `/images/portfolio/real-estate/real-estate-${num}.${ext}`;
  }),
  "interior-design": ["/images/outside-interiors-1.jpg"],
  architecture: ["/images/river-rd-caryn-black.jpg"],
  lifestyle: ["/images/lifestyle-place-holder.jpg"],
  commercial: ["/images/silverstein-properties.jpg"],
  hospitality: [],
  "food-and-bev": [],
  "golf-courses": [],
  headshots: Array.from(
    { length: 15 },
    (_, i) => `/images/portfolio/headshots/larken-${String(i + 1).padStart(2, "0")}.jpg`,
  ),
};
