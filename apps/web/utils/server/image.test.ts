import fs from "fs";
import path from "path";
import probe from "probe-image-size";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Mock server-only to prevent import errors in test environment
vi.mock("server-only", () => ({}));

// Mock dependencies
vi.mock("fs");
vi.mock("probe-image-size");

import { getImageDimensions } from "./image";

describe("getImageDimensions", () => {
  const mockWidth = 800;
  const mockHeight = 600;

  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
    // Reset console.warn mock
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

    it("should return null and warn on remote URL probe failure", async () => {
      const url = "https://example.com/invalid.jpg";
      const error = new Error("Network error");
      vi.mocked(probe).mockRejectedValue(error);

      const result = await getImageDimensions(url);

      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalledWith(
        `[Image] Failed to get dimensions for: ${url}`,
        error,
      );
    });

    it("should handle different image formats from remote URLs", async () => {
      const formats = [
        "https://example.com/image.jpg",
        "https://example.com/image.png",
        "https://example.com/image.webp",
        "https://example.com/image.gif",
        "https://example.com/image.svg",
      ];

      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      for (const url of formats) {
        const result = await getImageDimensions(url);
        expect(result).toEqual({ width: mockWidth, height: mockHeight });
      }
    });
  });

  describe("Local Files", () => {
    const mockStream = {
      destroy: vi.fn(),
    };

    beforeEach(() => {
      vi.spyOn(fs, "createReadStream").mockReturnValue(
        mockStream as unknown as fs.ReadStream,
      );
    });

    it("should get dimensions from local file with leading slash", async () => {
      const src = "/images/photo.jpg";
      const expectedPath = path.join(
        process.cwd(),
        "public",
        "images/photo.jpg",
      );

      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      const result = await getImageDimensions(src);

      expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
      expect(fs.createReadStream).toHaveBeenCalledWith(expectedPath);
      expect(probe).toHaveBeenCalledWith(mockStream);
      expect(mockStream.destroy).toHaveBeenCalled();
      expect(result).toEqual({ width: mockWidth, height: mockHeight });
    });

    it("should get dimensions from local file without leading slash", async () => {
      const src = "images/photo.jpg";
      const expectedPath = path.join(
        process.cwd(),
        "public",
        "images/photo.jpg",
      );

      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      const result = await getImageDimensions(src);

      expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
      expect(fs.createReadStream).toHaveBeenCalledWith(expectedPath);
      expect(probe).toHaveBeenCalledWith(mockStream);
      expect(mockStream.destroy).toHaveBeenCalled();
      expect(result).toEqual({ width: mockWidth, height: mockHeight });
    });

    it("should return null when local file does not exist", async () => {
      const src = "/images/missing.jpg";
      const expectedPath = path.join(
        process.cwd(),
        "public",
        "images/missing.jpg",
      );

      vi.spyOn(fs, "existsSync").mockReturnValue(false);

      const result = await getImageDimensions(src);

      expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
      expect(fs.createReadStream).not.toHaveBeenCalled();
      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalledWith(
        `[Image] File not found: ${expectedPath}`,
      );
    });

    it("should return null when probe fails on local file", async () => {
      const src = "/images/corrupt.jpg";
      const error = new Error("Corrupt image");

      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.mocked(probe).mockRejectedValue(error);

      const result = await getImageDimensions(src);

      // Note: Stream is not destroyed on error - potential resource leak
      // The stream.destroy() call only happens after successful probe
      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalledWith(
        `[Image] Failed to get dimensions for: ${src}`,
        error,
      );
    });

    it("should handle nested directory paths", async () => {
      const src = "/blog/2024/01/image.jpg";
      const expectedPath = path.join(
        process.cwd(),
        "public",
        "blog/2024/01/image.jpg",
      );

      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      const result = await getImageDimensions(src);

      expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
      expect(result).toEqual({ width: mockWidth, height: mockHeight });
    });
  });

  describe("Error Handling", () => {
    it("should return null and warn on probe error", async () => {
      const src = "https://example.com/broken.jpg";
      const error = new Error("Probe failed");

      vi.mocked(probe).mockRejectedValue(error);

      const result = await getImageDimensions(src);

      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalledWith(
        `[Image] Failed to get dimensions for: ${src}`,
        error,
      );
    });

    it("should handle timeout errors gracefully", async () => {
      const src = "https://slow-server.com/image.jpg";
      const error = new Error("Request timeout");

      vi.mocked(probe).mockRejectedValue(error);

      const result = await getImageDimensions(src);

      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalled();
    });

    it("should handle invalid probe responses", async () => {
      const src = "https://example.com/image.jpg";

      // Mock probe returning invalid data
      vi.mocked(probe).mockResolvedValue({
        width: undefined,
        height: undefined,
      } as never);

      const result = await getImageDimensions(src);

      // Should still return the result, even with undefined values
      expect(result).toEqual({ width: undefined, height: undefined });
    });
  });

  describe("Edge Cases", () => {
    it("should handle URLs with query parameters", async () => {
      const url = "https://example.com/image.jpg?width=800&quality=high";

      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      const result = await getImageDimensions(url);

      expect(probe).toHaveBeenCalledWith(url);
      expect(result).toEqual({ width: mockWidth, height: mockHeight });
    });

    it("should handle URLs with fragments", async () => {
      const url = "https://example.com/image.jpg#section";

      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      const result = await getImageDimensions(url);

      expect(result).toEqual({ width: mockWidth, height: mockHeight });
    });

    it("should handle special characters in local paths", async () => {
      const src = "/images/photo with spaces.jpg";
      const expectedPath = path.join(
        process.cwd(),
        "public",
        "images/photo with spaces.jpg",
      );

      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.mocked(probe).mockResolvedValue({
        width: mockWidth,
        height: mockHeight,
      } as never);

      vi.spyOn(fs, "createReadStream").mockReturnValue({
        destroy: vi.fn(),
      } as unknown as fs.ReadStream);

      const result = await getImageDimensions(src);

      expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
      expect(result).toEqual({ width: mockWidth, height: mockHeight });
    });

    it("should handle empty string input", async () => {
      const src = "";
      const expectedPath = path.join(process.cwd(), "public", "");

      vi.spyOn(fs, "existsSync").mockReturnValue(false);

      const result = await getImageDimensions(src);

      expect(result).toBeNull();
      expect(console.warn).toHaveBeenCalledWith(
        `[Image] File not found: ${expectedPath}`,
      );
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

  describe("Real-world Use Cases", () => {
    it("should handle blog post images", async () => {
      const src = "/blog/posts/2024/featured-image.jpg";
      const expectedPath = path.join(
        process.cwd(),
        "public",
        "blog/posts/2024/featured-image.jpg",
      );

      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.mocked(probe).mockResolvedValue({
        width: 1200,
        height: 630,
      } as never);

      vi.spyOn(fs, "createReadStream").mockReturnValue({
        destroy: vi.fn(),
      } as unknown as fs.ReadStream);

      const result = await getImageDimensions(src);

      expect(fs.existsSync).toHaveBeenCalledWith(expectedPath);
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

    it("should handle user-generated content paths", async () => {
      const src = "/uploads/users/avatar-123.png";

      vi.spyOn(fs, "existsSync").mockReturnValue(true);
      vi.mocked(probe).mockResolvedValue({
        width: 256,
        height: 256,
      } as never);

      vi.spyOn(fs, "createReadStream").mockReturnValue({
        destroy: vi.fn(),
      } as unknown as fs.ReadStream);

      const result = await getImageDimensions(src);

      expect(result).toEqual({ width: 256, height: 256 });
    });
  });
});
