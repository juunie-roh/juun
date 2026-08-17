import { get } from "@vercel/blob";
import probe from "probe-image-size";
import type { Readable } from "stream";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock server-only to prevent import errors in test environment
vi.mock("server-only", () => ({}));

// Mock dependencies
vi.mock("@vercel/blob");
vi.mock("probe-image-size");

import { getImageDimensions } from "./image";

/**
 * A stand-in for a successful `get()`.
 *
 * The stream is a real `ReadableStream` so `Readable.fromWeb` runs for real -
 * mocking it out would hide a conversion break, which is the one piece of this
 * function most likely to regress on a dependency bump.
 */
function blobHit() {
  return {
    statusCode: 200,
    stream: new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(new Uint8Array([0x89, 0x50, 0x4e, 0x47]));
        controller.close();
      },
    }),
    blob: { contentType: "image/png" },
  } as unknown as Awaited<ReturnType<typeof get>>;
}

describe("getImageDimensions", () => {
  const mockWidth = 800;
  const mockHeight = 600;

  beforeEach(() => {
    vi.clearAllMocks();
    vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  describe("Remote URLs", () => {
    it("should get dimensions from https URL", async () => {
      const url = "https://example.com/image.jpg";
      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      const result = await getImageDimensions(url);

      expect(probe).toHaveBeenCalledWith(url);
      expect(result).toEqual({ width: mockWidth, height: mockHeight });
    });

    it("should get dimensions from http URL", async () => {
      const url = "http://example.com/image.png";
      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      const result = await getImageDimensions(url);

      expect(probe).toHaveBeenCalledWith(url);
      expect(result).toEqual({ width: mockWidth, height: mockHeight });
    });

    it("should not touch blob storage for remote URLs", async () => {
      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      await getImageDimensions("https://example.com/image.jpg");

      expect(get).not.toHaveBeenCalled();
    });

    it("should return null and warn on remote URL probe failure", async () => {
      const url = "https://example.com/invalid.jpg";
      const error = new Error("Network error");
      vi.mocked(probe).mockRejectedValue(error);

      const result = await getImageDimensions(url);

      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalledWith(
        `[Image] Failed to probe remote image: ${url}`,
        error,
      );
    });

    it("should handle URLs with query parameters and fragments", async () => {
      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      for (const url of [
        "https://example.com/image.jpg?width=800&quality=high",
        "https://example.com/image.jpg#section",
      ]) {
        const result = await getImageDimensions(url);
        expect(result).toEqual({ width: mockWidth, height: mockHeight });
      }
    });
  });

  describe("Blob-backed images", () => {
    it("should map the URL to a blob key by dropping the leading slash", async () => {
      vi.mocked(get).mockResolvedValue(blobHit());
      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      const result = await getImageDimensions("/images/blog/photo.jpg");

      expect(get).toHaveBeenCalledWith("images/blog/photo.jpg", {
        access: "private",
      });
      expect(result).toEqual({ width: mockWidth, height: mockHeight });
    });

    it("should handle nested directory paths", async () => {
      vi.mocked(get).mockResolvedValue(blobHit());
      vi.mocked(probe).mockResolvedValue({
        width: 1200,
        height: 630,
      } as never);

      const result = await getImageDimensions("/images/blog/2024/01/hero.jpg");

      expect(get).toHaveBeenCalledWith("images/blog/2024/01/hero.jpg", {
        access: "private",
      });
      expect(result).toEqual({ width: 1200, height: 630 });
    });

    it("should handle special characters in paths", async () => {
      vi.mocked(get).mockResolvedValue(blobHit());
      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      const result = await getImageDimensions(
        "/images/blog/photo with spaces.jpg",
      );

      expect(get).toHaveBeenCalledWith("images/blog/photo with spaces.jpg", {
        access: "private",
      });
      expect(result).toEqual({ width: mockWidth, height: mockHeight });
    });

    it("should destroy the stream after probing", async () => {
      let captured: Readable | undefined;
      vi.mocked(get).mockResolvedValue(blobHit());
      vi.mocked(probe).mockImplementation(async (source) => {
        captured = source as Readable;
        return { width: mockWidth, height: mockHeight } as never;
      });

      await getImageDimensions("/images/blog/photo.jpg");

      // probe only reads the header - the rest of the download must be dropped.
      expect(captured?.destroyed).toBe(true);
    });

    it("should destroy the stream even when probe throws", async () => {
      let captured: Readable | undefined;
      vi.mocked(get).mockResolvedValue(blobHit());
      vi.mocked(probe).mockImplementation(async (source) => {
        captured = source as Readable;
        throw new Error("Corrupt image");
      });

      const result = await getImageDimensions("/images/blog/corrupt.jpg");

      expect(result).toBeNull();
      expect(captured?.destroyed).toBe(true);
    });

    it("should return null when the blob is missing", async () => {
      vi.mocked(get).mockResolvedValue(null);

      const result = await getImageDimensions("/images/blog/missing.jpg");

      expect(result).toBeNull();
      expect(probe).not.toHaveBeenCalled();
    });

    it("should return null on a non-200 blob response", async () => {
      vi.mocked(get).mockResolvedValue({
        statusCode: 404,
      } as unknown as Awaited<ReturnType<typeof get>>);

      const result = await getImageDimensions("/images/blog/missing.jpg");

      expect(result).toBeNull();
      expect(probe).not.toHaveBeenCalled();
    });

    it("should return null and warn when the blob read throws", async () => {
      const error = new Error("Missing BLOB_READ_WRITE_TOKEN");
      vi.mocked(get).mockRejectedValue(error);

      const result = await getImageDimensions("/images/blog/photo.jpg");

      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalledWith(
        "[Image] Blob probe failed for: images/blog/photo.jpg",
        error,
      );
    });
  });

  describe("Non blob-backed sources", () => {
    it.each([
      ["a path outside /images/", "/uploads/users/avatar-123.png"],
      ["a path without a leading slash", "images/photo.jpg"],
      ["an empty string", ""],
      ["a bare filename", "photo.jpg"],
    ])("should return null and warn for %s", async (_label, src) => {
      const result = await getImageDimensions(src);

      expect(result).toBeNull();
      expect(get).not.toHaveBeenCalled();
      expect(console.warn).toHaveBeenCalledWith(
        `[Image] Not a blob-backed source: ${src}`,
      );
    });
  });

  describe("Real-world Use Cases", () => {
    it("should handle blog post images", async () => {
      vi.mocked(get).mockResolvedValue(blobHit());
      vi.mocked(probe).mockResolvedValue({
        width: 1200,
        height: 630,
      } as never);

      const result = await getImageDimensions(
        "/images/blog/featured-image.jpg",
      );

      expect(result).toEqual({ width: 1200, height: 630 });
    });

    it("should handle CDN URLs", async () => {
      const url = "https://cdn.example.com/assets/images/hero.webp";
      vi.mocked(probe).mockResolvedValue({
        width: 1920,
        height: 1080,
      } as never);

      const result = await getImageDimensions(url);

      expect(probe).toHaveBeenCalledWith(url);
      expect(result).toEqual({ width: 1920, height: 1080 });
    });

    it("should handle different image dimensions", async () => {
      const testCases = [
        { width: 1920, height: 1080 }, // 16:9
        { width: 1024, height: 768 }, // 4:3
        { width: 100, height: 100 }, // Square
        { width: 3840, height: 2160 }, // 4K
      ];

      for (const dimensions of testCases) {
        vi.mocked(probe).mockResolvedValue(dimensions as never);

        const result = await getImageDimensions(
          "https://example.com/image.jpg",
        );

        expect(result).toEqual(dimensions);
      }
    });
  });
});
