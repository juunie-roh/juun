import { defineConfig } from "eslint/config";
import nextPlugin from '@next/eslint-plugin-next';

// Manually construct flat config from Next.js plugin instead of using FlatCompat
// to avoid "unexpected name property" error with ESLint 9
export default defineConfig([
  {
    plugins: {
      '@next/next': nextPlugin,
    },
    rules: {
      ...nextPlugin.configs.recommended.rules,
      ...nextPlugin.configs['core-web-vitals'].rules,
    },
  },
]);
