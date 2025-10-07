import FetcherError from "./error";

type ResponseTransformer<TInput = unknown, TOutput = unknown> = (
  data: TInput,
  response: Response,
) => TOutput | Promise<TOutput>;

/**
 * HTTP methods supported by the API builder
 */
export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

/**
 * Idempotent HTTP methods that are safe to retry per RFC 7231/9110
 */
const IDEMPOTENT_METHODS: HttpMethod[] = ["GET", "PUT", "DELETE"];

/**
 * Configuration for retry behavior following industry standards (AWS/GCP/axios-retry)
 */
export interface RetryConfig {
  /** Maximum retry attempts (default: 3) */
  maxRetries?: number;
  /** Initial delay between retries in milliseconds (default: 100) */
  initialDelay?: number;
  /** Maximum delay cap for exponential backoff in milliseconds (default: 32000) */
  maxDelay?: number;
  /** Use exponential backoff (default: true) */
  exponential?: boolean;
  /** HTTP status codes that trigger a retry (default: [408, 429, 500, 502, 503, 504]) */
  retryableStatuses?: number[];
  /** Only retry idempotent methods per RFC 7231 (default: true) */
  onlyIdempotent?: boolean;
  /** Callback fired on each retry attempt */
  onRetry?: (attempt: number, error: Error, delayMs: number) => void;
}

/**
 * Default retry configuration following industry standards
 */
const DEFAULT_RETRY_CONFIG: Required<RetryConfig> = {
  maxRetries: 3,
  initialDelay: 100,
  maxDelay: 32000,
  exponential: true,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
  onlyIdempotent: true,
  onRetry: () => {},
};

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
  transformers?: ResponseTransformer[];
  retry?: RetryConfig;
}

/**
 * HTTP client for executing configured API requests
 *
 * The Fetcher class handles the actual execution of HTTP requests with support for:
 * - Automatic retry with exponential backoff
 * - Request/response transformation pipeline
 * - Timeout handling with AbortController
 * - JSON and text response parsing
 * - Comprehensive error handling
 *
 * **Note:** Fetcher instances are typically created via {@link FetcherBuilder} rather than
 * directly instantiated.
 *
 * @example
 * ```typescript
 * // Create via builder (recommended)
 * const fetcher = new FetcherBuilder()
 *   .setBaseUrl('https://api.example.com')
 *   .setPath('/users')
 *   .setRetry({ maxRetries: 3 })
 *   .build();
 *
 * // Execute request
 * const users = await fetcher.execute<User[]>();
 * ```
 *
 * @example
 * ```typescript
 * // Direct instantiation (advanced usage)
 * const fetcher = new Fetcher({
 *   baseUrl: 'https://api.example.com',
 *   path: '/users',
 *   method: 'GET',
 *   retry: { maxRetries: 3 }
 * });
 *
 * const data = await fetcher.execute();
 * ```
 *
 * @example
 * ```typescript
 * // With transformers and schema validation
 * import { z } from 'zod';
 *
 * const userSchema = z.object({
 *   id: z.number(),
 *   name: z.string(),
 * });
 *
 * const fetcher = new FetcherBuilder()
 *   .setBaseUrl('https://api.example.com')
 *   .setPath('/users/1')
 *   .setSchema(userSchema)
 *   .build();
 *
 * const user = await fetcher.execute(); // Validated & typed
 * ```
 */
export default class Fetcher {
  private readonly _config: FetcherConfig;

  constructor(config: FetcherConfig) {
    this._config = { ...config };
  }

  /** Get a readonly copy of the current configuration */
  get config(): Readonly<FetcherConfig> {
    return { ...this._config };
  }

