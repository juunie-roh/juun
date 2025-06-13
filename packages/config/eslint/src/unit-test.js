import jest from 'eslint-plugin-jest';
import jestDom from 'eslint-plugin-jest-dom';
import jestFormatting from 'eslint-plugin-jest-formatting';
import testingLibrary from 'eslint-plugin-testing-library';
import { baseRules } from './base.js';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    files: ['**/*.{test,spec}.{js,jsx,ts,tsx}'],
    plugins: {
      jest,
      'jest-dom': jestDom,
      'jest-formatting': jestFormatting,
      'testing-library': testingLibrary,
    },
    rules: {
      ...baseRules,
      // Jest rules
      'jest/expect-expect': 'off',
      'jest/no-disabled-tests': 'off',
      'jest/no-conditional-expect': 'off',
      'jest/valid-title': 'off',
      'jest/no-interpolation-in-snapshots': 'off',
      'jest/no-export': 'off',
      'jest/no-standalone-expect': [
        'error',
        { 'additionalTestBlockFunctions': ['retry'] },
      ],

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
