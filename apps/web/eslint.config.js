import config, { defineConfig } from "@config/eslint";

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  ...config,
  {
    // Ignore auto-generated next-intl type definitions
    ignores: ["messages/ko.d.json.ts"],
  },
]);
