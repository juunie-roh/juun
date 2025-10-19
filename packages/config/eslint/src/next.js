import { defineConfig } from "eslint/config";
import nextPlugin from '@next/eslint-plugin-next';
import { compat } from './util.js';

export default defineConfig([
  ...compat.config(nextPlugin.configs.recommended),
  ...compat.config(nextPlugin.configs['core-web-vitals']),
]);
