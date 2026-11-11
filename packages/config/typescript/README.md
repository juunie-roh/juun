# @config/typescript

Collection of internal TypeScript configurations.

| Config | Used by | Notes |
| --- | --- | --- |
| `base.json` | `@juun/db`, `@juun/api` | Strict mode, `isolatedModules`, declarations and source maps |
| `nextjs.json` | `@juun/web` | Next.js settings, plus `noUncheckedIndexedAccess` |
| `react-library.json` | — | For React libraries; not currently used |

`apps/mobile` extends `expo/tsconfig.base` instead.

After extending a configuration, override these per project:

* `rootDir`: the root directory of the package source files.
* `paths`: path aliases, usually `@/*`.
* `include`: file names, name patterns, or paths to include.
* `exclude`: file names, name patterns, or paths to exclude.

## Usage

Extend the appropriate configuration in your project's `tsconfig.json`:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@config/typescript/nextjs.json",
  "compilerOptions": {
    "rootDir": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```
