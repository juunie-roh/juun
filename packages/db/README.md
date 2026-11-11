# @juun/db

Database package for the Juun monorepo. It wraps the Prisma client (PostgreSQL via `@prisma/adapter-pg`) and exposes framework-agnostic, namespaced queries for each entity.

## Installation

This package is already installed as a workspace dependency. To use it in any app or package:

```json
{
  "dependencies": {
    "@juun/db": "workspace:^"
  }
}
```

The package is built with `tsup` and consumers import from `dist/`, so it must be built before use. `turbo build` and `turbo dev` handle this automatically (`build` depends on `^build`, and `dev` runs `tsup --watch`).

## Usage

### Namespaced queries (recommended)

Each entity has its own entry point. Queries are grouped as `entity.operation.method`, and every read takes an optional `locale` (default `ko`, falling back to Korean when a translation is missing).

```typescript
import post from "@juun/db/post";
import timeline from "@juun/db/timeline";

const posts = await post.select.all("en");               // all posts, without content
const tagged = await post.select.byTags(["docker"]);     // posts having the tags
const notes = await post.select.byCategory("FIELD_NOTES");
const single = await post.select.byId(1, "ko");          // one post, with content
const created = await post.create.one(input);            // create a post with translations

const items = await timeline.select.all("desc", "en");   // all timeline items, without detail
const item = await timeline.select.byId(1);              // one timeline item, with detail
```

In the Next.js app, prefer the cached wrappers in `apps/web/lib/cache`, which mirror this API.

### Prisma client and types

```typescript
import { prisma, Locale, PostCategory, TimelineCategory } from "@juun/db";
import type { OrderBy, SortOrder } from "@juun/db";

const tags = await prisma.tag.findMany();
```

`@juun/db/client` exports only the `prisma` singleton.

## Schema

The schema is at `packages/db/prisma/schema.prisma`.

- **Content:** `post` and `timeline`, each with a `*_translation` table (per `Locale`: `ko`, `en`) and a `*_tag` junction table to the shared `tag` table.
- **Enums:** `PostCategory` (`ANALYSIS`, `CASE_STUDY`, `FIELD_NOTES`, `OPINION`), `TimelineCategory` (`PERFORMANCE`, `ARCHITECTURE`, `FOUNDATION`, `INFRASTRUCTURE`, `EXPERIMENT`), `Locale`.
- **Auth:** `User`, `Session`, `Account` and `Verification`, used by Better Auth in the web app.

## Available Scripts

Run these from the repo root with `pnpm db <script>`:

```bash
pnpm db generate   # Generate Prisma Client (also runs on postinstall)
pnpm db push       # Push schema changes to the database (the project's primary workflow)
pnpm db pull       # Pull schema from the database
pnpm db studio     # Open Prisma Studio (database GUI)
pnpm db migrate    # prisma migrate dev (not used by this project, which relies on db push)
pnpm db build      # Generate the client and build dist/ with tsup
```

## Environment Variables

The package needs `DATABASE_URL`. `prisma.config.ts` loads it from `packages/db/.env` (via `dotenv`), and the client reads it from the environment of whichever app imports it, so the web app needs it in `apps/web/.env` as well:

```text
DATABASE_URL=postgres://user:password@host:port/database
```

The client always sets `sslmode=verify-full` on the connection URL.

## Singleton Pattern

The Prisma client is cached on `globalThis` outside production, so HMR in development doesn't create extra connection pools. Always import the shared `prisma` instance and never create a new `PrismaClient`.
