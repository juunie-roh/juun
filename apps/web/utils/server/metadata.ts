import "server-only";

import { getLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

export const BASE_URL = "https://juun.vercel.app";

/**
 * Generate language alternates for a given path
 * @param path - The path without locale (e.g., "/blog", "/blog/1", "/playground")
 * @returns Language alternates object for Next.js metadata
 */
export function getLanguageAlternates(path: string = "") {
  // Remove leading slash for consistency
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  const getUrl = (locale: string) =>
    new URL(
      `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`,
      BASE_URL,
    ).toString();

  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [locale, getUrl(locale)]),
    ),
    "x-default": getUrl(routing.defaultLocale),
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
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return new URL(
    `/${locale}${normalizedPath === "/" ? "" : normalizedPath}`,
    BASE_URL,
  ).toString();
}
