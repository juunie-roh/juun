import { describe, expect, it } from "vitest";

import { createQueryKeyFactory } from "./utils";

describe("createQueryKeyFactory", () => {
  describe("factory creation", () => {
    it("should create a query key factory with correct methods", () => {
      const factory = createQueryKeyFactory("https://api.example.com");

      expect(factory).toHaveProperty("all");
      expect(factory).toHaveProperty("list");
      expect(factory).toHaveProperty("detail");
      expect(typeof factory.all).toBe("function");
      expect(typeof factory.list).toBe("function");
      expect(typeof factory.detail).toBe("function");
    });

    it("should create factory with different base URLs", () => {
      const userFactory = createQueryKeyFactory(
        "https://api.example.com/users",
      );
      const postFactory = createQueryKeyFactory(
        "https://api.example.com/posts",
      );

      expect(userFactory.all()).toEqual(["https://api.example.com/users"]);
      expect(postFactory.all()).toEqual(["https://api.example.com/posts"]);
    });
  });

  describe("all()", () => {
    it("should return array with base URL only", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.all();

      expect(result).toEqual(["https://api.example.com"]);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(1);
    });

    it("should return readonly tuple", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.all();

      // TypeScript ensures this is readonly at compile time
      expect(result).toBeInstanceOf(Array);
    });

    it("should return same structure for different base URLs", () => {
      const factory1 = createQueryKeyFactory("https://api.example.com/v1");
      const factory2 = createQueryKeyFactory("https://api.example.com/v2");

      expect(factory1.all()).toEqual(["https://api.example.com/v1"]);
      expect(factory2.all()).toEqual(["https://api.example.com/v2"]);
    });
  });

  describe("list()", () => {
    it("should return array with baseUrl, 'list', and undefined when no filters", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.list();

      expect(result).toEqual(["https://api.example.com", "list", undefined]);
      expect(result.length).toBe(3);
    });

    it("should include filters in query key", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const filters = { page: 1, limit: 10 };
      const result = factory.list(filters);

      expect(result).toEqual(["https://api.example.com", "list", filters]);
      expect(result[2]).toBe(filters);
    });

    it("should handle complex filter objects", () => {
      const factory = createQueryKeyFactory("https://api.example.com/users");
      const filters = {
        page: 2,
        limit: 20,
        role: "admin",
        active: true,
        createdAfter: "2024-01-01",
      };
      const result = factory.list(filters);

      expect(result).toEqual([
        "https://api.example.com/users",
        "list",
        filters,
      ]);
      expect(result[2]).toEqual(filters);
    });

    it("should handle empty filter object", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.list({});

      expect(result).toEqual(["https://api.example.com", "list", {}]);
    });

    it("should handle filter with nested objects", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const filters = {
        page: 1,
        sort: { field: "name", order: "asc" },
      };
      const result = factory.list(filters);

      expect(result).toEqual(["https://api.example.com", "list", filters]);
      expect(result[2]).toEqual(filters);
    });

    it("should handle filter with array values", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const filters = {
        tags: ["typescript", "react"],
        ids: [1, 2, 3],
      };
      const result = factory.list(filters);

      expect(result).toEqual(["https://api.example.com", "list", filters]);
      expect(result[2]).toEqual(filters);
    });

    it("should create different keys for different filters", () => {
      const factory = createQueryKeyFactory("https://api.example.com");

      const key1 = factory.list({ page: 1 });
      const key2 = factory.list({ page: 2 });

      expect(key1).not.toEqual(key2);
      expect(key1[2]).toEqual({ page: 1 });
      expect(key2[2]).toEqual({ page: 2 });
    });
  });

  describe("detail()", () => {
    it("should return array with baseUrl, 'detail', and numeric id", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.detail(123);

      expect(result).toEqual(["https://api.example.com", "detail", 123]);
      expect(result.length).toBe(3);
    });

    it("should handle string id", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.detail("user-123");

      expect(result).toEqual(["https://api.example.com", "detail", "user-123"]);
    });

    it("should handle numeric id", () => {
      const factory = createQueryKeyFactory("https://api.example.com/posts");
      const result = factory.detail(42);

      expect(result).toEqual(["https://api.example.com/posts", "detail", 42]);
    });

    it("should handle UUID string id", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const uuid = "550e8400-e29b-41d4-a716-446655440000";
      const result = factory.detail(uuid);

      expect(result).toEqual(["https://api.example.com", "detail", uuid]);
    });

    it("should create different keys for different ids", () => {
      const factory = createQueryKeyFactory("https://api.example.com");

      const key1 = factory.detail(1);
      const key2 = factory.detail(2);

      expect(key1).not.toEqual(key2);
      expect(key1[2]).toBe(1);
      expect(key2[2]).toBe(2);
    });

    it("should create different keys for string vs number id", () => {
      const factory = createQueryKeyFactory("https://api.example.com");

      const key1 = factory.detail("1");
      const key2 = factory.detail(1);

      // String "1" !== number 1
      expect(key1).not.toEqual(key2);
    });
  });

  describe("query key hierarchy", () => {
    it("should follow hierarchical pattern", () => {
      const factory = createQueryKeyFactory("https://api.example.com/users");

      const allKey = factory.all();
      const listKey = factory.list({ page: 1 });
      const detailKey = factory.detail(1);

      // All queries start with base URL
      expect(allKey[0]).toBe("https://api.example.com/users");
      expect(listKey[0]).toBe("https://api.example.com/users");
      expect(detailKey[0]).toBe("https://api.example.com/users");

      // List and detail have different second elements
      expect(listKey[1]).toBe("list");
      expect(detailKey[1]).toBe("detail");
    });

    it("should allow granular cache invalidation", () => {
      const factory = createQueryKeyFactory("https://api.example.com/users");

      // These would be used with queryClient.invalidateQueries()
      const invalidateAll = factory.all(); // Invalidates ALL user queries
      const invalidateList = factory.list(); // Invalidates all lists
      const invalidateSpecificList = factory.list({ page: 1 }); // Invalidates specific page
      const invalidateDetail = factory.detail(1); // Invalidates specific user

      expect(invalidateAll).toEqual(["https://api.example.com/users"]);
      expect(invalidateList[0]).toBe(invalidateAll[0]);
      expect(invalidateSpecificList[0]).toBe(invalidateAll[0]);
      expect(invalidateDetail[0]).toBe(invalidateAll[0]);
    });
  });

  describe("real-world usage patterns", () => {
    it("should support user resource pattern", () => {
      const userKeys = createQueryKeyFactory("https://api.example.com/users");

      // All users
      expect(userKeys.all()).toEqual(["https://api.example.com/users"]);

      // Users list with pagination
      expect(userKeys.list({ page: 1, limit: 10 })).toEqual([
        "https://api.example.com/users",
        "list",
        { page: 1, limit: 10 },
      ]);

      // Specific user
      expect(userKeys.detail(123)).toEqual([
        "https://api.example.com/users",
        "detail",
        123,
      ]);
    });

    it("should support post resource pattern", () => {
      const postKeys = createQueryKeyFactory("https://api.example.com/posts");

      // All posts
      expect(postKeys.all()).toEqual(["https://api.example.com/posts"]);

      // Published posts
      expect(postKeys.list({ status: "published" })).toEqual([
        "https://api.example.com/posts",
        "list",
        { status: "published" },
      ]);

      // Specific post by slug
      expect(postKeys.detail("my-blog-post")).toEqual([
        "https://api.example.com/posts",
        "detail",
        "my-blog-post",
      ]);
    });

    it("should support versioned API pattern", () => {
      const v1Keys = createQueryKeyFactory("https://api.example.com/v1/users");
      const v2Keys = createQueryKeyFactory("https://api.example.com/v2/users");

      // Different versions have different base URLs
      expect(v1Keys.all()).toEqual(["https://api.example.com/v1/users"]);
      expect(v2Keys.all()).toEqual(["https://api.example.com/v2/users"]);

      // Keys are completely separate
      expect(v1Keys.detail(1)).not.toEqual(v2Keys.detail(1));
    });

    it("should support multi-tenant pattern", () => {
      const tenant1Keys = createQueryKeyFactory(
        "https://api.example.com/tenants/1/users",
      );
      const tenant2Keys = createQueryKeyFactory(
        "https://api.example.com/tenants/2/users",
      );

      // Different tenants have different base URLs
      expect(tenant1Keys.all()).toEqual([
        "https://api.example.com/tenants/1/users",
      ]);
      expect(tenant2Keys.all()).toEqual([
        "https://api.example.com/tenants/2/users",
      ]);
    });
  });

  describe("type safety", () => {
    it("should maintain const assertion for all()", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.all();

      // The result is a readonly tuple
      const expected: readonly [string] = ["https://api.example.com"];

      expect(result).toEqual(expected);
    });

    it("should maintain const assertion for list()", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.list({ page: 1 });

      // The result is a readonly tuple
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(3);
    });

    it("should maintain const assertion for detail()", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.detail(1);

      // The result is a readonly tuple
      expect(result).toBeInstanceOf(Array);
      expect(result.length).toBe(3);
    });
  });

  describe("edge cases", () => {
    it("should handle empty base URL", () => {
      const factory = createQueryKeyFactory("");

      expect(factory.all()).toEqual([""]);
      expect(factory.list()).toEqual(["", "list", undefined]);
      expect(factory.detail(1)).toEqual(["", "detail", 1]);
    });

    it("should handle base URL with trailing slash", () => {
      const factory = createQueryKeyFactory("https://api.example.com/users/");

      expect(factory.all()).toEqual(["https://api.example.com/users/"]);
      expect(factory.detail(1)).toEqual([
        "https://api.example.com/users/",
        "detail",
        1,
      ]);
    });

    it("should handle base URL with query parameters", () => {
      const factory = createQueryKeyFactory(
        "https://api.example.com/users?version=1",
      );

      expect(factory.all()).toEqual([
        "https://api.example.com/users?version=1",
      ]);
    });

    it("should handle special characters in base URL", () => {
      const factory = createQueryKeyFactory(
        "https://api.example.com/users/search?q=test&filter=active",
      );

      expect(factory.all()).toEqual([
        "https://api.example.com/users/search?q=test&filter=active",
      ]);
    });

    it("should handle zero as id", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.detail(0);

      expect(result).toEqual(["https://api.example.com", "detail", 0]);
    });

    it("should handle negative id", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.detail(-1);

      expect(result).toEqual(["https://api.example.com", "detail", -1]);
    });

    it("should handle empty string as id", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const result = factory.detail("");

      expect(result).toEqual(["https://api.example.com", "detail", ""]);
    });

    it("should handle filter with null values", () => {
      const factory = createQueryKeyFactory("https://api.example.com");
      const filters = { search: null, status: undefined };
      const result = factory.list(filters as any);

      expect(result).toEqual(["https://api.example.com", "list", filters]);
    });
  });
});
