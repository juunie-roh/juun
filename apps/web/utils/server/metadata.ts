import "server-only";

import { getLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? ("https://juun.vercel.app" as const);

/**
 * Build a full URL with locale prefix for a given path
 * @param locale - The locale code (e.g., "ko", "en")
 * @param path - The path without locale (e.g., "/blog", "/blog/1"). Root "/" and "" both resolve without trailing slash.
 * @returns Full URL string (e.g., "https://juun.vercel.app/ko/blog")
 */
export function buildLocalizedUrl(locale: string, path: string = "") {
  const normalizedPath =
    path === "/" ? "" : path.startsWith("/") ? path : path ? `/${path}` : "";
  const pathname = `/${locale}${normalizedPath}`;
  return new URL(pathname, BASE_URL).toString();
}

/**
 * Generate language alternates for a given path
 * @param path - The path without locale (e.g., "/blog", "/blog/1", "/playground")
 * @returns Language alternates object for Next.js metadata
 */
export function getLanguageAlternates(path: string = "") {
  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        buildLocalizedUrl(locale, path),
      ]),
    ),
    "x-default": buildLocalizedUrl(routing.defaultLocale, path),
  };
}

/**
 * Generate canonical URL for a given path and locale
 * @param locale - The current locale
 * @param path - The path without locale (e.g., "/blog", "/blog/1")
 * @returns Canonical URL string
 */
export async function getCanonicalUrl(path: string = "") {
  const locale = await getLocale();
  return buildLocalizedUrl(locale, path);
}
