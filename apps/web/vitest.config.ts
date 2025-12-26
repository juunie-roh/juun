import path from "node:path";
import { fileURLToPath } from "node:url";

import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  test: {
    exclude: ["**/node_modules/**", "**/__e2e__/**"],
    environment: "jsdom",
    coverage: {
      include: ["src/**"],
      exclude: [
        "**/index.*",
        "**/__tests__/**",
        "**/*.(test|spec).*",
        "**/__mocks__/**",
        "**/*.d.ts",
        "**/__e2e__/**",
      ],
    },
    projects: [
      {
        extends: true,
        plugins: [
          storybookTest({
            // The location of your Storybook config, main.js|ts
            configDir: path.join(dirname, ".storybook"),
            // This should match your package.json script to run Storybook
            // The --no-open flag will skip the automatic opening of a browser
            storybookScript: "pnpm storybook --no-open",
            tags: {
              include: ["test"],
            },
          }),
        ],
        test: {
          name: "storybook",
          // Enable browser mode
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
          setupFiles: ["./.storybook/vitest.setup.ts"],
        },
      },
    ],
  },
});
