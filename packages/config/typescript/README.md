# @pkg/config/typescript

Collection of internal TypeScript configurations.

Override below after extending the common configurations.

* `baseUrl`: where to start resolution with absolute paths.
* `rootDir`: specify the root directory of the package source files.
* `paths`: specify where to start resolution, usually for paths start with `@/*`.
* `include`: file names, name patterns, or paths to include.
* `exclude`: file names, name patterns, or paths to exclude.

## Usage

Extend the appropriate configuration in your project's `tsconfig.json`:

```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@pkg/config/typescript/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "rootDir": ".",
    "paths": { "@/*": ["./*"] }
  },
  "include": ["**/*.ts", "**/*.tsx"],
  "exclude": ["node_modules"]
}
```
