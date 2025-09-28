import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./**/*.(test).*"],
    exclude: ["**/node_modules/**", "**/__e2e__/**"],
    environment: "jsdom",
    coverage: {
      include: ["src/**"],
      exclude: [
        "**/index.*",
        "**/__tests__/**",
        "**/__mocks__/**",
        "**/*.stories.*",
        "**/*.d.ts",
        "**/__e2e__/**",
      ],
    },
  },
});
