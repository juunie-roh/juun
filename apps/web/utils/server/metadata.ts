import "server-only";

import { getLocale } from "next-intl/server";

import { routing } from "@/i18n/routing";

export const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL ?? ("https://juun.vercel.app" as const);

export function buildLocalizedUrl(locale: string, path: string = "") {
  const pathname = `/${locale}${path.startsWith("/") ? path : `/${path}`}`;
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
