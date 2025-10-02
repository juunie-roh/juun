import type { FetcherConfig, HttpMethod } from "./base";
import Fetcher from "./base";

/**
 * Builder class for constructing API instances
 */
export default class FetcherBuilder {
  private config: FetcherConfig = {
    method: "GET",
    headers: {},
    timeout: 30000, // 30 seconds default
  };

  /**
   * Set the base URL for the API
   */
  setBaseUrl(baseUrl: string): this {
    this.config.baseUrl = baseUrl;
    return this;
  }

  /**
   * Set the path for the API endpoint
   */
  setPath(path: string): this {
    this.config.path = path;
    return this;
  }

  /**
   * Set the HTTP method
   */
  setMethod(method: HttpMethod): this {
    this.config.method = method;
    return this;
  }

  /**
   * Set request timeout in milliseconds
   */
  setTimeout(timeout: number): this {
    this.config.timeout = timeout;
    return this;
  }

  /**
   * Set request headers
   */
  setHeaders(headers: Record<string, string>): this {
    this.config.headers = { ...this.config.headers, ...headers };
    return this;
  }

  /**
   * Set a single header
   */
  setHeader(key: string, value: string): this {
    this.config.headers = { ...this.config.headers, [key]: value };
    return this;
  }

  /**
   * Set query parameters
   */
  setQueryParams(params: Record<string, string | number | boolean>): this {
    this.config.queryParams = { ...this.config.queryParams, ...params };
    return this;
  }

  /**
   * Set request body
   */
  setBody(body: unknown): this {
    this.config.body = body;
    return this;
  }

  /**
   * Build and return an API instance
   */
  build(): Fetcher {
    return new Fetcher(this.config);
  }

  /**
   * Get the current configuration (useful for debugging)
   */
  getConfig(): Readonly<FetcherConfig> {
    return { ...this.config };
  }
}
