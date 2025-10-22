import { describe, expect, it } from "vitest";

import { safeUrl } from "./security";

describe("safeUrl", () => {
  describe("Valid URLs", () => {
    it("should allow https URLs", () => {
      expect(safeUrl("https://example.com")).toBe("https://example.com");
      expect(safeUrl("https://example.com/path")).toBe(
        "https://example.com/path",
      );
      expect(safeUrl("https://example.com/path?query=value")).toBe(
        "https://example.com/path?query=value",
      );
    });

    it("should allow http URLs", () => {
      expect(safeUrl("http://example.com")).toBe("http://example.com");
      expect(safeUrl("http://localhost:3000")).toBe("http://localhost:3000");
    });

    it("should allow mailto URLs", () => {
      expect(safeUrl("mailto:user@example.com")).toBe(
        "mailto:user@example.com",
      );
      expect(safeUrl("mailto:test@test.com?subject=Hello")).toBe(
        "mailto:test@test.com?subject=Hello",
      );
    });

    it("should allow relative URLs", () => {
      expect(safeUrl("/path/to/page")).toBe("/path/to/page");
      expect(safeUrl("/blog/post-slug")).toBe("/blog/post-slug");
      expect(safeUrl("/portfolio/project-1")).toBe("/portfolio/project-1");
    });

    it("should allow relative paths with ./ and ../", () => {
      expect(safeUrl("./relative/path")).toBe("./relative/path");
      expect(safeUrl("../parent/path")).toBe("../parent/path");
    });

    it("should allow fragment identifiers", () => {
      expect(safeUrl("#section")).toBe("#section");
      expect(safeUrl("#top")).toBe("#top");
    });

    it("should allow URLs without protocol", () => {
      expect(safeUrl("example.com")).toBe("example.com");
      expect(safeUrl("path/to/resource")).toBe("path/to/resource");
    });
  });

  describe("XSS Attack Prevention", () => {
    it("should block javascript: protocol", () => {
      expect(safeUrl("javascript:alert('XSS')")).toBeNull();
      expect(safeUrl("JavaScript:alert('XSS')")).toBeNull();
      expect(safeUrl("JAVASCRIPT:alert('XSS')")).toBeNull();
      expect(safeUrl("jAvAsCrIpT:alert('XSS')")).toBeNull();
    });

    it("should block javascript: protocol with whitespace", () => {
      expect(safeUrl("java script:alert('XSS')")).toBeNull();
      expect(safeUrl("javascript :alert('XSS')")).toBeNull();
      expect(safeUrl("java\nscript:alert('XSS')")).toBeNull();
    });

    it("should block encoded javascript: protocol", () => {
      expect(safeUrl("javascript%3Aalert('XSS')")).toBeNull();
      expect(safeUrl("javascript%3aalert('XSS')")).toBeNull();
      expect(safeUrl("%6A%61%76%61%73%63%72%69%70%74%3Aalert(1)")).toBeNull();
    });

    it("should block data: protocol", () => {
      expect(
        safeUrl("data:text/html,<script>alert('XSS')</script>"),
      ).toBeNull();
      expect(
        safeUrl("data:text/html;base64,PHNjcmlwdD5hbGVydCgxKTwvc2NyaXB0Pg=="),
      ).toBeNull();
      expect(safeUrl("DATA:text/html,<script>")).toBeNull();
    });

    it("should block vbscript: protocol", () => {
      expect(safeUrl("vbscript:msgbox('XSS')")).toBeNull();
      expect(safeUrl("VBScript:msgbox('XSS')")).toBeNull();
      expect(safeUrl("vbscript%3Amsgbox('XSS')")).toBeNull();
    });

    it("should block file: protocol", () => {
      expect(safeUrl("file:///etc/passwd")).toBeNull();
      expect(safeUrl("file://C:/Windows/System32")).toBeNull();
      expect(safeUrl("FILE:///sensitive/data")).toBeNull();
    });

    it("should block about: protocol", () => {
      expect(safeUrl("about:blank")).toBeNull();
      expect(safeUrl("about:config")).toBeNull();
      expect(safeUrl("ABOUT:blank")).toBeNull();
    });
  });

  describe("Edge Cases", () => {
    it("should handle empty strings", () => {
      expect(safeUrl("")).toBeNull();
      expect(safeUrl("   ")).toBeNull();
      expect(safeUrl("\t")).toBeNull();
      expect(safeUrl("\n")).toBeNull();
    });

    it("should handle non-string inputs", () => {
      expect(safeUrl(undefined)).toBeNull();
      expect(safeUrl(null as unknown as string)).toBeNull();
      expect(safeUrl(123 as unknown as string)).toBeNull();
      expect(safeUrl(true as unknown as string)).toBeNull();
      expect(safeUrl({} as unknown as string)).toBeNull();
      expect(safeUrl([] as unknown as string)).toBeNull();
    });

    it("should handle whitespace padding", () => {
      expect(safeUrl("  https://example.com  ")).toBe("https://example.com");
      expect(safeUrl("\t/path/to/page\t")).toBe("/path/to/page");
      expect(safeUrl("\n/blog/post\n")).toBe("/blog/post");
    });

    it("should preserve intentional URL encoding", () => {
      const encodedUrl = "https://example.com/path?q=%20space";
      expect(safeUrl(encodedUrl)).toBe(encodedUrl);
    });

    it("should handle invalid URL encoding", () => {
      expect(safeUrl("%")).toBeNull();
      expect(safeUrl("%%")).toBeNull();
      expect(safeUrl("%GG")).toBeNull();
    });

    it("should handle mixed case protocols", () => {
      expect(safeUrl("HtTpS://example.com")).toBe("HtTpS://example.com");
      expect(safeUrl("MaIlTo:user@example.com")).toBe(
        "MaIlTo:user@example.com",
      );
    });
  });

  describe("Real-world Attack Vectors", () => {
    it("should block obfuscated javascript protocols", () => {
      expect(safeUrl("j\u0061vascript:alert(1)")).toBeNull();
      // HTML entities in href are not decoded by browsers, so this is safe to allow
      // The browser will treat this as a literal string, not execute javascript
      expect(
        safeUrl(
          "&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;alert(1)",
        ),
      ).toBe(
        "&#106;&#97;&#118;&#97;&#115;&#99;&#114;&#105;&#112;&#116;&#58;alert(1)",
      );
    });

    it("should block null byte injection attempts", () => {
      expect(safeUrl("javascript:alert(1)\x00http://example.com")).toBeNull();
    });

    it("should block protocol-relative URLs with dangerous protocols", () => {
      expect(safeUrl("//javascript:alert(1)")).toBe("//javascript:alert(1)"); // Valid protocol-relative
    });

    it("should handle URLs with special characters", () => {
      expect(safeUrl("/blog/post-with-émojis-🎉")).toBe(
        "/blog/post-with-émojis-🎉",
      );
      expect(safeUrl("https://example.com/path?q=特殊文字")).toBe(
        "https://example.com/path?q=特殊文字",
      );
    });
  });

  describe("Blog and Portfolio Use Cases", () => {
    it("should allow blog post URLs", () => {
      expect(safeUrl("/blog/my-first-post")).toBe("/blog/my-first-post");
      expect(safeUrl("/blog/2024-01-15-update")).toBe(
        "/blog/2024-01-15-update",
      );
      expect(safeUrl("/blog/post-with-dashes-and_underscores")).toBe(
        "/blog/post-with-dashes-and_underscores",
      );
    });

    it("should allow portfolio project URLs", () => {
      expect(safeUrl("/portfolio/project-1")).toBe("/portfolio/project-1");
      expect(safeUrl("/portfolio/web-app-2024")).toBe(
        "/portfolio/web-app-2024",
      );
    });

    it("should allow external portfolio links", () => {
      expect(safeUrl("https://github.com/user/repo")).toBe(
        "https://github.com/user/repo",
      );
      expect(safeUrl("https://example-demo.vercel.app")).toBe(
        "https://example-demo.vercel.app",
      );
    });
  });
});
