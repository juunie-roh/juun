import type { MetadataRoute } from "next";

import cache from "@/lib/cache";
import { BASE_URL, getLanguageAlternates } from "@/utils/server/metadata";

import { API_KEYS } from "./[locale]/cesium-utils/_data";
import { PLAYGROUND_ITEMS } from "./[locale]/playground/_data";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Create a sitemap entry with language alternates
 */
function createEntry(
  path: string,
  lastModified?: Date,
  options?: Partial<SitemapEntry>,
): SitemapEntry {
  return {
    url: `${BASE_URL}${path}`,
    lastModified: lastModified ?? new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: getLanguageAlternates(path),
    },
    ...options,
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    createEntry("", new Date(), { priority: 1.0 }),
    createEntry("/about"),
    createEntry("/blog"),
    createEntry("/playground"),
    createEntry("/cesium-utils"),
  ];

  // Blog posts (dynamic from database)
  const posts = await cache.post.get.all();
  const blogEntries: MetadataRoute.Sitemap = posts.map((post) =>
    createEntry(`/blog/${post.id}`, post.updated_at),
  );

  // Timeline items (dynamic from database)
  const timelineItems = await cache.timeline.get.all();
  const timelineEntries: MetadataRoute.Sitemap = timelineItems.map((item) =>
    createEntry(`/timeline/${item.id}`, item.updated_at),
  );

  // Playground items (static configuration)
  // Filter out external links (like /100days/index.html)
  const playgroundEntries: MetadataRoute.Sitemap = PLAYGROUND_ITEMS.filter(
    (item) => item.href.startsWith("/playground/"),
  ).map((item) =>
    createEntry(
      item.href,
      item.date instanceof Date ? item.date : new Date(item.date),
    ),
  );

  // Cesium API pages (static configuration)
  const cesiumEntries: MetadataRoute.Sitemap = API_KEYS.map((api) =>
    createEntry(`/cesium-utils/${api}`),
  );

  return [
    ...staticPages,
    ...blogEntries,
    ...timelineEntries,
    ...playgroundEntries,
    ...cesiumEntries,
  ];
}
