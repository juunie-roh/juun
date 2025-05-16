# @app/nextjs

## 0.0.7

### Patch Changes

- 021c038: Apply Lazy Loading

  perf: Performance update using lazy load with cesium

## 0.0.6

### Patch Changes

- 2b965a2: Cesium Utils Introduction

  feat: Add portfolio page

  - Create Cesium Utils library introduction page.
    Demontrate the very default Cesium viewer using resium.
    Actual demonstration will be present under `/cesium-utils` path.

- be96454: Cesium Integration

  build: Add cesium and fix configurations

  - Fix next configuration:
    Add plugin settings for cesium.
    Support source map in development environment.

  - Exclude public directory in tsconfig of next package.

  - Ignore copied Cesium codebase by symlink from gitignore.

  - Add postinstall script for Cesium preparation in package.json.

- Updated dependencies [bdf08b1]
  - @pkg/ui@0.0.4

## 0.0.5

### Patch Changes

- ca427d4: New Blog Post

  fix: Add new blog post

  - Post for Docker image optimization

- Updated dependencies [1e0d1a2]
- Updated dependencies [0b54384]
  - @pkg/ui@0.0.3

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
