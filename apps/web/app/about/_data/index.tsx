import { TimelineItem } from "../_components/timeline";

export const TIMELINE_ITEMS: TimelineItem[] = [
  {
    id: 1,
    title: "Project Inception",
    description:
      "Initial commit with standard single Next.js application, including various development tools and Yarn Berry PnP.",
    detail: `
### Situation

This is the foundation of the project: a single Next.js application with Yarn Berry PnP. 
A trial of modern toolchains, which I knew and found useful at that time.`,
    date: "2024-09-27",
    category: "Foundation",
    tags: ["Next.js", "TypeScript", "Yarn Berry", "PnP"],
  },
  {
    id: 2,
    title: "Monorepo Architecture",
    description:
      "Restructured from single Next.js app to monorepo with shared packages",
    date: "2025-03-04",
    category: "Architecture",
    tags: ["ADR", "Monorepo", "Yarn Berry", "Architecture", "Scalability"],
    detail: `
### Situation

Came across the concept of monorepo, and got curious about it.
Yarn Berry supports \`workspace\`, enabling monorepo management, and it seemed quite simple to implement.
As an exploration of technology, I decided to try it out and experiment.`,
  },
  {
    id: 3,
    title: "Package Manager Migration",
    description:
      "Migrated from Yarn Berry PnP to PNPM due to Next.js standalone and Vercel monorepo incompatibility",
    date: "2025-03-20",
    category: "Infrastructure",
    tags: [
      "Article",
      "Yarn Berry",
      "PNPM",
      "Package Manager",
      "Monorepo",
      "Turborepo",
    ],
    detail: `
### Situation

Encountered critical issues with Yarn Berry PnP while trying to deploy this project on Vercel.
Vercel's deployment environment builds based on traditional \`node_modules\` directories.
This required additional configurations to properly build with Yarn Berry's Zip File System, forcing the build system to reference the \`.pnp.cjs\` file during build.
I found additional problems with the Next.js standalone build option, where bundling dependent modules failed with Yarn Berry ZipFS.

### Task

- Migrate package manager from Yarn Berry to PNPM, maintaining monorepo configurations

### Action

#### 1. Package Manager Migration

- Removed Yarn Berry configuration (\`.yarnrc.yml\`, \`.pnp.cjs\`)
- Installed PNPM and configured workspace protocol
- Updated all \`package.json\` workspace references

#### 2. Build System Updates

- Modified Docker image build for PNPM
- Updated CI/CD pipeline (GitHub Actions)
- Configured Vercel build settings for PNPM
- Verified the standalone build option

#### 3. Monorepo Configuration

- Migrated from Yarn workspaces to PNPM workspaces
- Updated Turborepo configuration
- Verified workspace dependency resolution

### Result

Lost zero-install advantage, but the project build became compatible with Vercel's deployment environment and the Next.js standalone build option.
Additionally, the Docker image size reduced from over 1GB to 346MB.

### Related Article
["Yarn Berry PnP Configuration"](/blog/1)
`,
  },
  {
    id: 4,
    title: "Bundle Optimization",
    description:
      "Achieved 66-72% bundle size reduction through strategic lazy loading and dependency analysis",
    date: "2025-06-20",
    category: "Performance",
    tags: ["Article", "Performance", "Bundle", "Optimization", "Lazy Loading"],
    detail: `
### Situation

Found \`First Load JS\` size bloat after \`cesium\` integration. From the build result, every page was requiring over 2MB of JS.
Vercel Speed Insights dashboard was showing FCP (First Contentful Paint) peaks of up to 10 seconds.

### Task

- Identify the root cause of performance degradation and improve performance.

### Action

#### 1. Measured bundle sizes with \`@next/bundle-analyzer\`

- Identified bundles required for each routes
- Configured build option with bundle analysis

#### 2. Researched about module bundling process

- Figured out how the module bundling is processed
- Detected side effects of barrel exports
- Updated UI package's export strategy from single \`index\` to individual file

#### 3. Lazy loaded heavy dependencies (Cesium, Three.js)

- Defined boundaries of bundles per routes
- Decided which to apply lazy loading and applied
- Wrapped components using heavy dependencies with lazy loading and \`Suspense\`

#### 4. Applied lightweight library variants

- Restricted languages supported from \`react-syntax-highlighter\` using lightweight variants

### Results

The blind use of barrel exports and external libraries was a major factor in the performance degradation.
The bundle size for home page dropped from 2.55 MB to 853KB, about 66% reduction. 
First contentful paint was stabilized at an average 1.2s.
This affected to the \`@juun-roh/cesium-utils\` package's modular export strategy.

### Related Article

["Bundle Optimization"](/blog/5)
  `,
  },
  {
    id: 5,
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
["Docker Image Optimization"](/blog/3)
  `,
  },
  {
    id: 6,
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
    id: 7,
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
    id: 8,
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
    id: 9,
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
    id: 10,
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
  {
    id: 11,
    title: "Serverless Database Integration",
    description:
      "Integrated Prisma ORM with Neon PostgreSQL for serverless architecture, eliminating traditional backend framework",
    date: "2025-10-20",
    category: "Architecture",
    tags: ["Database", "Prisma", "Neon", "Serverless", "Edge Computing"],
    detail: `
### Why Serverless?

Traditional backend frameworks require managing servers, scaling, and infrastructure.
This project demonstrates a modern paradigm shift: **delegating backend tasks to
distributed edge computing systems**.

### Architecture Implementation

**Database Layer**
- **ORM**: Prisma Client (type-safe queries)
- **Database**: Neon PostgreSQL (serverless, auto-scaling)
- **Connection**: Pooled connections for edge environments
- **Pattern**: Singleton preventing connection exhaustion

**Query Organization**
\`\`\`typescript
// Namespace pattern for clean API
import post from "@juun/db/queries/post";

// Type-safe, auto-complete friendly
const posts = await post.get.all();
const single = await post.get.bySlug("my-post");
\`\`\`

**Database Design**
- Normalized schema (posts, tags, categories)
- Many-to-many relations via junction tables
- Markdown content stored in PostgreSQL TEXT
- Category as ENUM (fixed vocabulary)
- Tags as dynamic table (future expansion)

### Key Benefits

**No Backend Framework Needed**
- Next.js Server Components ARE the backend
- Direct database access from components
- No separate API layer required
- Type safety from database to UI
- Reduce complexity of backend configurations

**Automatic Scaling**
- Database: Neon auto-scales compute + auto-suspends when idle
- Functions: Vercel Edge handles 0 → ∞ requests automatically
- No configuration needed

**Global Distribution**
- Code runs near users (50+ edge locations)
- Low latency worldwide
- Automatic failover

**Type Safety**
- Prisma generates types from schema
- End-to-end TypeScript inference
- Compile-time query validation

### Deployment Flow

    1. Git Push
       ↓
    2. pnpm install
       └─> postinstall: prisma generate
       └─> Generates type-safe client
       ↓
    3. Build (Turborepo)
       └─> Apps can import @juun/db/queries/post
       ↓
    4. Deploy to Edge Network
       └─> Functions distributed globally
       └─> Connect to Neon via DATABASE_URL

### Trade-offs

**Advantages**
- Zero infrastructure management
- Automatic global scaling
- Pay-per-use pricing
- Type-safe database access
- Simplified deployment
- Better DX (collocated code)

**Limitations**
- Vendor lock-in (Vercel + Neon)
- Cold start latency (minimal with edge)
- Stateless by design (no persistent connections)
- Different debugging paradigm

### Results

- Blog content migration tested from TSX files to PostgreSQL
- Type-safe queries with namespace organization
- Zero backend framework code
- Automatic scaling ready
- CI/CD includes Prisma generation
- Full end-to-end type safety

### Related Concept

This demonstrates **distributed computing as a service**:
Instead of manually setting up K8s, load balancers, and backend
frameworks, delegate the entire complexity to edge computing platforms.
Focus on business logic, not infrastructure.
`,
  },
  {
    id: 12,
    title: "Blog System Migration",
    description:
      "Migrated the blog system and routes of this project from file-based to database-driven, linked with ORM-ed queries. To provide consistent design for markdown contents, designed a custom content management system with data processing pipeline.",
    date: "2025-11-11",
    category: "Architecture",
    tags: [
      "ADR",
      "Database-Driven",
      "Markdown",
      "CMS",
      "AST",
      "Pipeline",
      "Migration",
      "Compatibility",
    ],
    detail: `
### Situation

The blog system used file-based routes with TSX components (\`/blog/[slug]/page.tsx\`).
I had to rebuild the whole project to publish an article. It was inefficient, and most of all, inconvenient.
Then, I realized markdown syntax could be applicable to this project, as many platforms support it.

### Tasks

- **Database Integration**: Leverage existing Neon PostgreSQL + Prisma infrastructure
- **Content Pipeline**: Design markdown processing pipeline with consistent styling
- **Custom Components**: Map markdown elements to Next.js optimized components (Image, Link)
- **Routing Strategy**: Migrate from slug-based to ID-based URLs
- **Backward Compatibility**: Maintain old URLs via redirects (SEO preservation)
- **Security & Performance**: Implement URL sanitization, image optimization, lazy loading

### Actions

#### Phase 1: Infrastructure Preparation

1. Designed normalized schema: \`post\` table with many-to-many \`tag\` relations via junction table
2. Created the \`@juun/db\` package: a framework-agnostic database client with namespace pattern
3. Added caching layer using \`next/cache\` to reduce database queries by ~99%
4. Structured both DB and cache APIs with consistent namespace pattern (\`post.get.all()\`, \`post.get.byId()\`)

#### Phase 2: Content Pipeline Development

5. Designed markdown processing pipeline using unified/remark/rehype ecosystem:
   - \`gray-matter\`: Extract frontmatter metadata
   - \`remark-parse\` → \`remark-gfm\` → \`remark-rehype\`: Markdown to HTML AST
   - \`rehype-raw\`: Parse raw HTML nodes
   - \`rehype-unwrap-images\`: Prevent hydration errors
   - \`rehype-react\`: Convert AST to React elements
6. Implemented custom component mappings:
   - \`<a>\` → Next.js \`Link\` (client-side navigation) / secure external links
   - \`<img>\` → Next.js \`Image\` + auto-dimension detection + AspectRatio wrapper
   - \`<pre>\` → Custom \`CodeBlock\` with syntax highlighting (PrismJS)
7. Added security layer: URL sanitization to prevent XSS attacks
8. Integrated \`Prose\` typography component for consistent content styling

#### Phase 3: Migration Execution

9. Changed routing from \`/blog/[slug]\` to \`/blog/[id]\` (simpler queries, no collision handling)
10. Converted 7 blog articles from TSX to markdown, stored in PostgreSQL
11. Implemented 7 permanent redirects (301) in \`next.config.ts\` for SEO preservation
12. Updated breadcrumb component to handle numeric IDs intelligently
13. Configured ISR with 1-hour revalidation for content freshness

### Results

#### Technical Achievements

- **Content Management**: Write markdown → publish instantly (no rebuild required)
- **Performance**: Database queries reduced ~99% via caching, images optimized automatically
- **Developer Experience**: Clean separation between content (markdown) and presentation (components)
- **Scalability**: Architecture supports future features (search, filtering, admin interface)

#### Architecture Quality

- Framework-agnostic database layer (reusable beyond Next.js)
- Production-grade error handling (fallbacks for optimization failures)
- AST-level transformations (transferable to any content processing)
- Security hardening (URL sanitization, XSS prevention)

#### Skills Demonstrated

- Data transformation pipelines (input → process → output architecture)
- AST manipulation (unified/remark/rehype ecosystem)
- Multi-library integration (coordinating 8+ libraries coherently)
- Migration considerations (backward compatibility)

### Challenges

- Image optimization required auto-dimension detection with fallback strategies
- Hydration errors needed \`rehype-unwrap-images\` plugin to prevent React mismatches
- Balancing automatic optimization with markdown authoring flexibility
`,
  },
  {
    id: 13,
    title: "Portfolio to Playground Reconstruction",
    description:
      "Redefined portfolio as playground, and migrated system from file-based dynamic routes to static routes with centralized configuration, following \`cesium-utils\` page's architectural pattern.",
    date: "2025-11-17",
    category: "Architecture",
    tags: ["ADR", "Architecture", "Next.js", "Refactoring"],
    detail: `
### Situation

The original portfolio system used file-based dynamic routes (\`[slug]\` pattern) where each project had its \`tsx\` files.
Additionally, the term "portfolio" felt too formal for experimental tech demos and learning projects.
For items that can have their own layouts for each, a dynamic routing system with unified layout was not appropriate.
To disclose the purpose of this section more clearly, rebranding and reconstruction were inevitable.

### Task

Redesign the portfolio architecture to:

1. Rebrand from "portfolio" to "playground" to better reflect the experimental nature.
2. Switch to static routing system to enable various layouts for each item.
3. Provide alternative for each item's entry point. Since no longer utilizing dynamic routing system, automatic entry point generation (previously with card component) will be lost.
4. Adopt the proven architectural pattern from \`cesium-utils\`. (private folders, centralized config)
5. Ensure type safety and prevent runtime errors from missing data

### Action

#### 1. Conceptual Rebranding

- Renamed \`/portfolio\` to \`/playground\` across the codebase.
- Updated terminology: "portfolio items" → "playground items".

#### 2. Routing System Migration

- Removed dynamic \`[slug]\` routes and individual project \`tsx\` files.
- Created static routes under \`/playground\`, enabling independent layouts per item.

#### 3. Entry Point Generation

- Created \`apps/web/app/playground/_data/index.ts\` as single source of truth, following \`cesium-utils\` pattern.
- Entry points for each playground item are sourced from centralized data, displayed by \`PlaygroundItem\` component.

#### 4. Component Architecture

- Followed existing \`cesium-utils\` pattern. Private folders for feature isolation and cohesion, with centralized item configuration.
- Built reusable \`PlaygroundItem\` component with consistent styling.
- Removed file-based routing utilities (slug generation, file-system utility).

#### 5. Type Safety Assurance

- Defined types (\`PlaygroundItem\`, \`PlaygroundCategory\`) including \`imageStyle\` prop for flexible image rendering modes.

#### 6. Content Rendering

- Reused existing markdown processing infrastructure for item descriptions.
- Server-side data transformation, client-side rendering for optimal performance.

### Result

The playground section now has a clearer purpose and improved narrative.
The complexity of adding items slightly increased by adopting static routing instead of dynamic, because automatic entry point and route generation were lost.
But at the same time, by adopting the \`cesium-utils\` pattern with centralized configurations, the overall complexity was maintained at a similar level.
Further, it freed items from fixed layout constraints, letting them have diverse layouts aligned with their own purposes.
Now it can serve static html pages as is, without framework coordination.
`,
  },
];
