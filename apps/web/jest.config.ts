/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { Config } from 'jest';
import nextJest from 'next/jest.js';
import type { JestConfigWithTsJest } from 'ts-jest';

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

const customConfig: JestConfigWithTsJest = {
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/public/(.*)$': '<rootDir>/public/$1',
    '^__mocks__/(.*)$': '<rootDir>/__mocks__/$1',
    '\\.svg$': '<rootDir>/__mocks__/svg.ts',
    '^lucide-react%': '<rootDir>/__mocks__/lucide-react.tsx',
  },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  clearMocks: true,
  collectCoverage: true,
  collectCoverageFrom: [
    './**/*.{js,jsx,ts,tsx}',
    '!/**/_*.{js,jsx,ts,tsx}',
    '!/stories/**',
    '!/**/*.stories.{js,jsx,ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
  ],
  testEnvironment: 'jest-environment-jsdom',
};

export default createJestConfig(customConfig as Config);
