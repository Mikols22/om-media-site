import type { MetadataRoute } from "next";

// ⚠️ PRE-LAUNCH LOCKDOWN — unconditional Disallow: / across every
// environment (including production), ignoring VERCEL_ENV. The site isn't
// ready for indexing yet. This MUST be reverted to the environment-aware
// version (production gets real rules + sitemap, everything else stays
// locked down) before the real public launch.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      disallow: "/",
    },
  };
}
