import { z } from "zod";

import type { FetcherConfig, HttpMethod, RetryConfig } from "./base";
import Fetcher from "./base";

/**
 * Fluent builder for constructing type-safe HTTP API clients
 *
 * FetcherBuilder provides a chainable API for configuring HTTP requests with support for:
 * - Factory methods for common configurations (JSON APIs, authenticated APIs)
 * - Request configuration (URL, method, headers, body, query params)
 * - Response transformation and validation (transformers, Zod schemas)
 * - Retry logic with exponential backoff
 * - Timeout handling
 *
 * The builder pattern ensures immutability and type safety while providing an intuitive,
 * readable API for constructing fetchers.
 *
 * @example
 * ```typescript
 * // Basic GET request
 * const fetcher = new FetcherBuilder()
 *   .setBaseUrl('https://api.example.com')
 *   .setPath('/users')
 *   .build();
 *
 * const users = await fetcher.execute<User[]>();
 * ```
 *
 * @example
 * ```typescript
 * // POST request with body and headers
 * const fetcher = new FetcherBuilder()
 *   .setBaseUrl('https://api.example.com')
 *   .setPath('/users')
 *   .setMethod('POST')
 *   .setBody({ name: 'John Doe', email: 'john@example.com' })
 *   .setHeader('Authorization', 'Bearer token123')
 *   .build();
 *
 * const newUser = await fetcher.execute<User>();
 * ```
 *
 * @example
 * ```typescript
 * // Using factory methods
 * const fetcher = FetcherBuilder.json('https://api.example.com')
 *   .setPath('/users')
 *   .setQueryParams({ page: 1, limit: 10 })
 *   .build();
 * ```
 *
 * @example
 * ```typescript
 * // With retry and Zod validation
 * import { z } from 'zod';
 *
 * const userSchema = z.object({
 *   id: z.number(),
 *   name: z.string(),
 *   email: z.string().email(),
 * });
 *
 * const fetcher = FetcherBuilder.json('https://api.example.com')
 *   .setPath('/users/1')
 *   .setRetry({ maxRetries: 3, exponential: true })
 *   .setSchema(userSchema)
 *   .build();
 *
 * const user = await fetcher.execute(); // Fully validated and typed
 * ```
 *
 * @example
 * ```typescript
 * // Authenticated API with custom transformers
 * const fetcher = FetcherBuilder.withAuth('https://api.example.com', 'token123')
 *   .setPath('/data')
 *   .addTransformer((data: any) => data.results) // Extract nested data
 *   .addTransformer((items: any[]) => items.slice(0, 10)) // Take first 10
 *   .build();
 * ```
 */
export default class FetcherBuilder {
  private _config: FetcherConfig = {
    method: "GET",
    headers: {},
    timeout: 30000, // 30 seconds default
  };

  /** Get the current configuration (useful for debugging) */
  get config(): Readonly<FetcherConfig> {
    return { ...this._config };
  }

  /**
   * Factory method: Create a builder pre-configured for authenticated JSON APIs
   *
   * Sets up a builder with:
   * - Bearer token authentication
   * - JSON content-type header
   * - Specified base URL
   *
   * @param baseUrl - The base URL for the API (e.g., 'https://api.example.com')
   * @param token - The authentication token (will be sent as 'Bearer {token}')
   * @returns Configured FetcherBuilder instance ready for further customization
   *
   * @example
   * ```typescript
   * const fetcher = FetcherBuilder.withAuth('https://api.example.com', 'abc123')
   *   .setPath('/protected/users')
   *   .build();
   *
   * const users = await fetcher.execute<User[]>();
   * ```
   *
   * @example
   * ```typescript
   * // With additional configuration
   * const fetcher = FetcherBuilder.withAuth('https://api.example.com', process.env.API_TOKEN)
   *   .setPath('/me')
   *   .setRetry({ maxRetries: 3 })
   *   .setTimeout(10000)
   *   .build();
   * ```
   */
  static withAuth(baseUrl: string, token: string): FetcherBuilder {
    return new FetcherBuilder()
      .baseUrl(baseUrl)
      .header("Authorization", `Bearer ${token}`)
      .header({ "Content-Type": "application/json" });
  }

