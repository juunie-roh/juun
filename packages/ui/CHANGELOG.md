# @pkg/ui

## 0.0.2

### Patch Changes

- 43500cf: Restructure Package

  refactor(component): Use named exports

  - Replace wildcard re-exports with explicit named imports and exports.
    It supports better navigation link in IDE.

  - Each files now have only one export statements.
    For files have multiple exports, it is difficult to find what has been exported.

## 0.0.1

### Patch Changes

- 829545d: Change Release Strategy
