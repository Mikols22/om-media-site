import type { MetadataRoute } from "next";
import { industryItems } from "@/components/IndustryGrid";
import { serviceLines } from "@/content/services";
import { SITE_URL } from "@/lib/site";

const staticRoutes: {
  path: string;
  changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  priority: number;
}[] = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/work", changeFrequency: "weekly", priority: 0.8 },
  { path: "/services", changeFrequency: "monthly", priority: 0.8 },
  { path: "/hospitality", changeFrequency: "monthly", priority: 0.8 },
  { path: "/golf", changeFrequency: "monthly", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.6 },
  { path: "/creators", changeFrequency: "monthly", priority: 0.5 },
  { path: "/book", changeFrequency: "monthly", priority: 0.9 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    ...staticRoutes.map((route) => ({
      url: `${SITE_URL}${route.path}`,
      lastModified,
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...serviceLines.map((service) => ({
      url: `${SITE_URL}/services/${service.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      // Flagship local SEO page gets top priority among service pages.
      priority: service.slug === "social-media-management" ? 0.9 : 0.7,
    })),
    ...industryItems.map((item) => ({
      url: `${SITE_URL}/portfolio/${item.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.5,
    })),
  ];
}
