import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

// Mock server-only to prevent import errors in test environment
vi.mock("server-only", () => ({}));

vi.mock("next-intl/server", () => ({
  getLocale: vi.fn(),
}));

vi.mock("@/i18n/routing", () => ({
  routing: {
    locales: ["ko", "en"],
    defaultLocale: "ko",
  },
}));

import { getLocale } from "next-intl/server";

import {
  BASE_URL,
  buildLocalizedUrl,
  getCanonicalUrl,
  getLanguageAlternates,
} from "./metadata";

describe("metadata", () => {
  beforeEach(() => {
    vi.mocked(getLocale).mockResolvedValue("ko");
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("BASE_URL", () => {
    it("should be defined", () => {
      expect(BASE_URL).toBeDefined();
      expect(BASE_URL).toMatch(/^https?:\/\//);
    });
  });

  describe("buildLocalizedUrl", () => {
    it("should build a URL with locale and path", () => {
      const result = buildLocalizedUrl("ko", "/blog");
      expect(result).toBe(`${BASE_URL}/ko/blog`);
    });

    it("should build a URL with locale and empty path", () => {
      const result = buildLocalizedUrl("ko", "/");
      expect(result).toBe(`${BASE_URL}/ko`);
    });

    it("should not add trailing slash for root path", () => {
      const result = buildLocalizedUrl("ko", "/");
      expect(result).toBe(`${BASE_URL}/ko`);
    });

    it("should handle path without leading slash", () => {
      const result = buildLocalizedUrl("en", "blog");
      expect(result).toBe(`${BASE_URL}/en/blog`);
    });

    it("should handle nested paths", () => {
      const result = buildLocalizedUrl("ko", "/blog/1");
      expect(result).toBe(`${BASE_URL}/ko/blog/1`);
    });

    it("should work with different locales", () => {
      const ko = buildLocalizedUrl("ko", "/about");
      const en = buildLocalizedUrl("en", "/about");
      expect(ko).toBe(`${BASE_URL}/ko/about`);
      expect(en).toBe(`${BASE_URL}/en/about`);
    });
  });

  describe("getLanguageAlternates", () => {
    it("should return alternates for all locales and x-default", () => {
      const result = getLanguageAlternates("/blog");
      expect(result).toEqual({
        ko: `${BASE_URL}/ko/blog`,
        en: `${BASE_URL}/en/blog`,
        "x-default": `${BASE_URL}/ko/blog`,
      });
    });

    it("should use x-default pointing to the default locale", () => {
      const result = getLanguageAlternates("/about");
      expect(result["x-default"]).toBe(`${BASE_URL}/ko/about`);
    });

    it("should handle empty path", () => {
      const result = getLanguageAlternates();
      expect(result).toEqual({
        ko: `${BASE_URL}/ko`,
        en: `${BASE_URL}/en`,
        "x-default": `${BASE_URL}/ko`,
      });
    });

    it("should handle nested paths", () => {
      const result = getLanguageAlternates("/blog/1") as Record<string, string>;
      expect(result["ko"]).toBe(`${BASE_URL}/ko/blog/1`);
      expect(result["en"]).toBe(`${BASE_URL}/en/blog/1`);
    });
  });

  describe("getCanonicalUrl", () => {
    it("should return canonical URL for current locale", async () => {
      const result = await getCanonicalUrl("/blog");
      expect(result).toBe(`${BASE_URL}/ko/blog`);
    });

    it("should use getLocale to determine the locale", async () => {
      vi.mocked(getLocale).mockResolvedValue("en");
      const result = await getCanonicalUrl("/about");
      expect(result).toBe(`${BASE_URL}/en/about`);
      expect(getLocale).toHaveBeenCalledOnce();
    });

    it("should handle empty path", async () => {
      const result = await getCanonicalUrl();
      expect(result).toBe(`${BASE_URL}/ko`);
    });
  });
});
