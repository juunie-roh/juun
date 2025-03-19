/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import nextJest from 'next/jest.js';

/**
 * This creates Jest configuration for next automatically including:
 *
 * - Setting up `transform` using the Next.js Compiler.
 * - Auto mocking stylesheets(`.css`, `.module.css`, and their scss variants), image imports and `next/font`.
 * - Loading `.env` (and all variants) into `process.env`.
 * - Ignoring `node_modules` from test resolving and transforms.
 * - Ignoring `.next` from test resolving.
 * - Loading `next.config.js` for flags that enable SWC transforms.
 */
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
});
/** @type {import('jest').Config} */
const customConfig = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^__mocks__/(.*)$': '<rootDir>/../../__mocks__/$1',
    '.+\\.(svg)$': '<rootDir>/__mocks__/fileMock.js',
    '^lucide-react%': '<rootDir>/__mocks__/lucide-react.jsx',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './**/*.{js,jsx,ts,tsx}',
    '!/**/_*.{js,jsx,ts,tsx}',
    '!**/.next/**',
    '!coverage/*',
    '!.storybook/*',
    '!**/*.stories.{js,jsx,ts,tsx}',
    '!**/*.config.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(customConfig);
