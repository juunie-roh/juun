# Juun

Modern Next.js monorepo showcasing advanced web development patterns and 3D geospatial applications.

## Features

- **Portfolio & Blog**: Personal website with dynamic routing and Korean i18n
- **3D Graphics**: Three.js components with physics (Cannon.js)
- **Geospatial**: Native Cesium integration with custom utilities
- **UI System**: Custom shadcn/ui components with drag & drop support
- **Monorepo**: Turborepo with shared configurations and optimized builds

## Tech Stack

- **Framework**: Next.js 15 + React 19 + TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **3D/Maps**: Three.js + Cesium (native implementation)
- **State**: Zustand (global) + React Context (route-scoped)
- **Build**: Turborepo + PNPM workspaces
- **Quality**: ESLint + Prettier + Jest + Storybook

## Quick Start

```bash
# Install dependencies
pnpm install

# Start development server
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Type checking
pnpm check-types
```

## Project Structure

```text
juun/
├── apps/web/              # Next.js application
├── packages/
│   ├── ui/                # Component library
│   └── config/            # Shared configurations
└── .github/               # CI/CD workflows
```

## Architecture

### Monorepo Design

- **Turborepo**: High-performance build system with remote caching
- **Workspace Dependencies**: Packages reference each other using `workspace:^`
- **Shared Configurations**: Centralized ESLint, TypeScript, and Tailwind configs

### State Management Strategy

- **Hybrid Approach**: Zustand for global state, React Context for feature-scoped state
- **Feature Isolation**: Services use private folders (`_components`, `_contexts`, `_utils`)
- **Automatic Cleanup**: Context-based state prevents global pollution

### Component Architecture

- **Three-Layer System**: UI package → App components → Service components
- **Design System**: shadcn/ui primitives with custom extensions
- **Type Safety**: Comprehensive TypeScript with forwardRef patterns

### Cesium Integration

- **Native Implementation**: Direct Cesium APIs (eliminated 1MB Resium wrapper)
- **Self-Contained Module**: Portable cesium-utils with centralized configuration
- **Dynamic Loading**: Cesium loads only when accessed, optimizing bundle size

### Development Experience

- **Next.js 15**: App Router with file-based routing and server components
- **Korean i18n**: Type-safe internationalization with next-intl
- **Quality Tools**: ESLint, Prettier, Husky, Commitlint automation

## Scripts

```bash
# Development
pnpm dev          # Start development server
pnpm build        # Build all packages
pnpm test         # Run tests
pnpm check-types  # TypeScript checking
pnpm lint         # Code linting

# Storybook
pnpm storybook    # Component documentation

# Analysis
pnpm analyze      # Bundle analysis (in apps/web)
```

## Deployment

- **Vercel**: Automatic deployment from GitHub
- **Docker**: Multi-stage builds with standalone output
- **CI/CD**: GitHub Actions with matrix testing

## License

MIT
