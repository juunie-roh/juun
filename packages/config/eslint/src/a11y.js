import { defineConfig } from "eslint/config";
import jsxA11y from 'eslint-plugin-jsx-a11y';
import { compat } from './util.js';

export default defineConfig([
  ...compat.config(jsxA11y.configs.recommended),
  {
    plugins: { 'jsx-a11y': jsxA11y },
    rules: {
      'jsx-a11y/anchor-is-valid': [
        'error',
        {
          components: ['Link'],
          specialLink: ['hrefLeft', 'hrefRight'],
          aspects: ['invalidHref', 'preferButton'],
        },
      ],
    },
  },
]);
