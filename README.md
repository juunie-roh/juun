# Juun

[![Live Site](https://img.shields.io/badge/Live-juun.vercel.app-blue?style=flat-square)](https://juun.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)](https://nextjs.org/)

> **A self-documenting knowledge system where the development process is the content.**

This project demonstrates architectural thinking across multiple domains: technical implementation, editorial design, information architecture, and knowledge management. Every decision is documented, every experiment is tracked, and the project itself serves as both portfolio and learning laboratory.

🌐 [Live Site](https://juun.vercel.app) · 📝 [Blog Articles](https://juun.vercel.app/blog) · 🎮 [Playground](https://juun.vercel.app/playground) · 📊 [Timeline](https://juun.vercel.app/#timeline)

---

## Philosophy

> **Want the deep dive?** Read [Software Architecture](https://juun.vercel.app/ko/blog/9) — an article about why this project is structured to embed its maker's thinking process.

Unlike traditional portfolios that showcase finished products, Juun treats software development as a knowledge discipline:

- **Building features** → Creates timeline entries (ADRs)
- **Solving problems** → Produces blog articles
- **Architectural decisions** → Generates documented experiments
- **The development process IS the content**

**Result**: A living documentation system demonstrating *how* decisions are made, not just *what* was built.

---

## Key Features

### 📊 Decision Records (Timeline)

21+ architectural decision records with quantified outcomes:

- 66-72% bundle size reduction
- 34% Docker image optimization
- 19% HTML size reduction
- Real failures documented (1-day MFE reversal)

### 📝 Technical Articles

In-depth blog articles covering:

- Infrastructure (Docker, CI/CD, package management)
- Performance (bundle optimization, lazy loading)
- Architecture (MFE critique, separation of concerns)
- Bilingual: Korean primary + English LinkedIn versions

### 🌐 Internationalization

- Bilingual content system (Korean primary, English)
- Database-driven translations via junction tables
- SEO-optimized with canonical URLs and language alternates
- Locale-aware formatting (dates, numbers)

### 🎮 Interactive Playground

- **Markdown Input Renderer**: Real-time preview of the blog's content pipeline
- **Cesium Utils Demo**: [@juun-roh/cesium-utils](https://www.npmjs.com/package/@juun-roh/cesium-utils) npm package showcase
- **3D Graphics**: Three.js + Cannon physics simulations
- **UI Experiments**: Custom components (Wheel, Marquee)

### 🏗️ Production-Grade Architecture

- Turborepo monorepo with PNPM workspaces
- Framework-agnostic database layer (`@juun/db`)
- Next.js 16 caching with `"use cache"` directive
- Parallel routes + intercepting routes for modal UX
- Comprehensive testing (Vitest + Playwright)

---

## Tech Stack

| Layer | Technology |
| ------- | ------------ |
| **Framework** | Next.js 16, React 19.2, Turbopack |
| **Language** | TypeScript 5.9 |
| **Database** | Prisma ORM + Neon PostgreSQL |
| **Build System** | Turborepo with remote caching |
| **Package Manager** | PNPM (workspace protocol) |
| **3D Graphics** | CesiumJS (Geospatial) + Three.js + Cannon |
| **State Management** | Zustand (global) + React Context (route-scoped) |
| **Styling** | Tailwind CSS + shadcn/ui |
| **Testing** | Vitest + Storybook (browser tests) + Playwright |
| **CI/CD** | GitHub Actions + Vercel |
| **Documentation** | Storybook |

---

## Architecture Highlights

| Pattern | Implementation |
| ------- | -------------- |
| **Namespace queries** | `post.select.byId()`, `timeline.select.all()` |
| **Cache separation** | Pure DB layer + Next.js cache wrappers |
| **Translation fallback** | Korean default when locale missing |
| **Typography-driven schema** | Titles on base table (Latin font), content in translation tables |
| **Failed experiments documented** | 1-day MFE reversal (Timeline #14) |

## Project Structure

```text
juun/
├── apps/
│   └── web/
│       ├── app/
│       │   ├── [locale]/
│       │   │   ├── blog/[id]/
│       │   │   ├── timeline/[id]/
│       │   │   ├── playground/
│       │   │   └── cesium-utils/
│       │   └── @dialog/
│       └── lib/
│           └── cache/            # Next.js 16 "use cache" wrappers
│       └── utils/                # Utilities (security, image, date)
├── packages/
│   ├── db/                       # Framework-agnostic Prisma layer
│   ├── api/                      # HTTP client with retry
│   └── config/                   # Shared configs (ESLint, Tailwind, TS)
```

---

## Getting Started

### Prerequisites

- Node.js 24.x or 25.x (both tested in CI)
- PNPM 10.28.0 or higher

### Installation

```bash
# Clone the repository
git clone https://github.com/juunie-roh/juun.git
cd juun

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your DATABASE_URL

# Generate Prisma Client
pnpm db generate

# Start development server
pnpm dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the application.

### Development Commands

```bash
# Core development
pnpm dev                  # Start dev server (with Turbopack)
pnpm build                # Build all packages
pnpm lint                 # Run ESLint
pnpm test                 # Run unit tests (Vitest)
pnpm test:e2e             # Run E2E tests (Playwright)
pnpm check-types          # TypeScript type checking

# Package shortcuts
pnpm web <command>        # Run command in @juun/web
pnpm db <command>         # Run command in @juun/db

# Database operations
pnpm db generate          # Generate Prisma Client
pnpm db push              # Push schema to database (dev)
pnpm db studio            # Open Prisma Studio GUI

# Web-specific
pnpm web storybook        # Start Storybook (port 6006)
pnpm web analyze          # Bundle analysis

# Commits
git cz                    # Commitizen for conventional commits
```

---

## Measured Performance Improvements

| Optimization | Before | After | Reduction |
| -------------- | -------- | ------- | ----------- |
| Home page bundle | 2.53 MB | 853 KB | **66%** |
| Docker image | 526 MB | 346 MB | **34%** |
| Timeline HTML | 319 KB | 257 KB | **19%** |
| First Contentful Paint | 10s peaks | 1.2s stable | **88%** |

*All optimizations documented in [Timeline](https://juun.vercel.app/#timeline) entries #4, #5, #7, #14.*

## Documentation

- **Blog Articles**: In-depth technical write-ups at [juun.vercel.app/blog](https://juun.vercel.app/blog)
- **Timeline**: Chronological ADRs at [juun.vercel.app/#timeline](https://juun.vercel.app/#timeline)

---

## Author

### HyungJuun Roh (Juun)

- Website: [juun.vercel.app](https://juun.vercel.app)
- GitHub: [@juunie-roh](https://github.com/juunie-roh)
- LinkedIn: [HyungJuun Roh](https://linkedin.com/in/juun-roh)

---

<p align="center">
  <i>Every decision documented. Every experiment measured. Every failure owned.</i>
</p>
