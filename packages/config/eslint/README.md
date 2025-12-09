# config/eslint

Collection of internal ESLint configurations for different environments and technologies.

## Usage

Import and use these configurations in your ESLint config files.

### Default Configuration

For a standard setup with all rules:

```js
// eslint.config.js
import config from 'config/eslint';

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
} from 'config/eslint';

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

## Peer Dependencies

This package uses **peer dependencies** for optional ESLint plugins. Install only what you need based on which configs you use:

| Config | Required Peer Dependencies |
|--------|---------------------------|
| `base` | None (core dependencies only) |
| `typescript` | None (core dependencies only) |
| `prettier` | None (core dependencies only) |
| `react` | `eslint-plugin-react`<br/>`eslint-plugin-react-hooks` |
| `a11y` | `eslint-plugin-jsx-a11y`<br/>`@types/eslint-plugin-jsx-a11y`<br/>`@testing-library/dom` |
| `next` | `@next/eslint-plugin-next` |
| `storybook` | `eslint-plugin-storybook` |
| `unitTest` | `eslint-plugin-testing-library` |

### Core Dependencies (Always Included)

These are installed automatically:

- `@eslint/eslintrc`, `@eslint/js`
- `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`
- `eslint`, `eslint-config-prettier`
- `eslint-plugin-jsdoc`, `eslint-plugin-prettier`
- `eslint-plugin-simple-import-sort`, `eslint-plugin-turbo`
- `eslint-plugin-unused-imports`

### Example: Installing for React + TypeScript + a11y

```json
{
  "devDependencies": {
    "@config/eslint": "workspace:^",
    "@testing-library/dom": "^10.4.1",
    "@types/eslint-plugin-jsx-a11y": "^6.10.1",
    "eslint-plugin-jsx-a11y": "^6.10.2",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^7.0.1"
  }
}
```

## Notes

- The order of extending configurations matters. Generally, `prettier` should be last to ensure its rules override others.
- TypeScript configurations assume a `tsconfig.json` file is present in your project root.
- If you see "unmet peer dependency" warnings, install the required plugins based on the table above.
