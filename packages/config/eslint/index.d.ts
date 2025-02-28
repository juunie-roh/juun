import type { Linter } from 'eslint';

/**
 * ESLint configuration for accessibility rules
 */
export declare const a11y: Linter.Config[];

/**
 * Base ESLint configuration with common rules
 */
export declare const base: Linter.Config[];

/**
 * Base rules used across configurations
 */
export declare const baseRules: Linter.RulesRecord;

/**
 * Next.js specific ESLint configuration
 */
export declare const next: Linter.Config[];

/**
 * Prettier ESLint configuration
 */
export declare const prettier: Linter.Config[];

/**
 * React specific ESLint configuration
 */
export declare const react: Linter.Config[];

/**
 * Storybook specific ESLint configuration
 */
export declare const storybook: Linter.Config[];

/**
 * Tailwind CSS specific ESLint configuration
 */
export declare const tailwindcss: Linter.Config[];

/**
 * TypeScript specific ESLint configuration
 */
export declare const typescript: Linter.Config[];

/**
 * TypeScript specific rules
 */
export declare const tsRules: Linter.RulesRecord;

/**
 * Unit testing specific ESLint configuration
 */
export declare const unitTest: Linter.Config[];

/**
 * Combined ESLint configuration with all rules
 */
declare const config: Linter.Config[];
export default config;
