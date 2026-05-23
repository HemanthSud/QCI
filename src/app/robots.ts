import type { MetadataRoute } from "next";

import { siteMeta } from "@/lib/site-data";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/auth", "/members"],
    },
    sitemap: `${siteMeta.url}/sitemap.xml`,
    host: siteMeta.url,
  };
}
