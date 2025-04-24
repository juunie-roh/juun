# @pkg/ui

## 0.0.3

### Patch Changes

- 1e0d1a2: Refactor Component

  refactor(component): Fix logo avatar component

  - Fix props type.
    Now extends `HTMLProps`.
    `color` props now accepts `false` value, to explicitly disable the coloring.
    `children` is required.

  - Change the way of receiving element.
    Instead of receiving the element as a prop, now the component uses the children directly.

  - Fix coloring principle.
    The default color is applied only for svg elements.
    Color can be disabled for already colored svgs.

- 0b54384: Add New Component

  feat: Add new component

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
