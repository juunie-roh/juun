import { MetadataRoute } from "next";

import { BASE_URL } from "@/constants";
import cache from "@/lib/cache";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await cache.post.get.all();
  return posts.map((post) => ({
    url: `${BASE_URL}/blog/${post.id}`,
    lastModified: post.updated_at,
  }));
}
