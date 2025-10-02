/**
 * Custom error class for API errors
 */
export default class FetcherError extends Error {
  constructor(
    message: string,
    public readonly status: number,
    public readonly response?: Response,
  ) {
    super(message);
    this.name = "API Fetch Error";
  }
}
