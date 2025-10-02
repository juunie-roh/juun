import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    include: ["./src/**/*.(test).*"],
    exclude: ["**/node_modules/**"],
    environment: "jsdom",
    coverage: {
      include: ["src/**"],
      exclude: ["**/index.*", "src/__tests__/**", "**/__mocks__/**"],
    },
  },
});
