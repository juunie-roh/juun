import { describe, expect, it } from "vitest";

import Fetcher from "./base";
import FetcherBuilder from "./builder";

describe("FetcherBuilder", () => {
  describe("setBaseUrl", () => {
    it("should set base URL", () => {
      const builder = new FetcherBuilder().baseUrl("https://api.example.com");

      expect(builder.config.baseUrl).toBe("https://api.example.com");
    });

    it("should return this for chaining", () => {
      const builder = new FetcherBuilder();
      const result = builder.baseUrl("https://api.example.com");

      expect(result).toBe(builder);
    });
  });

  describe("setPath", () => {
    it("should set path", () => {
      const builder = new FetcherBuilder().path("/users");

      expect(builder.config.path).toBe("/users");
    });

    it("should return this for chaining", () => {
      const builder = new FetcherBuilder();
      const result = builder.path("/users");

      expect(result).toBe(builder);
    });
  });

  describe("setMethod", () => {
    it("should set HTTP method", () => {
      const builder = new FetcherBuilder().method("POST");

      expect(builder.config.method).toBe("POST");
    });

    it("should support all HTTP methods", () => {
      const methods = ["GET", "POST", "PUT", "PATCH", "DELETE"] as const;

      methods.forEach((method) => {
        const builder = new FetcherBuilder().method(method);
        expect(builder.config.method).toBe(method);
      });
    });

    it("should return this for chaining", () => {
      const builder = new FetcherBuilder();
      const result = builder.method("POST");

      expect(result).toBe(builder);
    });
  });

  describe("setTimeout", () => {
    it("should set timeout", () => {
      const builder = new FetcherBuilder().timeout(5000);

      expect(builder.config.timeout).toBe(5000);
    });

    it("should have default timeout of 30000ms", () => {
      const builder = new FetcherBuilder();

      expect(builder.config.timeout).toBe(30000);
    });

    it("should return this for chaining", () => {
      const builder = new FetcherBuilder();
      const result = builder.timeout(5000);

      expect(result).toBe(builder);
    });
  });

  describe("setHeaders", () => {
    it("should set headers", () => {
      const headers = { "Content-Type": "application/json" };
      const builder = new FetcherBuilder().header(headers);

      expect(builder.config.headers).toEqual(headers);
    });

    it("should merge with existing headers", () => {
      const builder = new FetcherBuilder()
        .header({ "Content-Type": "application/json" })
        .header({ Authorization: "Bearer token" });

      expect(builder.config.headers).toEqual({
        "Content-Type": "application/json",
        Authorization: "Bearer token",
      });
    });

    it("should return this for chaining", () => {
      const builder = new FetcherBuilder();
      const result = builder.header({ "Content-Type": "application/json" });

      expect(result).toBe(builder);
    });
  });

  describe("setHeader", () => {
    it("should set single header", () => {
      const builder = new FetcherBuilder().header(
        "Content-Type",
        "application/json",
      );

      expect(builder.config.headers).toEqual({
        "Content-Type": "application/json",
      });
    });

    it("should merge with existing headers", () => {
      const builder = new FetcherBuilder()
        .header("Content-Type", "application/json")
        .header("Authorization", "Bearer token");

      expect(builder.config.headers).toEqual({
        "Content-Type": "application/json",
        Authorization: "Bearer token",
      });
    });

    it("should return this for chaining", () => {
      const builder = new FetcherBuilder();
      const result = builder.header("Content-Type", "application/json");

      expect(result).toBe(builder);
    });
  });

  describe("setQueryParams", () => {
    it("should set query parameters", () => {
      const params = { page: 1, limit: 10 };
      const builder = new FetcherBuilder().queryParams(params);

      expect(builder.config.queryParams).toEqual(params);
    });

    it("should merge with existing query parameters", () => {
      const builder = new FetcherBuilder()
        .queryParams({ page: 1 })
        .queryParams({ limit: 10 });

      expect(builder.config.queryParams).toEqual({ page: 1, limit: 10 });
    });

    it("should support string, number, and boolean values", () => {
      const params = { search: "test", page: 1, active: true };
      const builder = new FetcherBuilder().queryParams(params);

      expect(builder.config.queryParams).toEqual(params);
    });

    it("should return this for chaining", () => {
      const builder = new FetcherBuilder();
      const result = builder.queryParams({ page: 1 });

      expect(result).toBe(builder);
    });
  });

  describe("setBody", () => {
    it("should set request body", () => {
      const body = { name: "John Doe" };
      const builder = new FetcherBuilder().body(body);

      expect(builder.config.body).toEqual(body);
    });

    it("should support various body types", () => {
      const bodies = [
        { name: "John" },
        ["item1", "item2"],
        "string body",
        123,
        true,
      ];

      bodies.forEach((body) => {
        const builder = new FetcherBuilder().body(body);
        expect(builder.config.body).toEqual(body);
      });
    });

    it("should return this for chaining", () => {
      const builder = new FetcherBuilder();
      const result = builder.body({ name: "John" });

      expect(result).toBe(builder);
    });
  });

  describe("build", () => {
    it("should build and return a Fetcher instance", () => {
      const builder = new FetcherBuilder().baseUrl("https://api.example.com");
      const fetcher = builder.build();

      expect(fetcher).toBeInstanceOf(Fetcher);
    });

    it("should pass configuration to Fetcher", () => {
      const builder = new FetcherBuilder()
        .baseUrl("https://api.example.com")
        .path("/users")
        .method("POST");

      const fetcher = builder.build();
      const config = fetcher.config;

      expect(config.baseUrl).toBe("https://api.example.com");
      expect(config.path).toBe("/users");
      expect(config.method).toBe("POST");
    });
  });

  describe("getConfig", () => {
    it("should return readonly copy of configuration", () => {
      const builder = new FetcherBuilder()
        .baseUrl("https://api.example.com")
        .path("/users");

      const config = builder.config;

      expect(config.baseUrl).toBe("https://api.example.com");
      expect(config.path).toBe("/users");
    });

    it("should have default values", () => {
      const builder = new FetcherBuilder();
      const config = builder.config;

      expect(config.method).toBe("GET");
      expect(config.headers).toEqual({});
      expect(config.timeout).toBe(30000);
    });
  });

  describe("method chaining", () => {
    it("should support full method chaining", () => {
      const fetcher = new FetcherBuilder()
        .baseUrl("https://api.example.com")
        .path("/users")
        .method("POST")
        .timeout(5000)
        .header("Authorization", "Bearer token")
        .queryParams({ page: 1 })
        .body({ name: "John" })
        .build();

      expect(fetcher).toBeInstanceOf(Fetcher);

      const config = fetcher.config;
      expect(config.baseUrl).toBe("https://api.example.com");
      expect(config.path).toBe("/users");
      expect(config.method).toBe("POST");
      expect(config.timeout).toBe(5000);
      expect(config.headers).toEqual({ Authorization: "Bearer token" });
      expect(config.queryParams).toEqual({ page: 1 });
      expect(config.body).toEqual({ name: "John" });
    });
  });
});
