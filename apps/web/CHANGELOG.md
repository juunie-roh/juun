# @app/nextjs

## 0.0.4

### Patch Changes

- 3283138: Add About Page

  fix: Add about page for the project

- bbef95c: Fix Theme Switch component

  fix(component): Remove component mount detection

  - Remove mount detection which was causing blinking of component.

## 0.0.3

### Patch Changes

- 43500cf: Update Utilities

  refactor(util): Update and resturcture utilities

  - Add blog utility functions
    `getIdFromHeading`: Extract ID from heading element.
    `getHeadings`: Extract heading elements to display table of contents in blog posts.

  - Restructure types and utils
    Rename files with related components.

- 5585c49: Update Blog Pages

  feat(component): Add table of contents component

  - New component for blog posts
    table-of-contents: A component that can navigate through a blog post by heading elements
    sroll-progress-bar: A component which indicates the amount of scroll

  - Apply refactored utilities

- Updated dependencies [43500cf]
  - @pkg/ui@0.0.2

## 0.0.2

### Patch Changes

- f10b593: Fix Deprecated Property

  refactor: Remove deprecated property for `Link`

  - Resolve warning for usage of `legacyBehavior`

## 0.0.1

### Patch Changes

- 829545d: Change Release Strategy
- Updated dependencies [829545d]
  - @pkg/ui@0.0.1
