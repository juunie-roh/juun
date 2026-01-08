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
  const normalizedPath = path.startsWith("/") ? path.slice(1) : path;

  return {
    ...Object.fromEntries(
      routing.locales.map((locale) => [
        locale,
        `${BASE_URL}/${locale}${normalizedPath ? `/${normalizedPath}` : ""}`,
      ]),
    ),
    "x-default": `${BASE_URL}/${routing.defaultLocale}${normalizedPath ? `/${normalizedPath}` : ""}`,
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
  return `${BASE_URL}/${locale}${normalizedPath ? `/${normalizedPath}` : ""}`;
}