  /**
   * Execute the configured HTTP request with automatic retry and transformation
   *
   * This method performs the HTTP request using the fetch API, with support for:
   * - Automatic retry on transient failures (if configured)
   * - Response transformation pipeline
   * - JSON/text parsing based on Content-Type
   * - Timeout enforcement
   * - Error wrapping with {@link FetcherError}
   *
   * @template T - The expected response type after transformation
   * @returns Promise resolving to the transformed response data
   * @throws {Error} If baseUrl is not configured
   * @throws {FetcherError} On HTTP errors (4xx, 5xx status codes)
   * @throws {FetcherError} On request timeout (408 status code)
   * @throws {Error} On network failures or other errors
   *
   * @example
   * ```typescript
   * // Basic GET request
   * const users = await fetcher.execute<User[]>();
   * ```
   *
   * @example
   * ```typescript
   * // With error handling
   * try {
   *   const data = await fetcher.execute<ApiResponse>();
   * } catch (error) {
   *   if (error instanceof FetcherError) {
   *     console.error('HTTP Error:', error.status);
   *   } else {
   *     console.error('Network Error:', error);
   *   }
   * }
   * ```
   *
   * @example
   * ```typescript
   * // With retry monitoring
   * const fetcher = new FetcherBuilder()
   *   .setBaseUrl('https://api.example.com')
   *   .setRetry({
   *     maxRetries: 3,
   *     onRetry: (attempt, error, delay) => {
   *       console.log(`Retry ${attempt} after ${delay}ms`);
   *     }
   *   })
   *   .build();
   *
   * const data = await fetcher.execute();
   * ```
   */
  async execute<T = unknown>(): Promise<T> {
    // If no retry config, just perform request once
    if (!this._config.retry) {
      return this.fetch<T>();
    }

    const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...this._config.retry };
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        return await this.fetch<T>();
      } catch (error) {
        lastError = error as Error;

        // Don't retry on last attempt
        if (attempt === retryConfig.maxRetries) {
          break;
        }

        // Check if error is retryable
        if (!this.shouldRetry(error as Error, retryConfig)) {
          throw error;
        }

        // Calculate delay with exponential backoff and jitter
        const delay = this.calculateRetryDelay(
          attempt,
          retryConfig.initialDelay,
          retryConfig.maxDelay,
          retryConfig.exponential,
        );

        // Fire callback
        retryConfig.onRetry(attempt + 1, error as Error, delay);

        // Wait before retrying
        await this.sleep(delay);
      }
    }

    throw lastError;
  }

  /**
   * Perform the actual HTTP request
   */
  private async fetch<T>(): Promise<T> {
    const { baseUrl, path, method, headers, timeout, queryParams, body } =
      this._config;

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
      let result: unknown;

      if (!contentType || contentType.includes("application/json")) {
        result = await response.json();
      } else {
        result = await response.text();
      }

      // Apply transformers in order
      if (this._config.transformers) {
        for (const transformer of this._config.transformers) {
          result = await transformer(result, response);
        }
      }

      return result as T;
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
   * Determine if the error should trigger a retry
   */
  private shouldRetry(
    error: Error,
    retryConfig: Required<RetryConfig>,
  ): boolean {
    // Check if method is idempotent
    if (retryConfig.onlyIdempotent) {
      const method = this._config.method || "GET";
      if (!IDEMPOTENT_METHODS.includes(method)) {
        return false;
      }
    }

    // Check if error status is retryable
    if (error instanceof FetcherError) {
      return retryConfig.retryableStatuses.includes(error.status);
    }

    // Retry network errors
    return true;
  }

  /**
   * Calculate retry delay with exponential backoff and jitter
   */
  private calculateRetryDelay(
    attempt: number,
    initialDelay: number,
    maxDelay: number,
    exponential: boolean,
  ): number {
    const baseDelay = exponential
      ? Math.min(initialDelay * Math.pow(2, attempt), maxDelay)
      : initialDelay;

    // Add jitter (±30% randomness) to prevent thundering herd
    const jitter = baseDelay * 0.3 * (Math.random() * 2 - 1);

    return Math.max(0, baseDelay + jitter);
  }

  /**
   * Sleep for specified milliseconds
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
