# @juun/tsconfig

Collection of internal TypeScript configurations.

Override below after extending the common configurations.

* `baseUrl`: where to start resolution with absolute paths.
* `rootDir`: specify the root directory of the package source files.
* `paths`: specify where to start resolution, usually for paths start with `@/*`.
* `include`: file names, name patterns, or paths to include.
* `exclude`: file names, name patterns, or paths to exclude.

Template for extended configuration
```json
{
  "$schema": "https://json.schemastore.org/tsconfig",
  "extends": "@juun/tsconfig/[config-to-extend].json",
  "compilerOptions": {
    "baseUrl": "",
    "rootDir": "",
    "paths": { "@/*": [""] }
  },
  "include": [],
  "exclude": [],
}
```