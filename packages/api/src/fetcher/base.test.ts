import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import Fetcher from "./base";
import FetcherError from "./error";

// Mock fetch globally
const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("Fetcher", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe("constructor", () => {
    it("should create instance with config", () => {
      const config = { baseUrl: "https://api.example.com", path: "/users" };
      const fetcher = new Fetcher(config);

      expect(fetcher).toBeInstanceOf(Fetcher);
      expect(fetcher.config).toEqual(config);
    });

    it("should create a copy of the config", () => {
      const config = { baseUrl: "https://api.example.com" };
      const fetcher = new Fetcher(config);

      config.baseUrl = "https://different.com";

      expect(fetcher.config.baseUrl).toBe("https://api.example.com");
    });
  });

  describe("getConfig", () => {
    it("should return readonly copy of config", () => {
      const config = {
        baseUrl: "https://api.example.com",
        method: "GET" as const,
      };
      const fetcher = new Fetcher(config);
      const returnedConfig = fetcher.config;

      expect(returnedConfig).toEqual(config);
      expect(returnedConfig).not.toBe(config);
    });
  });

  describe("execute", () => {
    it("should throw error if baseUrl is not set", async () => {
      const fetcher = new Fetcher({});

      await expect(fetcher.execute()).rejects.toThrow("Base URL is required");
    });

    it("should make GET request with correct URL", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        path: "/users",
        method: "GET",
      });

      await fetcher.execute();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.example.com/users",
        expect.objectContaining({
          method: "GET",
          headers: expect.objectContaining({
            "Content-Type": "application/json",
          }),
        }),
      );
    });

    it("should append query parameters to URL", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ success: true }), { status: 200 }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        path: "/users",
        queryParams: { page: 1, limit: 10, active: true },
      });

      await fetcher.execute();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.example.com/users?page=1&limit=10&active=true",
        expect.any(Object),
      );
    });

    it("should include custom headers", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ success: true }), { status: 200 }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        headers: { Authorization: "Bearer token", "X-Custom": "value" },
      });

      await fetcher.execute();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer token",
            "X-Custom": "value",
          },
        }),
      );
    });

    it("should send JSON body for POST request", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ id: 1 }), { status: 201 }),
      );

      const body = { name: "John Doe", email: "john@example.com" };
      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        path: "/users",
        method: "POST",
        body,
      });

      await fetcher.execute();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          method: "POST",
          body: JSON.stringify(body),
        }),
      );
    });

    it("should not send body for GET request", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify([]), { status: 200 }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        method: "GET",
        body: { ignored: true },
      });

      await fetcher.execute();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.not.objectContaining({
          body: expect.anything(),
        }),
      );
    });

    it("should parse JSON response", async () => {
      const responseData = { id: 1, name: "John Doe" };
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify(responseData), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const fetcher = new Fetcher({ baseUrl: "https://api.example.com" });
      const result = await fetcher.execute<{ id: number; name: string }>();

      expect(result).toEqual(responseData);
    });

    it("should parse text response when content-type is not JSON", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response("Plain text response", {
          status: 200,
          headers: { "Content-Type": "text/plain" },
        }),
      );

      const fetcher = new Fetcher({ baseUrl: "https://api.example.com" });
      const result = await fetcher.execute<string>();

      expect(result).toBe("Plain text response");
    });

    it("should default to JSON parsing when no content-type header", async () => {
      const responseData = { success: true };

      // Create a mock response that returns null for content-type
      const mockResponse = {
        ok: true,
        status: 200,
        headers: {
          get: vi.fn(() => null), // Return null for content-type
        },
        json: vi.fn(async () => responseData),
        text: vi.fn(async () => JSON.stringify(responseData)),
      } as unknown as Response;

      mockFetch.mockResolvedValueOnce(mockResponse);

      const fetcher = new Fetcher({ baseUrl: "https://api.example.com" });
      const result = await fetcher.execute();

      expect(result).toEqual(responseData);
      expect(mockResponse.json).toHaveBeenCalled();
      expect(mockResponse.text).not.toHaveBeenCalled();
    });

    it("should throw FetcherError on HTTP error status", async () => {
      mockFetch.mockResolvedValue(
        new Response(null, { status: 404, statusText: "Not Found" }),
      );

      const fetcher = new Fetcher({ baseUrl: "https://api.example.com" });

      await expect(fetcher.execute()).rejects.toThrow(FetcherError);
      await expect(fetcher.execute()).rejects.toThrow("HTTP 404: Not Found");
    });

    it("should throw FetcherError with response object", async () => {
      const errorResponse = new Response(null, {
        status: 500,
        statusText: "Internal Server Error",
      });
      mockFetch.mockResolvedValueOnce(errorResponse);

      const fetcher = new Fetcher({ baseUrl: "https://api.example.com" });

      try {
        await fetcher.execute();
      } catch (error) {
        expect(error).toBeInstanceOf(FetcherError);
        if (error instanceof FetcherError) {
          expect(error.status).toBe(500);
          expect(error.response).toBe(errorResponse);
        }
      }
    });

    it("should timeout after specified duration", async () => {
      // Mock AbortController.abort to trigger immediately
      const abortError = new Error("Aborted");
      abortError.name = "AbortError";

      mockFetch.mockImplementationOnce(() => Promise.reject(abortError));

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        timeout: 5000,
      });

      const executePromise = fetcher.execute();

      // Advance timers to trigger timeout
      vi.advanceTimersByTime(5000);

      await expect(executePromise).rejects.toThrow(FetcherError);
      await expect(executePromise).rejects.toThrow(
        "Request timeout after 5000ms",
      );
    });

    it("should include abort signal in fetch call", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({}), { status: 200 }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        timeout: 5000,
      });

      await fetcher.execute();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          signal: expect.any(AbortSignal),
        }),
      );
    });

    it("should clear timeout on successful response", async () => {
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({}), { status: 200 }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        timeout: 5000,
      });

      await fetcher.execute();

      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it("should clear timeout on error", async () => {
      const clearTimeoutSpy = vi.spyOn(global, "clearTimeout");

      mockFetch.mockRejectedValueOnce(new Error("Network error"));

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        timeout: 5000,
      });

      await expect(fetcher.execute()).rejects.toThrow("Network error");
      expect(clearTimeoutSpy).toHaveBeenCalled();
    });

    it("should support all HTTP methods", async () => {
      const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

      for (const method of methods) {
        mockFetch.mockResolvedValueOnce(
          new Response(JSON.stringify({}), { status: 200 }),
        );

        const fetcher = new Fetcher({
          baseUrl: "https://api.example.com",
          method,
        });

        await fetcher.execute();

        expect(mockFetch).toHaveBeenCalledWith(
          expect.any(String),
          expect.objectContaining({ method }),
        );
      }
    });

    it("should handle network errors", async () => {
      mockFetch.mockRejectedValueOnce(new Error("Network failure"));

      const fetcher = new Fetcher({ baseUrl: "https://api.example.com" });

      await expect(fetcher.execute()).rejects.toThrow("Network failure");
    });

    it("should construct URL correctly without path", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({}), { status: 200 }),
      );

      const fetcher = new Fetcher({ baseUrl: "https://api.example.com" });

      await fetcher.execute();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.example.com/",
        expect.any(Object),
      );
    });

    it("should handle empty path string", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({}), { status: 200 }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        path: "",
      });

      await fetcher.execute();

      expect(mockFetch).toHaveBeenCalledWith(
        "https://api.example.com/",
        expect.any(Object),
      );
    });
  });
});
