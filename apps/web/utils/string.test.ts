import { describe, expect, it } from "vitest";

import { capitalize } from "./string";

describe("capitalize", () => {
  it("capitalizes simple string", () => {
    expect(capitalize("hello")).toBe("Hello");
  });

  it("handles all uppercase", () => {
    expect(capitalize("HELLO")).toBe("Hello");
  });

  it("splits by separator and capitalizes each segment", () => {
    expect(capitalize("CASE_STUDY", /_+/g)).toBe("Case Study");
    expect(capitalize("hello_world_test", "_")).toBe("Hello World Test");
  });

  it("handles separator with no split", () => {
    expect(capitalize("hello", /_+/g)).toBe("Hello");
  });

  it("handles empty string", () => {
    expect(capitalize("")).toBe("");
  });
});
