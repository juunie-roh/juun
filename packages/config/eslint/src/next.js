import { defineConfig } from "eslint/config";
import nextPlugin from '@next/eslint-plugin-next';

export default defineConfig([
  nextPlugin.configs['core-web-vitals'],
]);
