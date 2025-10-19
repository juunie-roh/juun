import eslint from '@eslint/js';
import { defineConfig, globalIgnores } from "eslint/config";
import jsdoc from 'eslint-plugin-jsdoc';
import prettier from 'eslint-plugin-prettier';
import turbo from 'eslint-plugin-turbo';

export const baseRules = {
  'import/extensions': 'off',
  'no-param-reassign': 'off',
  'no-underscore-dangle': 'off',
  'prettier/prettier': [
    'error',
    {
      singleQuote: false,
      endOfLine: 'auto',
    },
  ],
};

export default defineConfig([
  globalIgnores([
    '**/node_modules/**',
    '**/dist/**',
    '**/.next/**',
    '**/build/**',
    '**/.turbo/**',
    '**/coverage/**',
  ]),
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...eslint.configs.recommended,
    plugins: {
      jsdoc,
      prettier,
      turbo,
    },
    rules: baseRules,
  },
]);
