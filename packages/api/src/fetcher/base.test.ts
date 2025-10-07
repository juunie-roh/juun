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

  describe("transformers", () => {
    it("should apply single transformer to response", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: { value: 42 } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        transformers: [(data: any) => data.data],
      });

      const result = await fetcher.execute<{ value: number }>();

      expect(result).toEqual({ value: 42 });
    });

    it("should apply multiple transformers in order", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ data: { items: [1, 2, 3, 4, 5] } }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        transformers: [
          (data: any) => data.data,
          (data: any) => data.items,
          (items: any) => items.slice(0, 3),
        ],
      });

      const result = await fetcher.execute<number[]>();

      expect(result).toEqual([1, 2, 3]);
    });

    it("should pass response object to transformers", async () => {
      const mockResponse = new Response(JSON.stringify({ value: 100 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });

      mockFetch.mockResolvedValueOnce(mockResponse);

      let capturedResponse: Response | undefined;

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        transformers: [
          (data: any, response: Response) => {
            capturedResponse = response;
            return data;
          },
        ],
      });

      await fetcher.execute();

      expect(capturedResponse).toBeDefined();
      expect(capturedResponse?.status).toBe(200);
    });

    it("should support async transformers", async () => {
      vi.useRealTimers();

      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ id: 1 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        transformers: [
          async (data: any) => {
            await new Promise((resolve) => setTimeout(resolve, 10));
            return { ...data, transformed: true };
          },
        ],
      });

      const result = await fetcher.execute<{
        id: number;
        transformed: boolean;
      }>();

      expect(result).toEqual({ id: 1, transformed: true });
    });

    it("should work without transformers", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ value: 42 }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
      });

      const result = await fetcher.execute<{ value: number }>();

      expect(result).toEqual({ value: 42 });
    });
  });

  describe("retry", () => {
    beforeEach(() => {
      vi.useRealTimers();
    });

    it("should retry on retryable status codes", async () => {
      // First two attempts fail with 503, third succeeds
      mockFetch
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
        );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        retry: { maxRetries: 3, initialDelay: 10 },
      });

      const result = await fetcher.execute<{ success: boolean }>();

      expect(result).toEqual({ success: true });
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it("should retry on network errors", async () => {
      mockFetch
        .mockRejectedValueOnce(new Error("Network error"))
        .mockRejectedValueOnce(new Error("Network error"))
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
        );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        retry: { maxRetries: 3, initialDelay: 10 },
      });

      const result = await fetcher.execute();

      expect(result).toEqual({ success: true });
      expect(mockFetch).toHaveBeenCalledTimes(3);
    });

    it("should not retry non-retryable status codes", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(null, { status: 400, statusText: "Bad Request" }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        retry: { maxRetries: 3 },
      });

      await expect(fetcher.execute()).rejects.toThrow("HTTP 400: Bad Request");
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });

    it("should respect maxRetries limit", async () => {
      mockFetch.mockResolvedValue(
        new Response(null, { status: 503, statusText: "Service Unavailable" }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        retry: { maxRetries: 2, initialDelay: 10 },
      });

      await expect(fetcher.execute()).rejects.toThrow(FetcherError);
      expect(mockFetch).toHaveBeenCalledTimes(3); // Initial + 2 retries
    });

    it("should call onRetry callback on each retry", async () => {
      const onRetry = vi.fn();

      mockFetch
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ success: true }), { status: 200 }),
        );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        retry: { maxRetries: 3, initialDelay: 10, onRetry },
      });

      await fetcher.execute();

      expect(onRetry).toHaveBeenCalledTimes(2);
      expect(onRetry).toHaveBeenNthCalledWith(
        1,
        1,
        expect.any(FetcherError),
        expect.any(Number),
      );
      expect(onRetry).toHaveBeenNthCalledWith(
        2,
        2,
        expect.any(FetcherError),
        expect.any(Number),
      );
    });

    it("should use exponential backoff when enabled", async () => {
      const onRetry = vi.fn();

      mockFetch
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ success: true }), { status: 200 }),
        );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        retry: {
          maxRetries: 3,
          initialDelay: 100,
          exponential: true,
          onRetry,
        },
      });

      await fetcher.execute();

      // First retry delay should be around 100ms (±30% jitter)
      const firstDelay = onRetry.mock.calls[0][2];
      expect(firstDelay).toBeGreaterThanOrEqual(70);
      expect(firstDelay).toBeLessThanOrEqual(130);

      // Second retry delay should be around 200ms (±30% jitter)
      const secondDelay = onRetry.mock.calls[1][2];
      expect(secondDelay).toBeGreaterThanOrEqual(140);
      expect(secondDelay).toBeLessThanOrEqual(260);
    });

    it("should use constant delay when exponential is false", async () => {
      const onRetry = vi.fn();

      mockFetch
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ success: true }), { status: 200 }),
        );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        retry: {
          maxRetries: 3,
          initialDelay: 100,
          exponential: false,
          onRetry,
        },
      });

      await fetcher.execute();

      // Both delays should be around 100ms (±30% jitter)
      const firstDelay = onRetry.mock.calls[0][2];
      const secondDelay = onRetry.mock.calls[1][2];

      expect(firstDelay).toBeGreaterThanOrEqual(70);
      expect(firstDelay).toBeLessThanOrEqual(130);
      expect(secondDelay).toBeGreaterThanOrEqual(70);
      expect(secondDelay).toBeLessThanOrEqual(130);
    });

    it("should respect maxDelay cap", async () => {
      const onRetry = vi.fn();

      mockFetch
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ success: true }), { status: 200 }),
        );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        retry: {
          maxRetries: 3,
          initialDelay: 10000,
          maxDelay: 1000,
          exponential: true,
          onRetry,
        },
      });

      await fetcher.execute();

      // All delays should be capped at maxDelay (±30% jitter)
      onRetry.mock.calls.forEach((call) => {
        const delay = call[2];
        expect(delay).toBeLessThanOrEqual(1300); // 1000 + 30% jitter
      });
    });

    it("should only retry idempotent methods by default", async () => {
      mockFetch.mockResolvedValue(
        new Response(null, { status: 503, statusText: "Service Unavailable" }),
      );

      // POST is not idempotent
      const postFetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        method: "POST",
        retry: { maxRetries: 3 },
      });

      await expect(postFetcher.execute()).rejects.toThrow(FetcherError);
      expect(mockFetch).toHaveBeenCalledTimes(1);

      mockFetch.mockClear();

      // GET is idempotent
      mockFetch
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ success: true }), { status: 200 }),
        );

      const getFetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        method: "GET",
        retry: { maxRetries: 3, initialDelay: 10 },
      });

      await getFetcher.execute();
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("should retry non-idempotent methods when onlyIdempotent is false", async () => {
      mockFetch
        .mockResolvedValueOnce(
          new Response(null, {
            status: 503,
            statusText: "Service Unavailable",
          }),
        )
        .mockResolvedValueOnce(
          new Response(JSON.stringify({ success: true }), {
            status: 200,
            headers: { "Content-Type": "application/json" },
          }),
        );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        method: "POST",
        retry: { maxRetries: 3, initialDelay: 10, onlyIdempotent: false },
      });

      const result = await fetcher.execute();

      expect(result).toEqual({ success: true });
      expect(mockFetch).toHaveBeenCalledTimes(2);
    });

    it("should support custom retryableStatuses", async () => {
      mockFetch.mockResolvedValue(
        new Response(null, { status: 418, statusText: "I'm a teapot" }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
        retry: { maxRetries: 3, initialDelay: 10, retryableStatuses: [418] },
      });

      await expect(fetcher.execute()).rejects.toThrow(FetcherError);
      // Should retry on 418
      expect(mockFetch).toHaveBeenCalledTimes(4); // Initial + 3 retries
    });

    it("should work without retry config", async () => {
      mockFetch.mockResolvedValueOnce(
        new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "Content-Type": "application/json" },
        }),
      );

      const fetcher = new Fetcher({
        baseUrl: "https://api.example.com",
      });

      const result = await fetcher.execute();

      expect(result).toEqual({ success: true });
      expect(mockFetch).toHaveBeenCalledTimes(1);
    });
  });
});
