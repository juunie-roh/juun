import FetcherError from "./error";

/**
 * HTTP methods supported by the API builder
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Configuration options for the API builder
 */
export interface FetcherConfig {
  baseUrl?: string;
  path?: string;
  method?: HttpMethod;
  headers?: Record<string, string>;
  timeout?: number;
  queryParams?: Record<string, string | number | boolean>;
  body?: unknown;
}

/**
 * API class for executing HTTP requests
 */
export default class Fetcher {
  private readonly config: FetcherConfig;

  constructor(config: FetcherConfig) {
    this.config = { ...config };
  }

  /**
   * Execute the API request
   */
  async execute<T = unknown>(): Promise<T> {
    const { baseUrl, path, method, headers, timeout, queryParams, body } =
      this.config;

    if (!baseUrl) {
      throw new Error("Base URL is required");
    }

    // Construct full URL with query parameters
    const url = new URL(path || "", baseUrl);
    if (queryParams) {
      Object.entries(queryParams).forEach(([key, value]) => {
        url.searchParams.append(key, String(value));
      });
    }

    // Prepare request options
    const requestInit: RequestInit = {
      method,
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
    };

    // Add body for non-GET requests
    if (body && method !== "GET") {
      requestInit.body = JSON.stringify(body);
    }

    // Create abort controller for timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);

    try {
      const response = await fetch(url.toString(), {
        ...requestInit,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new FetcherError(
          `HTTP ${response.status}: ${response.statusText}`,
          response.status,
          response,
        );
      }

      // Handle empty responses
      const contentType = response.headers.get("content-type");
      if (!contentType || contentType.includes("application/json")) {
        return (await response.json()) as T;
      }

      return (await response.text()) as T;
    } catch (error) {
      clearTimeout(timeoutId);

      if (error instanceof Error && error.name === "AbortError") {
        throw new FetcherError(
          `Request timeout after ${timeout}ms`,
          408,
          undefined,
        );
      }

      throw error;
    }
  }

  /**
   * Get the API configuration
   */
  getConfig(): Readonly<FetcherConfig> {
    return { ...this.config };
  }
}
