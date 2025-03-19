# Juun

A modern [Next.js](https://nextjs.org) monorepo template powered by Turborepo with a complete UI system, state management, and developer tooling.

## 📋 Project Overview

This Turborepo-powered monorepo structure includes:

- **Web App**: Next.js application with App Router (`/apps/web`)
- **UI Library**: Component library with Tailwind & shadcn (`/packages/ui`)
- [**Config Package**](./packages/config/README.md): Shared configuration for TypeScript, ESLint, and Tailwind (`/packages/config`)

The project uses Turborepo to optimize the development workflow and build processes across all workspaces, enabling faster builds through intelligent caching and parallel task execution.

## 🚀 Features

### Core Technologies
- [Next.js 15](https://nextjs.org) with App Router
- [React 19](https://react.dev) with Server and Client Components
- [TypeScript](https://www.typescriptlang.org) for type safety
- [Tailwind CSS](https://tailwindcss.com) for styling
- [shadcn/ui](https://ui.shadcn.com) component system with customizations
- [Turborepo](https://turbo.build) for high-performance build system

### Developer Experience
- [Yarn](https://yarnpkg.com) for package management with node_modules linker
- Monorepo structure with workspace dependencies powered by Turborepo
- [ESLint](https://eslint.org) configuration for Next.js, React, TypeScript, and more
- [Prettier](https://prettier.io) for code formatting
- [Husky](https://typicode.github.io/husky) for Git hooks
- [Commitlint](https://commitlint.js.org) and [Commitizen](https://commitizen-tools.github.io/commitizen/) for standardized commits
- [Jest](https://jestjs.io) and [React Testing Library](https://testing-library.com) for testing
- [Storybook](https://storybook.js.org) for component development and documentation

### State Management & UI
- [Zustand](https://zustand.docs.pmnd.rs) with middleware support (logger)
- Customized [shadcn/ui](https://ui.shadcn.com) components
- Dark mode with [next-themes](https://github.com/pacocoursey/next-themes)
- Custom UI components:
  - Wheel component for circular menus
  - Portfolio system with dynamic routing

### Deployment & CI/CD
- [GitHub Actions](https://github.com/features/actions) for CI/CD
- Automated testing, linting, and type checking
- Docker support with multi-stage builds
- Vercel deployment with GitHub Actions sync

## 📁 Project Structure

```
juun/
├── apps/
│   └── web/                # Next.js application
│       ├── app/            # App Router routes
│       ├── assets/         # Fonts and SVGs
│       ├── components/     # React components
│       ├── stores/         # Zustand state management
│       │   ├── middleware/ # Store middleware (logger)
│       │   └── slices/     # Store slices (bear, wheel)
│       └── utils/          # Utility functions
├── packages/
│   ├── config/             # Shared configuration
│   │   ├── eslint/         # ESLint configuration
│   │   ├── tailwind/       # Tailwind configuration
│   │   └── typescript/     # TypeScript configuration
│   └── ui/                 # Component library
│       ├── src/components/ # UI components
│       └── lib/            # Utility functions
├── .github/                # GitHub workflows and templates
└── turbo.json              # Turborepo configuration
```

## 🛠️ Getting Started

### Prerequisites
- Node.js 18+ (recommended: 22.x)
- Yarn (latest)

### Installation

```bash
# Clone the repository
git clone https://github.com/juunie-roh/juun.git
cd juun

# Install dependencies
yarn
```

### Development

```bash
# Start the development server
yarn dev

# Run ESLint
yarn lint

# Run type checking
yarn check-types

# Run tests
yarn test
```

### Build

```bash
# Build for production
yarn build
```

## 🐳 Docker Support

The project includes Docker support for containerization:

```bash
# Build the Docker image
docker build -t juun .

# Run the Docker container
docker run -p 3000:3000 juun
```

## 📦 Deployment Strategy

### Branch Structure

This repository uses a specific branch structure for deployment:

- `main`: Main development branch - all feature development and PRs should target this branch

## ⚡ Turborepo Integration

### Key Benefits

Turborepo provides several advantages for this monorepo setup:

1. **Incremental Builds**: Only rebuilds what changed, saving significant time during development
2. **Task Pipelines**: Defines dependencies between tasks across packages
3. **Remote Caching**: Shares build artifacts across the team (when configured with a remote cache)
4. **Parallel Execution**: Runs tasks in parallel to maximize efficiency
5. **Workspace Awareness**: Understands dependencies between packages in the monorepo

### Usage with Vercel

The project is optimized for deployment on Vercel, with specific configuration to handle the monorepo structure. The `vercel` branch contains the necessary adjustments for Vercel to correctly build and deploy the application.