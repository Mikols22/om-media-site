// Canonical production domain. Set NEXT_PUBLIC_SITE_URL in the environment
// to override (e.g. for preview deployments).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.om-media.com";
