import type { Locale, PostCategory } from "@juun/db";
import post from "@juun/db/post";
import { cacheLife, cacheTag } from "next/cache";

import { routing } from "@/i18n/routing";

const DEFAULT_LOCALE: Locale = routing.defaultLocale;

export async function all(locale: Locale = DEFAULT_LOCALE) {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts", `posts-${locale}`);
  return await post.select.all(locale);
}

export async function byTags(tags: string[], locale: Locale = DEFAULT_LOCALE) {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts", `posts-${locale}`, ...tags);
  return await post.select.byTags(tags, locale);
}

export async function byCategory(
  category: PostCategory,
  locale: Locale = DEFAULT_LOCALE,
) {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts", `posts-${locale}`, category);
  return await post.select.byCategory(category, locale);
}

export async function byId(id: number, locale: Locale = DEFAULT_LOCALE) {
  "use cache";
  cacheLife("weeks");
  cacheTag("posts", `post-${id}`, `post-${id}-${locale}`);
  return await post.select.byId(id, locale);
}
