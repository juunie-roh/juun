# Juun

[English](./README.md) | [Korean](./README.ko.md)

[![Live Site](https://img.shields.io/badge/Live-juun.vercel.app-blue?style=flat-square)](https://juun.vercel.app)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-16-000000?style=flat-square&logo=next.js)](https://nextjs.org/)

> **A self-documenting knowledge system where the development process is the content.**

이 프로젝트는 다양한 도메인(기술 구현, editorial design, 정보 및 지식 전달 구조 설계 등)에 걸친 architectural thinking 을 드러내기 위해 설계되었습니다.
모든 결정과 실험을 기록 및 추적하며 프로젝트 자체가 포트폴리오이자 배움을 위한 실험실입니다.

🌐 [Live Site](https://juun.vercel.app) · 📝 [Blog Articles](https://juun.vercel.app/blog) · 🎮 [Playground](https://juun.vercel.app/playground) · 📊 [Timeline](https://juun.vercel.app/#timeline)

---

## Philosophy

> **자세한 내용을 알고 싶으시다면** [Software Architecture](https://juun.vercel.app/ko/blog/9) — thinking process 를 나타내기 위해 어떤 구조를 택했는지 다룬 글을 읽어보세요.

완성된 결과물을 나열한 일반적인 포트폴리오와는 달리, 이 프로젝트는 소프트웨어 개발을 연구 분야(knowledge discipline)처럼 취급합니다:

- 평범할 수 있는 기능의 개발도 배경 및 과정을 타임라인에 기록합니다.
- 그 과정에서 조사가 필요하거나 개념적 이해가 필요한 부분은 블로그 글 형태로 기록합니다.
- 정량적 측정을 통해 의사결정 기반에 대한 증거를 수집합니다.

결과적으로, 이 프로젝트는 _무엇_ 을 만들었냐를 나열하기보다, _어떻게_ 만들었는지, 그 의사결정 과정을 나타냅니다.

---

## Key Features

### 📊 Decision Records (Timeline)

정량적 측정 값을 포함한 21+ 개의 architectural decision records:

- 번들 크기의 66-72% 감소
- 34% Docker 이미지 크기 최적화
- 19% HTML 크기 감소
- 결정 번복 사례 기록 (MFE reversal, ui package 등)

### 📝 Technical Articles

블로그 글들은 기술 및 아키텍쳐에 대한 심층 분석을 기록합니다:

- Infrastructure (Docker, CI/CD, npm 패키지 관리)
- Performance (번들 최적화, lazy loading)
- Architecture (MFE 비판, 프론트엔드에서의 관심사 분리 원칙 등)
- Bilingual: 한국어 및 영어, 이중 언어 지원

### 🌐 Internationalization

- 이중 언어 컨텐츠 (한국어 및 영어)
- 관계 테이블을 사용한 데이터베이스 기반 이중 언어 컨텐츠 제공
- Canonical URL들과 language alternates 를 사용한 SEO 최적화
- 지역화를 고려한 formatting

### 🎮 Interactive Playground

- **Markdown Input Renderer**: 마크다운 형식의 컨텐츠가 렌더링된 결과물을 실시간으로 확인
- **Cesium Utils Demo**: [@juun-roh/cesium-utils](https://www.npmjs.com/package/@juun-roh/cesium-utils) npm 패키지 쇼케이스
- **3D Graphics**: Three.js + Cannon 물리 엔진 시뮬레이션
- **UI Experiments**: 커스텀 UI 컴포넌트 (Wheel, Marquee)

### 🏗️ Production-Grade Architecture

- PNPM workspace 와 Turborepo 를 활용한 모노레포 구조
- 프레임워크에 종속되지 않은 데이터베이스 레이어 (`@juun/db`)
- `"use cache"` 선언을 포함한 Next.js 16 캐시 레이어
- Parallel routes + intercepting routes 를 활용한 dialog 표시
- 통합 테스트 환경 (Vitest + Storybook + Playwright)

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
| **Cache 분리** | Pure DB layer + Next.js cache wrappers |
| **Translation fallback** | locale 부재 시 기본 설정으로 한국어 사용 |
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

- Node.js 24.x 또는 26.x (CI 과정에서 테스트 진행 중인 버전들)
- PNPM 10.28.1 이상

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

# Start development server
pnpm dev
```

[http://localhost:3000](http://localhost:3000) 에서 실행 확인

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

_All optimizations documented in [Timeline](https://juun.vercel.app/#timeline) entries #4, #5, #7, #14._

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

> Every decision documented. Every experiment measured. Every failure owned.
