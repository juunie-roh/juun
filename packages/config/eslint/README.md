# @juun/config/eslint

Collection of internal ESLint configurations for different environments and technologies.

## Usage

Import and use these configurations in your ESLint config files.

### Default Configuration

For a standard setup with all rules:

```js
// eslint.config.js
import config from '@juun/config/eslint';

/** @type {import('eslint').Linter.Config[]} */
export default config;
```

### Custom Configuration

For a custom setup with specific rule sets:

```js
// eslint.config.js
import {
  base,
  a11y,
  react,
  typescript,
  prettier,
} from '@juun/config/eslint';

/** @type {import('eslint').Linter.Config[]} */
export default [
  ...base,
  ...a11y,
  ...react,
  ...typescript,
  ...prettier,
];
```

## Available Configurations

- `base`: Standard ESLint rules for all JavaScript files
- `a11y`: Accessibility rules for React components
- `react`: React and React Hooks specific rules
- `typescript`: TypeScript specific rules and overrides
- `next`: Next.js specific rules and best practices
- `storybook`: Rules for Storybook files
- `tailwindcss`: Rules for Tailwind CSS
- `unitTest`: Rules for Jest and Testing Library
- `prettier`: Prettier integration for code formatting

## Notes

- The order of extending configurations matters. Generally, `prettier` should be last to ensure its rules override others.
- TypeScript configurations assume a `tsconfig.json` file is present in your project root.