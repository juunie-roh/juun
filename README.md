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
│       │   └── slices/     # Store slices (bear, wheel, viewer)
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

## Architecture

The Juun project follows a modern micro-frontend-inspired architecture with strategic separation of concerns between global and service-scoped state management.

### State Management Strategy

#### Hybrid Zustand + React Context Pattern

The application employs a **dual-layer state management approach** that balances global consistency with service isolation:

##### **Global State (Zustand)**

- Used for conceptual shell application state in a micro-frontend architecture
- Manages cross-cutting concerns: `bear`, `wheel`, user authentication, or site-config
- Provides consistent state across the entire application
- Includes custom logger middleware for debugging

```typescript
// Global store example
const useBearStore = create<BearState>()(
  logger(
    (set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
    }),
    "bear-store",
  ),
);
```

##### **Service-Scoped State (React Context)**

- Used for feature-specific state management within individual services
- Automatic cleanup and isolation between routes/features
- No global state pollution
- Modern React patterns without external dependencies

### Self-Contained Service Architecture

#### Cesium-Utils: A Case Study in Service Isolation

The Cesium-Utils module demonstrates the **self-contained service pattern** designed for dynamic loading and complete portability:

**Architecture Principles:**

- **Complete Feature Isolation**: Everything co-located in `/cesium-utils/` directory
- **Private Folder Pattern**: Uses Next.js `_folder` convention to prevent route creation
- **Dynamic Loading**: Cesium imports only when the service is accessed
- **Zero External Dependencies**: No reliance on global state or components

**Structure:**

```text
cesium-utils/
├── [slug]/             # Dynamic routes (/terrain, /collection, etc.)
├── _components/        # Private UI components (not routed)
├── _contexts/          # React Context for service state
├── _utils/             # Centralized API configuration
└── page.tsx            # Default demo route
```

**Benefits:**

- **Complete Portability**: Can be transplanted to other Next.js projects
- **Single Source of Truth**: All API definitions centralized in `_utils/api.ts`
- **Automatic Cleanup**: Context-based state management
- **Enterprise-Ready**: Production-grade architectural patterns

### Internationalization Architecture

#### next-intl Integration

The application uses **next-intl** for type-safe, performant internationalization:

**Key Features:**

- **ICU Message Format**: Advanced formatting with pluralization, dates, numbers
- **Type Safety**: Auto-generated TypeScript definitions for translation keys
- **Built-in Utilities**: Format utilities for dates, numbers, currencies
- **Server-Side Ready**: Optimized for Next.js App Router

**Configuration:**

```typescript
// Centralized i18n config
export default getRequestConfig(async () => {
  const locale = "ko";
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

**Message Structure:**

- Translation files in `/messages/` directory
- Korean (ko) as default locale
- TypeScript interface generation for compile-time validation

### Monorepo Architecture

#### Turborepo + PNPM Workspaces

**Workspace Dependencies:**

- Packages reference each other using `workspace:^` protocol
- Dependency graph awareness for optimal build order
- Remote caching for faster CI/CD

**Build Pipeline:**

- Parallel task execution where possible
- Incremental builds based on file changes
- Terminal UI (TUI) for better developer experience

### Component Architecture

#### Three-Layer Component System

**1. UI Package (`@juun/ui`)**

- Shared, reusable components built on Radix UI primitives
- Consistent design system with Tailwind CSS
- Storybook documentation

**2. Application Components (`/components/`)**

- App-specific components that use the UI package
- Feature-grouped organization (blog, three, header, theme)

**3. Service Components (`/_components/`)**

- Private components scoped to specific services
- Co-located with their parent service
- Not accessible from other parts of the application

### Route Architecture

#### App Router + Dynamic Routes

**File-Based Routing:**

- Next.js 13+ App Router with file-system routing
- Dynamic routes using `[slug]` patterns
- Nested layouts for different sections

**Route Isolation:**

- Services use private folders (`_components`, `_contexts`, `_utils`)
- Clean separation between routable and non-routable code
- SEO-friendly static generation

### Development Patterns

#### Key Principles

1. **Prefer URL-based routing** over complex state management for navigation
2. **Use React Context** for service-scoped state, Zustand for global state
3. **Co-locate related code** within feature folders
4. **Centralize configuration** to eliminate scattered definitions
5. **Maintain feature isolation** for better maintainability and testing

This architecture enables the application to scale while maintaining clear boundaries between different concerns and services.

## Getting Started

### Prerequisites

- Node.js 22+
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
