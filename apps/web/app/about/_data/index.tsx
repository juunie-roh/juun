import { TimelineItem } from "../_components/timeline";

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    title: "Project Inception",
    description:
      "Initial commit with standard single Next.js application, with various development tools and Yarn Berry PnP.",
    detail: `
### The Initial Commit

The foundation of the project. A single Next.js application with Yarn Berry PnP. 
Trial of modern tool chains, which I found useful at that time.`,
    date: "2024-09-27",
    category: "Foundation",
    tags: ["Next.js", "TypeScript", "Yarn Berry", "PnP"],
  },
  {
    title: "Monorepo Architecture",
    description:
      "Restructured from single Next.js app to Turborepo-powered monorepo with shared packages",
    date: "2025-03-04",
    category: "Architecture",
    tags: ["Monorepo", "Turborepo", "Architecture", "Scalability"],
    detail: `
### The Problem
- Single Next.js app becoming complex
- UI components needed reusability
- Configuration duplication across files
- Difficult to extract and share utilities

### Decision
Transform to monorepo with Turborepo

### Structure
- apps/web: Main Next.js application
- packages/config: Shared configurations
- packages/ui: Shared component library

### Benefits
- Clear separation of concerns
- Turborepo caching improves build speed
- Independent versioning per package

### Challenges
- Package manager compatibility (led to Yarn → PNPM migration)
- Learning curve for workspace protocols
- Docker build complexity increased
`,
  },
  {
    title: "Package Manager Migration",
    description:
      "Migrated from Yarn Berry PnP to PNPM due to Next.js standalone and Vercel monorepo incompatibility",
    date: "2025-03-20",
    category: "Infrastructure",
    tags: ["Article", "Yarn Berry", "PNPM", "Package Manager", "Monorepo"],
    detail: `
### The Problem
Yarn Berry PnP caused critical issues:
- Next.js standalone build couldn't find modules in .yarn/cache
- Vercel monorepo deployment incompatible with PnP
- Docker image ballooned to 681MB due to workarounds

### Decision
Migrate to PNPM

### Rationale
- [x] Native Next.js standalone support
- [x] Vercel monorepo compatibility
- [x] Efficient disk usage with hard linking
- [x] Strong monorepo support
- [ ] Lost: Zero-install capability
- [ ] Lost: PnP speed benefits

### Outcome
- Docker image reduced to 346MB (50% reduction)
- Deployment reliability improved
- Build process simplified

### Related Article
["Yarn Berry PnP Configuration"](/blog/yarn-berry)
`,
  },
  {
    title: "Bundle Optimization",
    description:
      "Achieved 66-72% bundle size reduction through strategic lazy loading and dependency analysis",
    date: "2025-06-20",
    category: "Performance",
    tags: ["Article", "Performance", "Bundle", "Optimization", "Lazy Loading"],
    detail: `
### Initial State
- Bundle size: 2.53MB
- Heavy dependencies loaded upfront
- Barrel exports preventing tree-shaking

### Strategy
1. Identified barrel export issues
2. Implemented route-based code splitting
3. Lazy loaded heavy dependencies (Cesium, Three.js)
4. Removed unnecessary wrapper libraries

### Results
- Final bundle: 853kB (66% reduction)
- Some configurations: 72% reduction
- Improved First Contentful Paint

### Key Techniques
- Dynamic imports for 3D libraries
- Avoided barrel exports pattern
- Component-level lazy loading
- Dependency audit and pruning

### Related Article
["Bundle Optimization"](/blog/bundle-optimization)
  `,
  },
  {
    title: "Docker Build Optimization",
    description:
      "Reduced Docker image from 526MB to 346MB (34% reduction) with 99% layer efficiency",
    date: "2025-09-23",
    category: "Infrastructure",
    tags: ["Article", "Docker", "Optimization", "DevOps", "CI/CD"],
    detail: `
### Initial Problems
- Image size: 526MB
- Poor layer caching
- Yarn Berry PnP compatibility issues
- Long build times

### Optimization Strategy
1. Multi-stage build (base → deps → builder → runner)
2. Cache mount for dependencies
3. Proper .dockerignore configuration
4. Fresh base strategy vs copying node_modules

### Results
- Final image: 346MB (34% reduction)
- Layer efficiency: 99%
- Improved build cache hit rate

### Key Decisions
- Used Alpine Linux base
- Separated dependency installation from build
- Production-only dependencies in final image
- Leveraged BuildKit features

### Related Article
["Docker Image Optimization"](/blog/docker-image-optimization)
  `,
  },
  {
    title: "Micro-Frontend Experiment",
    description:
      "Implemented Next.js multi-zone architecture, then removed it after discovering 77% performance degradation",
    date: "2025-07-25",
    category: "Architecture",
    tags: ["Article", "MFE", "Multi-Zone", "Performance", "Reversal"],
    detail: `
### Context
Researching micro-frontend patterns for blog article and 
production application at work.

### The Experiment
- Implemented Next.js multi-zone
- Split app into independent zones
- Tested real-world performance

### Findings
- Full page reload on route transitions (SPA → MPA regression)
- Lost client-side routing benefits
- Complexity not justified for portfolio scale
- 77% potential degradation risk identified

### Decision: Reversal
Removed multi-zone architecture after 1 day

### Professional Impact
Used this experimental evidence to challenge executive proposal 
for micro-frontend at work, preventing costly architectural mistake.

### Related Article
["Micro Frontend: Common Misconceptions"](/blog/micro-frontend) documenting findings
`,
  },
  {
    title: "Resium Removal: Native Cesium",
    description:
      "Removed Resium wrapper library (-1MB), implemented direct Cesium integration with custom React wrapper",
    date: "2025-09-19",
    category: "Performance",
    tags: ["Cesium", "Bundle Optimization", "Performance", "React"],
    detail: `
### Context
Using Resium (React wrapper for Cesium) added 1MB to bundle.
Only using basic Cesium features, not Resium's abstractions.

### Decision
Remove Resium, implement native Cesium with custom React wrapper

### Implementation
- Created custom viewer component with forwardRef
- Direct Cesium API usage
- Maintained React-friendly interface

### Trade-offs
- -1MB bundle size (significant for FCP)
- Direct API access = more control
- Better performance characteristics
- More code to maintain
- Lost React abstractions
  `,
  },
  {
    title: "Cesium Utils Page Architecture Overhaul",
    description:
      "Complete refactoring for portability, high cohesion, and separation of concerns using private folders and route-scoped context",
    date: "2025-09-26",
    category: "Architecture",
    tags: [
      "Article",
      "Refactor",
      "SoC",
      "Architecture",
      "Context",
      "Portability",
    ],
    detail: `
### The Problem
Original structure scattered components across global folders:
- Cesium viewer in global Zustand store
- Components mixed with other routes
- Duplicate folder names (app/cesium-utils + components/cesium)
- No clear feature boundaries
- Impossible to transplant to other projects

### Organizational Driver
Work requirement: services must be portable between projects with 
same framework. Entire feature should be self-contained and 
transplantable without breaking other routes.

### Refactoring Strategy

**1. Private Folder Pattern (Framework Concern)**
- _components/: Route-specific UI components
- _contexts/: Route-scoped React Context providers
- _utils/: Centralized API configuration
- _layouts/: Layout components for structure
- [api]/: Dynamic routes for each Cesium utility demo

**2. State Management Shift (State Concern)**
- FROM: Global Zustand store for viewer
- TO: Route-scoped React Context (useViewer, useCesiumUtils)
- WHY: Viewer only needed within cesium-utils route
- BENEFIT: Automatic cleanup when leaving route

**3. Centralized Configuration (State Concern)**
- Single source of truth: _utils/api.ts
- All API definitions in one place
- Components consume config, don't define it
- Easy to add/remove APIs without touching components

**4. High Cohesion (Organizational Concern)**
- All related code in single route folder
- Minimal external dependencies
- Duplicated code allowed to maintain independence
- DRY principle relaxed for portability

**5. Lazy Loading (Performance Concern)**
- Cesium imports only when route accessed
- Reduced First Contentful Paint for non-users
- Bundle optimization through route-based code splitting

### Before/After Structure

    BEFORE:
    ├── app/cesium-utils/
    │   ├── page.tsx
    │   └── layout.tsx
    ├── components/cesium/          # Scattered
    ├── contexts/                   # Mixed with other routes
    └── lib/stores/                 # Global Zustand

    AFTER:
    └── app/cesium-utils/
      ├── _components/            # Feature-isolated
      ├── _contexts/              # Route-scoped
      │   ├── viewer.tsx          # React Context for viewer
      │   └── cesium-utils.tsx    # React Context for features
      ├── _layouts/               # Layout separation
      ├── _utils/
      │   └── api.ts              # Centralized config
      ├── [api]/page.tsx          # Dynamic routing
      ├── page.tsx
      └── layout.tsx              # Provides contexts

### Key Decisions

**Why Context over Zustand?**
- Viewer state only relevant within cesium-utils route
- No need for global accessibility
- Automatic cleanup on route exit
- Better encapsulation

**Why Private Folders?**
- Next.js feature: folders starting with _ not exposed as routes
- Solves duplicate naming problem
- Clear signal: "internal to this route"
- Enables high cohesion without polluting URL structure

**Why Centralized API Config?**
- APIs frequently added/removed during development
- Components shouldn't know about all APIs
- Single file update for new API vs touching multiple components
- State management delegated to configuration layer

**Why Allow Code Duplication?**
- Portability > DRY principle
- Changes in one route don't break others
- Feature can be copy-pasted to other projects
- Independence more valuable than shared code

### Concerns Addressed

1. **Framework Concerns**: Private folder pattern
2. **Organizational Concerns**: Portability, self-containment
3. **State Concerns**: Route-scoped context, centralized config
4. **Layout Concerns**: Separated structural components
5. **Performance Concerns**: Lazy loading, bundle optimization

### Results

- Complete feature isolation
- Transplantable to other projects (tested: works with copy-paste)
- No global state pollution
- Easier API additions (single file change)
- Improved bundle size (lazy loading)
- Clear mental model (everything in one place)

### Related Article
["Separation of Concerns in Frontend Development"](/blog/separation-of-concerns)
`,
  },
  {
    title: "Testing Framework Migration",
    description:
      "Migrated from Jest to Vitest for unit tests, added Playwright for E2E testing",
    date: "2025-09-28",
    category: "Infrastructure",
    tags: ["Testing", "Vitest", "Playwright", "DX"],
    detail: `
### Motivation
- Complex configuration of Jest
- Missing E2E coverage

### Changes
- **Unit/Integration**: Jest → Vitest
- **E2E**: Added Playwright
- **Coverage**: Built-in coverage tools

### Benefits
- Simplified test configuration
- Better ESM support
- E2E coverage for critical flows
- Improved developer experience

### Challenges
- Migration of existing tests
- Learning Playwright patterns
- CI/CD pipeline updates
  `,
  },
  {
    title: "Timeline Implementation",
    description:
      "Designed and implemented timeline for the project. Inspired by monolith from 2001: A Space Odyssey.",
    date: "2025-10-13",
    category: "Architecture",
    tags: ["ADR", "Component", "Timeline", "Design"],
    detail: `
### The Timeline Component

Inspired by monolith from 2001: A Space Odyssey.
`,
  },
];
