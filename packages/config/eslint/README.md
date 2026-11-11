# @config/eslint

Collection of internal ESLint flat configurations for different environments and technologies.

## Usage

Import and use these configurations in your `eslint.config.js`.

### Default Configuration

The default export combines `base`, `typescript`, `react`, `next`, `storybook` and `prettier`. This is what `apps/web` uses:

```js
// eslint.config.js
import config, { defineConfig } from "@config/eslint";

/** @type {import('eslint').Linter.Config[]} */
export default defineConfig([
  ...config,
  {
    ignores: ["messages/ko.d.json.ts"],
  },
]);
```

### Custom Configuration

Pick specific rule sets from the named exports (this is what `packages/db` uses):

```js
// eslint.config.js
import { base, defineConfig, typescript } from "@config/eslint";

export default defineConfig([
  ...base,
  ...typescript,
  {
    ignores: ["src/generated/prisma/**/*"],
  },
]);
```

Configs that aren't part of the default export, such as `react-native`, are imported by file path through the `./*` export (as in `apps/mobile`):

```js
import base from "@config/eslint/base.js";
import reactNative from "@config/eslint/react-native.js";
```

## Available Configurations

- `base`: Standard ESLint rules for all JavaScript files
- `typescript`: TypeScript-specific rules and overrides
- `react`: React and React Hooks rules
- `next`: Next.js rules and best practices
- `storybook`: Rules for Storybook files
- `react-native`: React Native rules (file import only)
- `prettier`: Prettier integration for code formatting

`defineConfig` (from `eslint/config`) is re-exported for convenience.

## Peer Dependencies

Plugins for the optional configs are **optional peer dependencies**. Install only the ones for the configs you use:

| Config | Required Peer Dependencies |
| ------ | ------------------------- |
| `base` | None (core dependencies only) |
| `typescript` | None (core dependencies only) |
| `prettier` | None (core dependencies only) |
| `react` | `eslint-plugin-react`<br/>`eslint-plugin-react-hooks` |
| `next` | `@next/eslint-plugin-next` |
| `storybook` | `eslint-plugin-storybook` |
| `react-native` | `eslint-plugin-react-native` |

### Core Dependencies (Always Included)

These are installed automatically:

- `@eslint/js`, `eslint`
- `@typescript-eslint/eslint-plugin`, `@typescript-eslint/parser`
- `eslint-config-prettier`, `eslint-plugin-prettier`
- `eslint-plugin-jsdoc`, `eslint-plugin-simple-import-sort`
- `eslint-plugin-turbo`, `eslint-plugin-unused-imports`

### Example: Installing for React + TypeScript

```json
{
  "devDependencies": {
    "@config/eslint": "workspace:^",
    "eslint-plugin-react": "^7.37.5",
    "eslint-plugin-react-hooks": "^7.0.1"
  }
}
```

## Notes

- The order of configurations matters. Keep `prettier` last so its rules override the others.
- The TypeScript configuration assumes a `tsconfig.json` file in the project root.
- If you see "unmet peer dependency" warnings, install the plugins listed in the table above.
