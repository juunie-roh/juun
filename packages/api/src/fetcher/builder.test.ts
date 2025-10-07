import { describe, expect, it, vi } from "vitest";
import { z } from "zod";

import Fetcher, { FetcherConfig } from "./base";
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

  describe("factory methods", () => {
    describe("json", () => {
      it("should create builder with JSON configuration", () => {
        const builder = FetcherBuilder.json("https://api.example.com");

        expect(builder.config.baseUrl).toBe("https://api.example.com");
        expect(builder.config.headers).toEqual({
          "Content-Type": "application/json",
        });
        expect(builder.config.timeout).toBe(30000);
      });

      it("should support method chaining", () => {
        const fetcher = FetcherBuilder.json("https://api.example.com")
          .path("/users")
          .method("POST")
          .build();

        expect(fetcher).toBeInstanceOf(Fetcher);
        expect(fetcher.config.baseUrl).toBe("https://api.example.com");
        expect(fetcher.config.path).toBe("/users");
      });
    });

    describe("withAuth", () => {
      it("should create builder with authentication", () => {
        const builder = FetcherBuilder.withAuth(
          "https://api.example.com",
          "token123",
        );

        expect(builder.config.baseUrl).toBe("https://api.example.com");
        expect(builder.config.headers).toEqual({
          Authorization: "Bearer token123",
          "Content-Type": "application/json",
        });
      });

      it("should support method chaining", () => {
        const fetcher = FetcherBuilder.withAuth(
          "https://api.example.com",
          "abc123",
        )
          .path("/protected")
          .build();

        expect(fetcher).toBeInstanceOf(Fetcher);
        expect(fetcher.config.headers).toMatchObject({
          Authorization: "Bearer abc123",
        });
      });

      it("should format token as Bearer", () => {
        const builder = FetcherBuilder.withAuth(
          "https://api.example.com",
          "mytoken",
        );

        expect(builder.config.headers?.Authorization).toBe("Bearer mytoken");
      });
    });

    describe("from", () => {
      it("should create builder from existing config", () => {
        const config = {
          baseUrl: "https://api.example.com",
          path: "/users",
          method: "POST" as const,
          timeout: 5000,
        };

        const builder = FetcherBuilder.from(config);

        expect(builder.config).toEqual(config);
      });

      it("should create a deep copy of the config", () => {
        const transformer1 = (data: unknown) => data;
        const transformer2 = (data: unknown) => data;
        const onRetry = vi.fn();

        const config: FetcherConfig = {
          baseUrl: "https://api.example.com",
          path: "/users",
          method: "POST" as const,
          timeout: 5000,
          headers: { "X-Custom": "value", Authorization: "Bearer token" },
          queryParams: { page: 1, limit: 10 },
          body: { name: "John" },
          transformers: [transformer1, transformer2],
          retry: {
            maxRetries: 3,
            initialDelay: 100,
            exponential: true,
            onRetry,
          },
        };

        const builder = FetcherBuilder.from(config);
        const builderConfig = builder.config;

        // Modify original config
        config.baseUrl = "https://different.com";
        config.path = "/posts";
        config.method = "GET";
        config.timeout = 10000;
        config.headers = {
          ["X-Custom"]: "changed",
          ["New-Header"]: "added",
        };
        config.queryParams!.page = 2;
        config.body = { name: "Jane" };
        config.transformers!.push((data: unknown) => data);
        config.retry!.maxRetries = 5;
        config.retry!.initialDelay = 200;

        // Builder should have original values (deep copy)
        expect(builderConfig.baseUrl).toBe("https://api.example.com");
        expect(builderConfig.path).toBe("/users");
        expect(builderConfig.method).toBe("POST");
        expect(builderConfig.timeout).toBe(5000);
        expect(builderConfig.headers).toEqual({
          "X-Custom": "value",
          Authorization: "Bearer token",
        });
        expect(builderConfig.queryParams).toEqual({ page: 1, limit: 10 });
        expect(builderConfig.body).toEqual({ name: "John" });
        expect(builderConfig.transformers).toHaveLength(2);
        expect(builderConfig.transformers).toEqual([
          transformer1,
          transformer2,
        ]);
        expect(builderConfig.retry).toEqual({
          maxRetries: 3,
          initialDelay: 100,
          exponential: true,
          onRetry,
        });
      });

      it("should support method chaining", () => {
        const originalConfig = {
          baseUrl: "https://api.example.com",
          timeout: 5000,
        };

        const fetcher = FetcherBuilder.from(originalConfig)
          .path("/new-endpoint")
          .method("PUT")
          .build();

        expect(fetcher.config.baseUrl).toBe("https://api.example.com");
        expect(fetcher.config.timeout).toBe(5000);
        expect(fetcher.config.path).toBe("/new-endpoint");
        expect(fetcher.config.method).toBe("PUT");
      });
    });
  });

  describe("transformer", () => {
    it("should add transformer to config", () => {
      const transformer = (data: unknown) => data;
      const builder = new FetcherBuilder().transformer(transformer);

      expect(builder.config.transformers).toBeDefined();
      expect(builder.config.transformers).toHaveLength(1);
      expect(builder.config.transformers?.[0]).toBe(transformer);
    });

    it("should support multiple transformers", () => {
      const transformer1 = (data: any) => data.result;
      const transformer2 = (data: any) => data.items;

      const builder = new FetcherBuilder()
        .transformer(transformer1)
        .transformer(transformer2);

      expect(builder.config.transformers).toHaveLength(2);
      expect(builder.config.transformers?.[0]).toBe(transformer1);
      expect(builder.config.transformers?.[1]).toBe(transformer2);
    });

    it("should return this for chaining", () => {
      const builder = new FetcherBuilder();
      const transformer = (data: unknown) => data;
      const result = builder.transformer(transformer);

      expect(result).toBe(builder);
    });

    it("should preserve order of transformers", () => {
      const transformers = [
        (data: any) => ({ ...data, step: 1 }),
        (data: any) => ({ ...data, step: 2 }),
        (data: any) => ({ ...data, step: 3 }),
      ];

      const builder = transformers.reduce(
        (b, t) => b.transformer(t),
        new FetcherBuilder(),
      );

      expect(builder.config.transformers).toEqual(transformers);
    });
  });

  describe("schema", () => {
    it("should add Zod schema as transformer", () => {
      const schema = z.object({
        id: z.number(),
        name: z.string(),
      });

      const builder = new FetcherBuilder().schema(schema);

      expect(builder.config.transformers).toBeDefined();
      expect(builder.config.transformers).toHaveLength(1);
    });

    it("should validate data against schema", () => {
      const schema = z.object({
        id: z.number(),
        name: z.string(),
      });

      const builder = new FetcherBuilder().schema(schema);
      const transformer = builder.config.transformers?.[0];

      expect(transformer).toBeDefined();

      // Valid data
      const validData = { id: 1, name: "John" };
      expect(() => transformer!(validData, {} as Response)).not.toThrow();

      // Invalid data
      const invalidData = { id: "not-a-number", name: "John" };
      expect(() => transformer!(invalidData, {} as Response)).toThrow();
    });

    it("should work with other transformers", () => {
      const schema = z.object({
        value: z.number(),
      });

      const builder = new FetcherBuilder()
        .transformer((data: any) => data.result)
        .schema(schema);

      expect(builder.config.transformers).toHaveLength(2);
    });

    it("should return this for chaining", () => {
      const schema = z.object({ id: z.number() });
      const builder = new FetcherBuilder();
      const result = builder.schema(schema);

      expect(result).toBe(builder);
    });

    it("should support complex schemas", () => {
      const schema = z.object({
        id: z.number(),
        name: z.string(),
        email: z.string().email(),
        age: z.number().min(0).max(150),
        tags: z.array(z.string()),
        metadata: z.record(z.string(), z.unknown()).optional(),
      });

      const builder = new FetcherBuilder().schema(schema);
      const transformer = builder.config.transformers?.[0];

      const validData = {
        id: 1,
        name: "John Doe",
        email: "john@example.com",
        age: 30,
        tags: ["developer", "typescript"],
        metadata: { key: "value" },
      };

      expect(() => transformer!(validData, {} as Response)).not.toThrow();
    });
  });

  describe("retry", () => {
    it("should set retry configuration", () => {
      const retryConfig = {
        maxRetries: 5,
        initialDelay: 200,
        exponential: true,
      };

      const builder = new FetcherBuilder().retry(retryConfig);

      expect(builder.config.retry).toEqual(retryConfig);
    });

    it("should support partial retry config", () => {
      const builder = new FetcherBuilder().retry({ maxRetries: 5 });

      expect(builder.config.retry).toEqual({ maxRetries: 5 });
    });

    it("should return this for chaining", () => {
      const builder = new FetcherBuilder();
      const result = builder.retry({ maxRetries: 3 });

      expect(result).toBe(builder);
    });

    it("should support onRetry callback", () => {
      const onRetry = vi.fn();
      const builder = new FetcherBuilder().retry({
        maxRetries: 3,
        onRetry,
      });

      expect(builder.config.retry?.onRetry).toBe(onRetry);
    });

    it("should support custom retryable statuses", () => {
      const builder = new FetcherBuilder().retry({
        retryableStatuses: [408, 429, 500],
      });

      expect(builder.config.retry?.retryableStatuses).toEqual([408, 429, 500]);
    });

    it("should support full retry configuration", () => {
      const onRetry = vi.fn();
      const retryConfig = {
        maxRetries: 5,
        initialDelay: 100,
        maxDelay: 30000,
        exponential: true,
        retryableStatuses: [408, 429, 500, 502, 503, 504],
        onlyIdempotent: true,
        onRetry,
      };

      const builder = new FetcherBuilder().retry(retryConfig);

      expect(builder.config.retry).toEqual(retryConfig);
    });
  });

  describe("integration", () => {
    it("should build fetcher with all features combined", () => {
      const schema = z.object({
        users: z.array(
          z.object({
            id: z.number(),
            name: z.string(),
          }),
        ),
      });

      const onRetry = vi.fn();

      const fetcher = FetcherBuilder.json("https://api.example.com")
        .path("/users")
        .method("GET")
        .timeout(10000)
        .header("X-Custom-Header", "value")
        .queryParams({ page: 1, limit: 10 })
        .transformer((data: any) => data.result)
        .schema(schema)
        .retry({
          maxRetries: 3,
          initialDelay: 100,
          exponential: true,
          onRetry,
        })
        .build();

      expect(fetcher).toBeInstanceOf(Fetcher);

      const config = fetcher.config;
      expect(config.baseUrl).toBe("https://api.example.com");
      expect(config.path).toBe("/users");
      expect(config.method).toBe("GET");
      expect(config.timeout).toBe(10000);
      expect(config.headers).toMatchObject({
        "Content-Type": "application/json",
        "X-Custom-Header": "value",
      });
      expect(config.queryParams).toEqual({ page: 1, limit: 10 });
      expect(config.transformers).toHaveLength(2);
      expect(config.retry).toBeDefined();
      expect(config.retry?.maxRetries).toBe(3);
      expect(config.retry?.onRetry).toBe(onRetry);
    });

    it("should support authenticated API with validation and retry", () => {
      const schema = z.object({
        token: z.string(),
        expiresIn: z.number(),
      });

      const fetcher = FetcherBuilder.withAuth(
        "https://api.example.com",
        "token123",
      )
        .path("/refresh")
        .method("POST")
        .schema(schema)
        .retry({ maxRetries: 2, initialDelay: 50 })
        .build();

      expect(fetcher).toBeInstanceOf(Fetcher);
      expect(fetcher.config.headers?.Authorization).toBe("Bearer token123");
      expect(fetcher.config.transformers).toHaveLength(1);
      expect(fetcher.config.retry?.maxRetries).toBe(2);
    });
  });
});
