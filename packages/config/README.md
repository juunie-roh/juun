# @pkg/config

Shared configuration files for Juun projects.

## Overview

This package contains reusable configurations for:

- ESLint
- TypeScript
- Tailwind CSS

## Usage

Each configuration can be imported and used separately in your projects.

### Available Configurations

- [ESLint](./eslint/README.md): Linting configurations
- [TypeScript](./typescript/README.md): TypeScript compiler options
- [Tailwind CSS](./tailwind/README.md): Styling configurations

## Installation

This package is designed to be used within the Juun monorepo. All workspace packages automatically have access to these configurations.

## Development

```bash
# Install dependencies
pnpm install

# Lint the package
pnpm lint

# Type check
pnpm check-types
```

## Package Structure

```text
config/
├── eslint/           # ESLint configurations
│   ├── src/          # Source files for each config
│   ├── index.js      # Main export
│   └── index.d.ts    # Type definitions
├── tailwind/         # Tailwind CSS configurations
│   ├── styles/       # Global styles
│   └── index.js      # Main export
└── typescript/       # TypeScript configurations
    ├── base.json     # Base config
    ├── nextjs.json   # Next.js specific config
    └── react-library.json # React library config
```

## Using with PNPM

This package utilizes PNPM's catalog versioning to manage dependencies consistently across the monorepo.

```json
"devDependencies": {
  "@eslint/eslintrc": "^3.3.1",
  "eslint": "catalog:",
  "prettier": "catalog:",
  "typescript": "catalog:"
}
```

Check each configuration's README for specific usage instructions.
