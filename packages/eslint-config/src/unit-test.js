import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
// @ts-ignore
import jestFormatting from 'eslint-plugin-jest-formatting';
import testingLibrary from 'eslint-plugin-testing-library';
import { baseRules } from './base';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: [
      'tests/**/*',
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.spec.{js,jsx,ts,tsx}',
    ],
    plugins: {
      jest,
      'jest-dom': jestDom,
      'jest-formatting': jestFormatting,
      'testing-library': testingLibrary,
    },
    rules: {
      ...baseRules,
      // Jest rules
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/prefer-to-be': 'error',
      'jest/valid-expect': 'error',

      // Jest DOM rules
      'jest-dom/prefer-checked': 'error',
      'jest-dom/prefer-in-document': 'error',
      'jest-dom/prefer-to-have-class': 'error',

      // Testing Library rules
      'testing-library/await-async-queries': 'error',
      'testing-library/no-await-sync-queries': 'error',
      'testing-library/no-container': 'warn',
      'testing-library/no-debugging-utils': 'warn',
      'testing-library/prefer-screen-queries': 'error',
    },
    languageOptions: {
      globals: jest.environments.globals.globals,
    },
  },
];