  /**
   * Factory method: Create a builder pre-configured for JSON APIs
   *
   * Sets up a builder with:
   * - JSON content-type header
   * - 30-second timeout
   * - Specified base URL
   *
   * @param baseUrl - The base URL for the API (e.g., 'https://api.example.com')
   * @returns Configured FetcherBuilder instance ready for further customization
   *
   * @example
   * ```typescript
   * const fetcher = FetcherBuilder.json('https://api.example.com')
   *   .setPath('/users')
   *   .build();
   * ```
   *
   * @example
   * ```typescript
   * // POST request with JSON body
   * const fetcher = FetcherBuilder.json('https://api.example.com')
   *   .setPath('/users')
   *   .setMethod('POST')
   *   .setBody({ name: 'Jane Doe' })
   *   .build();
   * ```
   */
  static json(baseUrl: string): FetcherBuilder {
    return new FetcherBuilder()
      .baseUrl(baseUrl)
      .header({ "Content-Type": "application/json" })
      .timeout(30000);
  }

  /**
   * Factory method: Create a builder from an existing configuration
   *
   * Useful for creating variations of existing fetchers or
   * restoring fetchers from serialized configurations.
   *
   * @param config - Fetcher configuration object
   * @returns FetcherBuilder initialized with the provided configuration
   *
   * @example
   * ```typescript
   * const originalFetcher = FetcherBuilder.json('https://api.example.com')
   *   .setTimeout(5000)
   *   .build();
   *
   * // Clone and modify
   * const config = originalFetcher.getConfig();
   * const newFetcher = FetcherBuilder.from(config)
   *   .setPath('/different-endpoint')
   *   .build();
   * ```
   *
   * @example
   * ```typescript
   * // Restore from saved config
   * const savedConfig = JSON.parse(localStorage.getItem('apiConfig'));
   * const fetcher = FetcherBuilder.from(savedConfig)
   *   .setHeader('Authorization', currentToken)
   *   .build();
   * ```
   */
  static from(config: FetcherConfig): FetcherBuilder {
    const builder = new FetcherBuilder();
    builder._config = {
      ...config,
      headers: config.headers ? { ...config.headers } : undefined,
      queryParams: config.queryParams ? { ...config.queryParams } : undefined,
      transformers: config.transformers ? [...config.transformers] : undefined,
      retry: config.retry ? { ...config.retry } : undefined,
    };
    return builder;
  }

  /**
   * Set the base URL for the API
   */
  baseUrl(baseUrl: string): this {
    this._config.baseUrl = baseUrl;
    return this;
  }

  /**
   * Set the path for the API endpoint
   */
  path(path: string): this {
    this._config.path = path;
    return this;
  }

  /**
   * Set the HTTP method
   */
  method(method: HttpMethod): this {
    this._config.method = method;
    return this;
  }

  /**
   * Set request timeout in milliseconds
   */
  timeout(timeout: number): this {
    this._config.timeout = timeout;
    return this;
  }

  /**
   * Set multiple request headers at once
   */
  header(headers: Record<string, string>): this;
  /**
   * Set a single request header
   */
  header(key: string, value: string): this;
  /**
   * Implementation for header overloads
   */
  header(keyOrHeaders: string | Record<string, string>, value?: string): this {
    if (typeof keyOrHeaders === "string") {
      // Single header: header(key, value)
      this._config.headers = {
        ...this._config.headers,
        [keyOrHeaders]: value!,
      };
    } else {
      // Multiple headers: header(headers)
      this._config.headers = { ...this._config.headers, ...keyOrHeaders };
    }
    return this;
  }

  /**
   * Set query parameters
   */
  queryParams(params: Record<string, string | number | boolean>): this {
    this._config.queryParams = { ...this._config.queryParams, ...params };
    return this;
  }

  /**
   * Set request body
   */
  body(body: unknown): this {
    this._config.body = body;
    return this;
  }

  /**
   * Add a response transformer to the transformation pipeline
   */
  transformer(
    transformer: (data: unknown, response: Response) => unknown,
  ): this {
    this._config.transformers = [
      ...(this._config.transformers || []),
      transformer,
    ];
    return this;
  }

  /**
   * Set Zod schema for response validation and transformation
   */
  schema<T>(schema: z.Schema<T>): this {
    return this.transformer((data) => schema.parse(data));
  }

  /**
   * Set retry configuration
   */
  retry(retry: RetryConfig): this {
    this._config.retry = retry;
    return this;
  }

  /**
   * Build and return an API instance
   */
  build(): Fetcher {
    return new Fetcher(this._config);
  }
}
