import { describe, expect, it } from "vitest";

import FetcherError from "./error";

describe("FetcherError", () => {
  it("should create error with message and status", () => {
    const error = new FetcherError("Not Found", 404);

    expect(error).toBeInstanceOf(Error);
    expect(error).toBeInstanceOf(FetcherError);
    expect(error.message).toBe("Not Found");
    expect(error.status).toBe(404);
    expect(error.name).toBe("API Fetch Error");
  });

  it("should create error with response object", () => {
    const mockResponse = new Response(null, { status: 500 });
    const error = new FetcherError("Server Error", 500, mockResponse);

    expect(error.message).toBe("Server Error");
    expect(error.status).toBe(500);
    expect(error.response).toBe(mockResponse);
  });

  it("should create error without response object", () => {
    const error = new FetcherError("Timeout", 408);

    expect(error.message).toBe("Timeout");
    expect(error.status).toBe(408);
    expect(error.response).toBeUndefined();
  });

  it("should have correct error name", () => {
    const error = new FetcherError("Test Error", 400);

    expect(error.name).toBe("API Fetch Error");
  });

  it("should be catchable as Error", () => {
    try {
      throw new FetcherError("Bad Request", 400);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
      expect(error).toBeInstanceOf(FetcherError);
      if (error instanceof FetcherError) {
        expect(error.status).toBe(400);
      }
    }
  });
});
