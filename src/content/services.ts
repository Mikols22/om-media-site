// Service-line data shared between the /services overview and each
// standalone /services/[slug] page.
export type ServiceLine = {
  slug: string;
  name: string;
  tagline: string;
  summary: string;
};

export const serviceLines: ServiceLine[] = [
  {
    slug: "social-media-management",
    name: "Social Media Management",
    tagline: "Consistent, on-brand content that keeps your audience engaged.",
    summary:
      "Full-service social media management for Bucks County and Philadelphia-area businesses — content calendars, posting, and community engagement.",
  },
  {
    slug: "content-creation",
    name: "Content Creation",
    tagline: "Photo and video content built for how people actually scroll.",
    summary:
      "On-location content creation for brands, restaurants, and service businesses across Bucks County and Philadelphia.",
  },
  {
    slug: "branding-shoots",
    name: "Branding Shoots",
    tagline: "Executive portraits and brand photography that command attention.",
    summary:
      "Personal and corporate branding shoots for founders, executives, and teams throughout the Philadelphia region.",
  },
  {
    slug: "podcast-production",
    name: "The OM hOMe Show",
    tagline: "A one-on-one podcast for the people building, designing, and selling the spaces around us.",
    summary:
      "A podcast produced by OM Media and recorded in our Doylestown studio, featuring builders, designers, realtors, and hospitality leaders.",
  },
  {
    slug: "video-production",
    name: "Video Production",
    tagline: "Cinematic video production for brands that want to be seen.",
    summary:
      "End-to-end video production, from concept to final cut, for businesses across the Philadelphia and Bucks County area.",
  },
];
