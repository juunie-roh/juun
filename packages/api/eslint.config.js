import { base, defineConfig, typescript } from "@config/eslint";

export default defineConfig([
  ...base,
  ...typescript,
  {
    ignores: ["generated/openapi/**/*"],
  },
]);
