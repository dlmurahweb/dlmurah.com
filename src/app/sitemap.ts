import type { MetadataRoute } from "next";

import { env } from "@/lib/env";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["/", "/kebijakan-privasi", "/syarat-layanan"];

  return routes.map((route, index) => ({
    url: new URL(route, env.NEXT_PUBLIC_SITE_URL).toString(),
    changeFrequency: index === 0 ? "weekly" : "monthly",
    priority: index === 0 ? 1 : 0.4,
  }));
}
