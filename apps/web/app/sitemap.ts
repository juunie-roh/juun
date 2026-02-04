import type { MetadataRoute } from "next";

import { routing } from "@/i18n/routing";
import cache from "@/lib/cache";
import { BASE_URL, getLanguageAlternates } from "@/utils/server/metadata";

import { API_KEYS } from "./[locale]/cesium-utils/_data";
import { PLAYGROUND_ITEMS } from "./[locale]/playground/_data";

type SitemapEntry = MetadataRoute.Sitemap[number];

/**
 * Create a sitemap entry with language alternates
 * Uses the default locale for the canonical <loc> URL
 */
function createEntry(
  path: string,
  locale: string,
  lastModified?: Date,
  options?: Partial<SitemapEntry>,
): SitemapEntry {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return {
    url: `${BASE_URL}/${locale}${normalizedPath === "/" ? "" : normalizedPath}`,
    lastModified: lastModified ?? new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
    alternates: {
      languages: getLanguageAlternates(path),
    },
    ...options,
  };
}

// Helper to create entries for all locales
function createEntriesForAllLocales(
  path: string,
  lastModified?: Date,
  options?: Partial<SitemapEntry>,
): SitemapEntry[] {
  return routing.locales.map((locale) =>
    createEntry(path, locale, lastModified, options),
  );
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    ...createEntriesForAllLocales("", new Date(), { priority: 1.0 }),
    ...createEntriesForAllLocales("/about"),
    ...createEntriesForAllLocales("/blog"),
    ...createEntriesForAllLocales("/playground"),
    ...createEntriesForAllLocales("/cesium-utils"),
  ];

  // Blog posts
  const posts = await cache.post.select.all();
  const blogEntries = posts.flatMap((post) =>
    createEntriesForAllLocales(`/blog/${post.id}`, post.updated_at),
  );

  // Timeline items
  const timelineItems = await cache.timeline.select.all();
  const timelineEntries = timelineItems.flatMap((item) =>
    createEntriesForAllLocales(`/timeline/${item.id}`, item.updated_at),
  );

  // Playground items
  const playgroundEntries = PLAYGROUND_ITEMS.filter((item) =>
    item.href.startsWith("/playground/"),
  ).flatMap((item) =>
    createEntriesForAllLocales(
      item.href,
      item.date instanceof Date ? item.date : new Date(item.date),
    ),
  );

  // Cesium API pages
  const cesiumEntries = API_KEYS.flatMap((api) =>
    createEntriesForAllLocales(`/cesium-utils/${api}`),
  );

  return [
    ...staticPages,
    ...blogEntries,
    ...timelineEntries,
    ...playgroundEntries,
    ...cesiumEntries,
  ];
}
