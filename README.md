# Juun

Next.js monorepo application powered by Turborepo.

## Project Overview

- **Web App**: Next.js application with App Router (`/apps/web`)
- **UI Library**: Component library with Tailwind & shadcn (`/packages/ui`)
- **Config Package**: Shared configuration for TypeScript, ESLint, and Tailwind (`/packages/config`)

## Features

### Core Technologies

- [Next.js 15](https://nextjs.org) with App Router
- [React 19](https://react.dev) with Server and Client Components
- [TypeScript](https://www.typescriptlang.org) for type safety
- [Tailwind CSS](https://tailwindcss.com) for styling
- [shadcn/ui](https://ui.shadcn.com) component system with customizations
- [Turborepo](https://turbo.build) for high-performance build system

### Developer Experience

- PNPM package management
- ESLint, Prettier, Husky, Commitlint
- Jest and React Testing Library
- Storybook for component documentation

### State Management & UI

- Zustand with middleware support
- Customized shadcn/ui components
- Dark mode with next-themes
- Custom UI components (wheel, portfolio system)

### Deployment & CI/CD

- GitHub Actions for CI/CD
- Docker support
- Vercel deployment

## Project Structure

```text
juun/
├── apps/
│   └── web/                # Next.js application
│       ├── app/            # App Router routes
│       ├── assets/         # Fonts and SVGs
│       ├── components/     # React components
│       ├── stores/         # Zustand state management
│       │   ├── middleware/ # Store middleware (logger)
│       │   └── slices/     # Store slices (bear, wheel, viewer, cesium-utils-feature)
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

## Getting Started

### Prerequisites

- Node.js 22+ (used 24.x here)
- PNPM (latest)

### Installation

```bash
# Clone the repository
git clone https://github.com/juunie-roh/juun.git
cd juun

# Install dependencies
pnpm install
```

### Development

```bash
# Start the development server
pnpm dev

# Run ESLint
pnpm lint

# Run type checking
pnpm check-types

# Run tests
pnpm test
```

### Build

```bash
# Build for production
pnpm build
```

## Docker Support

```bash
# Build the Docker image
docker build -t juun .

# Run the Docker container
docker run -p 3000:3000 juun
```

## Turborepo Integration

- Incremental builds and task pipelines
- Remote caching and parallel execution
- Workspace dependency management
