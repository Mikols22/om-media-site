import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export default function robots(): MetadataRoute.Robots {
  // Preview deployments (and local/non-Vercel environments) get a blanket
  // disallow so they never get indexed while pages still carry placeholder
  // copy. Only the real production deployment advertises the sitemap.
  if (process.env.VERCEL_ENV !== "production") {
    return {
      rules: {
        userAgent: "*",
        disallow: "/",
      },
    };
  }

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/api/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
