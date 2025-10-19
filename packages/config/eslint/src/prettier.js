import { defineConfig } from "eslint/config";
import eslintConfigPrettier from 'eslint-config-prettier';

export default defineConfig([
  // Prettier config (should always be last)
  eslintConfigPrettier,
]);
