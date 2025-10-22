# Juun

> **A technology-agnostic developer's architecture playground where modern web development meets real-world solutions**

🌐 **Live Site**: [https://juun.vercel.app](https://juun.vercel.app)

This is not just a portfolio—it's a **living laboratory** for modern web architecture, performance optimization, and developer experience. Every decision is documented, every experiment is tracked, and every lesson learned is shared through detailed blog articles.

## 🎯 Project Purpose

This project serves as:

- **Architecture Playground**: Experimenting with monorepo patterns, serverless architecture, and modern frontend patterns
- **Performance Laboratory**: Testing and documenting optimization techniques with measurable results
- **Learning Journal**: Documenting the entire development journey through [detailed blog articles](https://juun.vercel.app/blog)
- **DevOps Showcase**: Demonstrating CI/CD, Docker optimization, and deployment automation
- **Technical Writing Portfolio**: Producing conference-quality technical content on real-world implementations

## ✨ Key Achievements

### Performance Optimizations

- **Bundle Size**: 66-72% reduction through strategic lazy loading and dependency analysis ([Read more](https://juun.vercel.app/blog/bundle-optimization))
- **Docker Image**: 34% reduction (526MB → 346MB) with 99% layer efficiency ([Read more](https://juun.vercel.app/blog/docker-image-optimization))
- **Native Implementation**: Removed 1MB Resium wrapper, implemented direct Cesium integration
- **Server-Side Caching**: Next.js cache layer reducing database queries by ~99%

### Architecture Decisions

- **Serverless Database**: Prisma + Neon PostgreSQL for auto-scaling, zero-ops data layer ([Read more](https://juun.vercel.app/blog/serverless-database))
- **Monorepo Structure**: Turborepo-powered workspace with shared configurations
- **Feature Isolation**: Route-scoped state management and component organization ([Read more](https://juun.vercel.app/blog/separation-of-concerns))
- **Hybrid State Management**: Zustand for global, React Context for route-specific state

### DevOps & CI/CD

- **npm Package Publishing**: Designed workflow with manual approval stage for governance ([Read more](https://juun.vercel.app/blog/npm-packages))
- **Package Manager Migration**: Yarn Berry → PNPM for better monorepo compatibility ([Read more](https://juun.vercel.app/blog/yarn-berry))
- **Testing Migration**: Jest → Vitest + Playwright for improved DX and E2E coverage
- **Automated Documentation**: TypeDoc + GitHub Pages deployment pipeline

### Learning Through Experimentation

- **Micro-Frontend Experiment**: Implemented and removed multi-zone after discovering 77% performance degradation ([Read more](https://juun.vercel.app/blog/micro-frontend))
- **Package Optimization**: Learned and applied modular exports for tree-shaking efficiency
- **Evidence-Based Decisions**: Used experimental findings to influence production architecture at work

## 📊 Project Timeline

View the complete [development timeline](https://juun.vercel.app/about) documenting major milestones, architectural decisions, and lessons learned from September 2024 to present.

## 🚀 Features

### Core Application

- **Portfolio & Blog**: Dynamic content with serverless database backend and Korean i18n
- **3D Graphics**: Interactive Three.js components with physics engine (Cannon.js)
- **Geospatial**: Native Cesium integration with custom [@juun-roh/cesium-utils](https://www.npmjs.com/package/@juun-roh/cesium-utils) package
- **UI System**: Custom shadcn/ui components with drag & drop support (@dnd-kit)
- **Dark Mode**: Seamless theme switching with next-themes

### Technical Infrastructure

- **Serverless Database**: Prisma ORM with Neon PostgreSQL for scalable data management
- **Server-Side Caching**: Next.js cache layer with tag-based invalidation ([Cache README](apps/web/lib/cache/README.md))
- **Monorepo Management**: Turborepo with optimized builds and remote caching
- **Type Safety**: End-to-end TypeScript from database to UI
- **Quality Tools**: ESLint, Prettier, Vitest, Playwright, Storybook

## 🛠 Tech Stack

### Core Technologies

- **Framework**: [Next.js 15](https://nextjs.org/) + [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Database**: [Prisma ORM](https://www.prisma.io/) + [Neon PostgreSQL](https://neon.tech/) (serverless)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) components
- **3D/Maps**: [Three.js](https://threejs.org/) + [Cesium](https://cesium.com/) (native implementation)
- **State**: [Zustand](https://zustand-demo.pmnd.rs/) (global) + React Context (route-scoped)
- **Build**: [Turborepo](https://turbo.build/) + [PNPM](https://pnpm.io/) workspaces
- **Testing**: [Vitest](https://vitest.dev/) + [Playwright](https://playwright.dev/) + [Storybook](https://storybook.js.org/)

### Infrastructure

- **Hosting**: [Vercel](https://vercel.com/) (Edge Functions, automatic scaling)
- **Database**: [Neon](https://neon.tech/) (auto-scaling, auto-suspend, branch per PR)
- **CI/CD**: [GitHub Actions](https://github.com/features/actions) (lint, test, deploy)
- **Container**: [Docker](https://www.docker.com/) (multi-stage builds, Alpine Linux)
- **Package Registry**: [npm](https://www.npmjs.com/) (automated publishing via Changesets)

## 📦 Project Structure

```text
juun/
├── apps/
│   └── web/                      # Main Next.js application
│       ├── app/                  # App Router (includes server components)
│       │   ├── blog/             # Dynamic blog with database
│       │   │   └── _data/        # Blog articles as React components
│       │   ├── about/            # Project timeline
│       │   ├── portfolio/        # Portfolio projects
│       │   ├── cesium-utils/     # Cesium feature demos
│       │   └── api/              # API routes (serverless functions)
│       ├── lib/
│       │   └── cache/            # Next.js caching layer (see README)
│       └── __e2e__/              # Playwright E2E tests
├── packages/
│   ├── db/                       # Database layer (Prisma + Neon)
│   │   ├── prisma/               # Schema and migrations
│   │   └── src/queries/          # Type-safe database queries
│   ├── api/                      # HTTP client utilities
│   ├── ui/                       # Shared component library
│   └── config/                   # Shared configurations
│       ├── eslint/               # ESLint configurations
│       ├── typescript/           # TypeScript configurations
│       └── tailwind/             # Tailwind configurations
└── .github/workflows/            # CI/CD pipelines
```

## 🏗 Architecture

### Serverless Database Architecture

```text
User Request
    ↓
Vercel Edge Network (50+ global locations, auto-scaling)
    ↓
Next.js Server Components (your backend code)
    ↓
Server-Side Cache Layer (1-hour TTL, tag-based invalidation)
    ↓
Prisma Client (type-safe ORM with namespace pattern)
    ↓
Neon Connection Pooler (serverless-optimized, 15-min idle suspend)
    ↓
PostgreSQL Database (auto-scaling compute + storage)
```

**Key Benefits**:

- 🌍 Global distribution with low latency
- 📈 Auto-scaling from 0 to ∞ requests
- 💰 Pay-per-use (no idle costs)
- 🔒 Type safety from database to UI
- ⚡ ~99% cache hit rate for public content
- 🛠 Zero ops - no servers to manage

**Learn More**: [Serverless Database Architecture](https://juun.vercel.app/blog/serverless-database) | [Cache Layer Documentation](apps/web/lib/cache/README.md)

### State Management Strategy

**Hybrid Approach**:

- **Global State** (Zustand): Shared across the entire app (theme, modals, global UI state)
- **Route-Scoped State** (React Context): Feature-specific state isolated to routes
- **Server State** (Prisma + Cache): Database queries cached at the server level

**Pattern**: Prefer React Context for feature-specific state to prevent global pollution and improve portability.

**Learn More**: [Separation of Concerns in Frontend](https://juun.vercel.app/blog/separation-of-concerns)

### Monorepo Benefits

- **Shared Configuration**: Centralized ESLint, TypeScript, and Tailwind configs
- **Workspace Dependencies**: Internal packages use `workspace:^` protocol
- **Turborepo Caching**: Remote caching for faster CI/CD builds
- **Independent Versioning**: Each package maintains its own version

## 🚦 Quick Start

### Prerequisites

- Node.js 24.x or later
- PNPM 10.x or later
- PostgreSQL database (or Neon account)

### Installation

```bash
# Clone the repository
git clone https://github.com/juunie-roh/juun.git
cd juun

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Add your DATABASE_URL for Neon PostgreSQL

# Generate Prisma Client (auto-runs on postinstall)
pnpm db generate

# Push schema to database
pnpm db push

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Development Commands

```bash
# Development
pnpm dev              # Start dev server with hot reload
pnpm build            # Build all packages (Turborepo)
pnpm check-types      # TypeScript type checking
pnpm lint             # Run ESLint
pnpm test             # Run Vitest unit tests
pnpm test:e2e         # Run Playwright E2E tests

# Database
pnpm db generate      # Generate Prisma Client
pnpm db push          # Push schema to database (development)
pnpm db migrate       # Run migrations (production)
pnpm db studio        # Open Prisma Studio GUI

# Package-specific
pnpm web              # Work with web app
pnpm db               # Work with database package
pnpm ui               # Work with UI package

# Analysis
pnpm analyze          # Bundle analysis (in apps/web)

# Git
git cz                # Commitizen for conventional commits
pnpm cz               # Same as above
```

## 📚 Documentation

### Package Documentation

- [Database Package (@juun/db)](packages/db/README.md) - Prisma client and database queries
- [Cache Layer](apps/web/lib/cache/README.md) - Next.js caching patterns and usage
- [UI Package (@juun/ui)](packages/ui/README.md) - Component library documentation
- [Config Package (@config/*)](packages/config/README.md) - Shared configurations

### Configuration Documentation

- [Tailwind Config](packages/config/tailwind/README.md) - Theming and design tokens
- [TypeScript Config](packages/config/typescript/README.md) - TypeScript configurations
- [ESLint Config](packages/config/eslint/README.md) - Linting rules and setup

### Blog Articles (Technical Deep Dives)

All articles are available at [https://juun.vercel.app/blog](https://juun.vercel.app/blog)

**Architecture & Patterns**:

- [Serverless Database with Prisma + Neon](https://juun.vercel.app/blog/serverless-database)
- [Separation of Concerns in Frontend Development](https://juun.vercel.app/blog/separation-of-concerns)
- [Micro Frontend: Common Misconceptions](https://juun.vercel.app/blog/micro-frontend)

**Performance Optimization**:

- [Module Bundle Optimization in Next.js](https://juun.vercel.app/blog/bundle-optimization)
- [Docker Image Optimization: Multi-stage Builds](https://juun.vercel.app/blog/docker-image-optimization)

**DevOps & Infrastructure**:

- [Publishing npm Packages with CI/CD](https://juun.vercel.app/blog/npm-packages)
- [Yarn Berry PnP Configuration](https://juun.vercel.app/blog/yarn-berry)

**Case Studies**:

- [Next.js Server-Side Caching](https://juun.vercel.app/blog/nextjs-server-side-caching)

## 🐳 Docker

### Multi-stage Build (Production)

```bash
# Build standalone Next.js
pnpm build:standalone

# Build and run Docker image
docker build -t your-app-name .
docker run -p 3000:3000 -e DATABASE_URL="your_database_url" your-app-name
```

**Image Details**:

- **Base**: Alpine Linux (minimal footprint)
- **Size**: 346MB (optimized from 526MB)
- **Layers**: 99% efficiency through proper caching
- **Security**: Non-root user execution

**Learn More**: [Docker Image Optimization](https://juun.vercel.app/blog/docker-image-optimization)

## 🚀 Deployment

### Vercel (Recommended)

Fully serverless deployment with automatic edge distribution

1. Connect your GitHub repository to [Vercel](https://vercel.com)
2. Add environment variable: `DATABASE_URL` (from Neon dashboard)
3. Deploy - automatic on push to `main` branch

**Automatic Setup**:

- ✅ Prisma Client generation via `postinstall` hook
- ✅ Edge function deployment across 50+ global locations
- ✅ Neon database connection pooling
- ✅ Zero-downtime deployments

### Docker / Self-Hosting

See [Docker section](#-docker) above for containerized deployment.

### Environment Variables

```bash
# Required
DATABASE_URL="postgresql://user:password@host/db?sslmode=require"

# Optional (for connection pooling bypass in migrations/studio)
DATABASE_URL_UNPOOLED="postgresql://user:password@host/db"
```

## 🧪 Testing

### Unit & Integration Tests (Vitest)

```bash
pnpm test              # Run all tests
pnpm test:watch        # Watch mode
pnpm test:coverage     # Generate coverage report
```

### End-to-End Tests (Playwright)

```bash
pnpm test:e2e          # Run E2E tests
pnpm test:e2e:ui       # Run with Playwright UI
```

**Test Strategy**:

- Unit tests alongside components
- E2E tests in `apps/web/__e2e__/` directory
- React Testing Library for component testing
- Playwright for cross-browser E2E testing

## 📝 Contributing

This is a personal project, but if you find bugs or have suggestions:

1. Open an [issue](https://github.com/juunie-roh/juun/issues) for bugs or feature requests
2. Read the blog articles to understand architectural decisions

## 📄 License

MIT License - see [LICENSE](LICENSE) file for details

## 🙏 Acknowledgments

This project wouldn't exist without these amazing open-source projects:

- [Next.js](https://nextjs.org/) - The React framework for production
- [Prisma](https://www.prisma.io/) - Next-generation ORM
- [Neon](https://neon.tech/) - Serverless PostgreSQL
- [Turborepo](https://turbo.build/) - High-performance build system
- [shadcn/ui](https://ui.shadcn.com/) - Beautifully designed components
- [Vercel](https://vercel.com/) - Platform for frontend developers

## 🔗 Links

- **Live Site**: [https://juun.vercel.app](https://juun.vercel.app)
- **Blog**: [https://juun.vercel.app/blog](https://juun.vercel.app/blog)
- **Timeline**: [https://juun.vercel.app/about](https://juun.vercel.app/about)
- **GitHub**: [https://github.com/juunie-roh/juun](https://github.com/juunie-roh/juun)
- **npm Package**: [@juun-roh/cesium-utils](https://www.npmjs.com/package/@juun-roh/cesium-utils)

---

Built with ❤️ as a learning journey, documented for the community
