import type { MetadataRoute } from "next";

import { siteMeta } from "@/lib/site-data";
import { publicSitemapRoutes } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return publicSitemapRoutes.map((route) => ({
    url: new URL(route.path, siteMeta.url).toString(),
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
