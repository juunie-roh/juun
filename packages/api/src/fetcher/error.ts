/**
 * Custom error class for HTTP request failures
 *
 * Extends the native Error class with additional context about HTTP failures,
 * including status codes and the original Response object for detailed error handling.
 *
 * @example
 * ```typescript
 * try {
 *   const data = await api.execute();
 * } catch (error) {
 *   if (error instanceof FetcherError) {
 *     console.log('HTTP Error:', error.status);
 *     console.log('Message:', error.message);
 *
 *     // Handle specific error codes
 *     if (error.status === 404) {
 *       console.log('Resource not found');
 *     } else if (error.status >= 500) {
 *       console.log('Server error');
 *     }
 *
 *     // Access original response
 *     if (error.response) {
 *       const body = await error.response.text();
 *       console.log('Response body:', body);
 *     }
 *   }
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Creating a custom FetcherError
 * throw new FetcherError(
 *   'Not Found',
 *   404,
 *   response
 * );
 * ```
 */
export default class FetcherError extends Error {
  /**
   * Creates a new FetcherError instance
   *
   * @param message - Human-readable error description (e.g., "HTTP 404: Not Found")
   * @param status - HTTP status code (e.g., 404, 500, 503)
   * @param response - Optional original Response object for accessing headers, body, etc.
   *
   * @example
   * ```typescript
   * const error = new FetcherError(
   *   'HTTP 503: Service Unavailable',
   *   503,
   *   response
   * );
   * ```
   */
  constructor(
    message: string,
    public readonly status: number,
    public readonly response?: Response,
  ) {
    super(message);
    this.name = "API Fetch Error";
  }
}
