import { FlatCompat } from '@eslint/eslintrc';
import eslint from '@eslint/js';
import nextPlugin from '@next/eslint-plugin-next';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import jest from 'eslint-plugin-jest';
import prettierPlugin from 'eslint-plugin-prettier';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import storybook from 'eslint-plugin-storybook';
import tailwindcss from 'eslint-plugin-tailwindcss';
import unusedImports from 'eslint-plugin-unused-imports';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Common rules
const commonRules = {
  'import/extensions': 'off',
  'no-param-reassign': 'off',
  'no-underscore-dangle': 'off',
  'prettier/prettier': [
    'error',
    {
      singleQuote: true,
      endOfLine: 'auto',
    },
  ],
};

// TypeScript specific rules
const tsRules = {
  ...commonRules,
  'react/function-component-definition': 'off',
  'react/destructuring-assignment': 'off',
  'react/require-default-props': 'off',
  'react/jsx-props-no-spreading': 'off',
  '@typescript-eslint/comma-dangle': 'off',
  '@typescript-eslint/camelcase': 'off',
  '@typescript-eslint/consistent-type-imports': 'error',
  '@typescript-eslint/no-explicit-any': 'off',
  'no-restricted-syntax': [
    'error',
    'ForInStatement',
    'LabeledStatement',
    'WithStatement',
  ],
  'import/prefer-default-export': 'off',
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',
  'import/order': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-unused-expressions': 'off',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  'consistent-return': 'off',
};

export default [
  // Base config
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ...eslint.configs.recommended,
    plugins: {
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
      prettier: prettierPlugin,
    },
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: commonRules,
  },

  // TypeScript files
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports,
      tailwindcss: tailwindcss,
      'simple-import-sort': simpleImportSort,
    },
    rules: tsRules,
    settings: {
      tailwindcss: {
        config: 'tailwind.config.ts',
      },
    },
  },

  // Next.js specific configuration
  ...compat.config(nextPlugin.configs.recommended),
  ...compat.config(nextPlugin.configs['core-web-vitals']),

  // Test files
  {
    files: ['tests/**/*'],
    plugins: {
      jest: jest,
    },
    rules: commonRules,
    languageOptions: {
      globals: {
        ...jest.environments.globals.globals,
      },
    },
  },

  // Playwright E2E tests
  // {
  //   files: ['**/*.spec.ts'],
  //   ...compat.config(playwright.configs.recommended),
  // },

  // Storybook files
  {
    files: ['*.stories.*'],
    ...compat.config(storybook.configs.recommended),
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
        },
      ],
    },
  },

  ...tailwindcss.configs['flat/recommended'],

  // Prettier config (should be last)
  eslintConfigPrettier,
];
