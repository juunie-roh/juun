import { defineConfig } from "eslint/config";
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import unusedImports from 'eslint-plugin-unused-imports';
import { baseRules } from './base.js';

export const tsRules = {
  ...baseRules,
  '@typescript-eslint/array-type': 'off',
  '@typescript-eslint/ban-ts-comment': 'off',
  '@typescript-eslint/ban-tslint-comment': 'off',
  '@typescript-eslint/class-literal-property-style': 'off',
  '@typescript-eslint/consistent-generic-constructors': 'off',
  '@typescript-eslint/consistent-indexed-object-style': 'off',
  '@typescript-eslint/consistent-type-definitions': 'off',
  '@typescript-eslint/no-empty-function': 'off',
  '@typescript-eslint/no-empty-interface': 'off',
  '@typescript-eslint/no-empty-object-type': 'off',
  '@typescript-eslint/no-explicit-any': 'off',
  '@typescript-eslint/no-inferrable-types': 'off',
  '@typescript-eslint/no-namespace': 'off',
  '@typescript-eslint/no-shadow': 'off',
  '@typescript-eslint/no-this-alias': 'off',
  '@typescript-eslint/no-unused-vars': 'off',
  '@typescript-eslint/no-unused-expressions': 'off',
  '@typescript-eslint/no-wrapper-object-types': 'off',
  '@typescript-eslint/triple-slash-reference': 'off',

  'no-restricted-syntax': [
    'error',
    'ForInStatement',
    'LabeledStatement',
    'WithStatement',
  ],
  'import/order': 'off',
  'import/refer-default-export': 'off',
  'simple-import-sort/imports': 'error',
  'simple-import-sort/exports': 'error',
  'unused-imports/no-unused-imports': 'error',
  'unused-imports/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  'consistent-return': 'off',
};

export default defineConfig([
  {
    files: ['**/*.ts', '**/*.tsx'],
    plugins: {
      '@typescript-eslint': tseslint,
      'unused-imports': unusedImports,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
    rules: tsRules,
  },
]);
