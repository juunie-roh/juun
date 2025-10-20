# Juun

Modern Next.js monorepo showcasing advanced web development patterns, 3D geospatial applications, and serverless database architecture.

## Features

- **Portfolio & Blog**: Dynamic content with serverless database backend and Korean i18n
- **Serverless Database**: Prisma ORM with Neon PostgreSQL for scalable data management
- **3D Graphics**: Three.js components with physics (Cannon.js)
- **Geospatial**: Native Cesium integration with custom utilities
- **UI System**: Custom shadcn/ui components with drag & drop support
- **Monorepo**: Turborepo with shared configurations and optimized builds

## Tech Stack

### Core Technologies

- **Framework**: Next.js 15 + React 19 + TypeScript
- **Database**: Prisma ORM + Neon PostgreSQL (serverless)
- **Styling**: Tailwind CSS + shadcn/ui components
- **3D/Maps**: Three.js + Cesium (native implementation)
- **State**: Zustand (global) + React Context (route-scoped)
- **Build**: Turborepo + PNPM workspaces
- **Quality**: ESLint + Prettier + Vitest + Storybook

### Database Layer

- **ORM**: Prisma Client with type-safe queries
- **Database**: Neon PostgreSQL (serverless, auto-scaling)
- **Connection**: Pooled connections optimized for serverless environments
- **Architecture**: Singleton pattern preventing connection exhaustion

## Quick Start

```bash
# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Add your DATABASE_URL for Neon PostgreSQL

# Generate Prisma Client
pnpm db generate

# Start development server
pnpm dev

# Build all packages
pnpm build

# Run tests
pnpm test

# Type checking
pnpm check-types
```

## Database Commands

```bash
# Generate Prisma Client (auto-runs on postinstall)
pnpm db generate

# Push schema changes to database
pnpm db push

# Open Prisma Studio (database GUI)
pnpm db studio

# Create and apply migrations
pnpm db migrate
```

## Project Structure

```text
juun/
├── apps/
│   └── web/                    # Next.js application with serverless functions
│       ├── app/                # App Router (includes server components)
│       │   ├── blog/           # Dynamic blog with database integration
│       │   └── api/            # API routes (serverless functions)
│       └── ...
├── packages/
│   ├── db/                     # Database layer (Prisma + Neon)
│   │   ├── prisma/             # Schema and migrations
│   │   ├── src/
│   │   │   ├── client.ts       # Prisma singleton
│   │   │   └── queries/        # Type-safe database queries
│   │   │       └── post.ts     # Namespaced post queries
│   ├── api/                    # HTTP client utilities
│   ├── ui/                     # Component library
│   └── config/                 # Shared configurations
└── .github/                    # CI/CD workflows
```

## Architecture

### Serverless Database Architecture

#### Distributed Computing with Edge Functions

```text
User Request
    ↓
Vercel Edge Network (Auto-scaling, globally distributed)
    ↓
Next.js Server Component (Your backend code)
    ↓
Prisma Client (Type-safe ORM)
    ↓
Neon Connection Pooler (Serverless-optimized)
    ↓
PostgreSQL Database (Auto-scaling, auto-suspend)
```

#### Key Benefits

- **Auto-scaling**: Database and compute scale independently
- **Global Distribution**: Functions run close to users
- **Pay-per-use**: Only charged for active compute time
- **Type Safety**: End-to-end TypeScript from database to UI
- **Zero Ops**: No server management required

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

# Database
pnpm db generate  # Generate Prisma Client
pnpm db push      # Push schema to database
pnpm db studio    # Open Prisma Studio GUI
pnpm db migrate   # Run migrations

# Package-specific
pnpm web          # Work with web app
pnpm db           # Work with database package
pnpm ui           # Work with UI package
pnpm api          # Work with API package

# Documentation
pnpm storybook    # Component documentation

# Analysis
pnpm analyze      # Bundle analysis (in apps/web)
```

## Deployment

### Vercel (Recommended)

Fully serverless deployment with automatic edge distribution:

1. **Connect GitHub Repository** to Vercel
2. **Add Environment Variable**: `DATABASE_URL` (from Neon dashboard)
3. **Deploy**: Automatic on push to main branch

**Automatic Setup:**

- Prisma Client generation via `postinstall` hook
- Edge function deployment across 50+ global locations
- Neon database connection pooling
- Zero-downtime deployments

### Docker

Multi-stage builds with standalone output:

```bash
# Build standalone Next.js
pnpm build:standalone

# Run in Docker
docker build -t juun-app .
docker run -p 3000:3000 -e DATABASE_URL="..." juun-app
```

### CI/CD

GitHub Actions workflow includes:

- Prisma Client generation
- TypeScript type checking
- ESLint validation
- Unit and E2E tests
- Matrix testing (Node.js 24.x)

## Environment Variables

```bash
# Database (Required)
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# Optional: For connection pooling bypass (migrations, studio)
DATABASE_URL_UNPOOLED="postgresql://user:password@host/db"
```

## License

MIT
