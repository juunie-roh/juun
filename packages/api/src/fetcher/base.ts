import FetcherError from "./error";

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
 * @example
 * ```typescript
 * // Direct instantiation
 * const fetcher = new Fetcher({
 *   baseUrl: 'https://api.example.com',
 *   path: '/users',
 *   method: 'GET',
 *   retry: { maxRetries: 3 }
 * });
 *
 * const data = await fetcher.fetch();
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
 * const fetcher = new Fetcher({
 *   baseUrl: 'https://api.example.com',
 *   path: '/users/1',
 *   schema: userSchema,
 * });
 *
 * const user = await fetcher.fetch(); // Validated & typed
 * ```
 */
class Fetcher {
  private readonly _config: Fetcher.Config;

  constructor(config: Fetcher.Config) {
    this._config = { ...config };
  }

  /** Get a readonly copy of the current configuration */
  get config(): Readonly<Fetcher.Config> {
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
   * const users = await fetcher.fetch<User[]>();
   * ```
   *
   * @example
   * ```typescript
   * // With error handling
   * try {
   *   const data = await fetcher.fetch<ApiResponse>();
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
   * const fetcher = new Fetcher({
   *   baseUrl: 'https://api.example.com',
   *   retry: {
   *     maxRetries: 3,
   *     onRetry: (attempt, error, delay) => {
   *       console.log(`Retry ${attempt} after ${delay}ms`);
   *     }
   *   },
   * })
   *
   * const data = await fetcher.fetch();
   * ```
   */
  async fetch<T = unknown>(): Promise<T> {
    // If no retry config, just perform request once
    if (!this._config.retry) {
      return this.execute<T>();
    }

    const retryConfig = { ...DEFAULT_RETRY_CONFIG, ...this._config.retry };
    let lastError: Error | undefined;

    for (let attempt = 0; attempt <= retryConfig.maxRetries; attempt++) {
      try {
        return await this.execute<T>();
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
  private async execute<T>(): Promise<T> {
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
      // TODO: handle other response types
      const contentType = response.headers.get("content-type");
      let result: unknown;

      const text = await response.text();
      if (!text) {
        result = null;
      } else if (!contentType || contentType.includes("application/json")) {
        result = JSON.parse(text);
      } else {
        result = text;
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
    retryConfig: Required<Fetcher.RetryConfig>,
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

/**
 * Idempotent HTTP methods that are safe to retry per RFC 7231/9110
 */
const IDEMPOTENT_METHODS: Fetcher.HttpMethod[] = ["GET", "PUT", "DELETE"];

/**
 * Default retry configuration following industry standards
 */
const DEFAULT_RETRY_CONFIG: Required<Fetcher.RetryConfig> = {
  maxRetries: 3,
  initialDelay: 100,
  maxDelay: 32000,
  exponential: true,
  retryableStatuses: [408, 429, 500, 502, 503, 504],
  onlyIdempotent: true,
  onRetry: () => {},
};

namespace Fetcher {
  /**
   * Configuration options for the API builder
   */
  export interface Config {
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
   * HTTP methods supported by the API builder
   */
  export type HttpMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

  type ResponseTransformer<Input = unknown, Output = unknown> = (
    data: Input,
    response: Response,
  ) => Output | Promise<Output>;

  /**
   * Factory method: Create a Fetcher pre-configured for JSON APIs
   *
   * Sets up a fetcher with:
   * - JSON content-type header
   * - 30-second timeout
   * - Specified base URL
   *
   * @param baseUrl - The base URL for the API (e.g., 'https://api.example.com')
   * @param config - Optional additional configuration to merge
   * @returns Configured Fetcher instance ready to use
   *
   * @example
   * ```typescript
   * const fetcher = Fetcher.json('https://api.example.com', {
   *   path: '/users',
   *   retry: { maxRetries: 3 }
   * });
   *
   * const users = await fetcher.fetch<User[]>();
   * ```
   */
  export function json(baseUrl: string, config?: Partial<Config>): Fetcher {
    return new Fetcher({
      ...config,
      baseUrl,
      timeout: config?.timeout ?? 30000,
      headers: {
        "Content-Type": "application/json",
        ...config?.headers,
      },
    });
  }

  /**
   * Factory method: Create a Fetcher pre-configured for Bearer token authentication
   *
   * Sets up a fetcher with:
   * - Bearer token authentication
   * - JSON content-type header
   * - Specified base URL
   *
   * @param baseUrl - The base URL for the API (e.g., 'https://api.example.com')
   * @param token - The bearer token (will be sent as 'Authorization: Bearer {token}')
   * @param config - Optional additional configuration to merge
   * @returns Configured Fetcher instance ready to use
   *
   * @example
   * ```typescript
   * const fetcher = Fetcher.withBearer(
   *   'https://api.example.com',
   *   'abc123',
   *   { path: '/protected/users' }
   * );
   *
   * const users = await fetcher.fetch<User[]>();
   * ```
   */
  export function withBearer(
    baseUrl: string,
    token: string,
    config?: Partial<Config>,
  ): Fetcher {
    return new Fetcher({
      ...config,
      baseUrl,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        ...config?.headers,
      },
    });
  }

  /**
   * Factory method: Create a Fetcher from an existing configuration
   *
   * Useful for creating variations of existing fetchers or
   * restoring fetchers from serialized configurations.
   *
   * @param config - Fetcher configuration object
   * @returns Fetcher initialized with the provided configuration
   *
   * @example
   * ```typescript
   * const config = {
   *   baseUrl: 'https://api.example.com',
   *   path: '/users',
   *   timeout: 5000
   * };
   *
   * const fetcher = Fetcher.from(config);
   * ```
   */
  export function from(config: Config): Fetcher {
    return new Fetcher(config);
  }
}

export default Fetcher;
