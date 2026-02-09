import { defineConfig } from "eslint/config";
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default defineConfig([
  jsxA11y.flatConfigs.recommended,
  {
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
