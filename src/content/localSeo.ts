// Geo-targeting data for the five local /services/[slug] pages — distinct
// from serviceAreas.ts, which describes the broader creator-network coverage
// (NYC Metro, NJ, Nationwide) used on CreatorForm/Footer.
export const LOCAL_SERVICE_AREAS = [
  "Doylestown",
  "Bucks County",
  "Philadelphia",
] as const;

// /golf: local geo-targeting plus a nod to national travel capability.
export const GOLF_SERVICE_AREAS = [
  "Pennsylvania",
  "New Jersey",
  "Delaware",
  "United States",
] as const;

// /hospitality serves a global clientele — no local geo emphasis.
export const HOSPITALITY_SERVICE_AREAS = ["Worldwide"] as const;

// Feeds the LocalBusiness JSON-LD on all six pages that use it, and the
// Footer's contact links.
export const LOCAL_BUSINESS_INFO = {
  name: "OM Media, LLC",
  email: "admin@oscarmikols.com",
  // E.164 format for structured data and tel: links.
  telephone: "+12673565837",
  // Human-readable format for visible UI.
  phoneDisplay: "(267) 356-5837",
  streetAddress: "87 N Broad St",
  addressLocality: "Doylestown",
  addressRegion: "PA",
  postalCode: "18901",
  addressCountry: "US",
};

// Social profile URLs — feeds LocalBusiness JSON-LD's sameAs array (how
// Google connects the site to these profiles) and the Footer's social
// links. Keep in sync if a handle ever changes.
export const SOCIAL_PROFILE_URLS = [
  "https://www.instagram.com/ommediallc/",
  "https://www.linkedin.com/company/oscarmikolsmedia/",
  "https://www.youtube.com/@ommediallc",
];

// Must match the Google Business Profile listing exactly — update both if
// hours change. Shape matches schema.org's OpeningHoursSpecification. Sunday
// (closed) is intentionally omitted — closed days aren't listed, they're
// left out.
export const LOCAL_BUSINESS_HOURS = [
  {
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday"],
    opens: "08:00",
    closes: "17:00",
  },
  {
    dayOfWeek: ["Friday"],
    opens: "08:00",
    closes: "15:00",
  },
  {
    dayOfWeek: ["Saturday"],
    opens: "08:00",
    closes: "12:00",
  },
];
