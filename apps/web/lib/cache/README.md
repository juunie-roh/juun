# Cache Layer

This directory contains Next.js caching wrappers for database queries using Next.js 16's `"use cache"` directive.

## Why This Layer Exists

The `@juun/db` package provides pure Prisma queries without any framework dependencies. However, in Next.js applications, we want to cache these queries to avoid re-fetching on every page load.

This cache layer:

- ✅ Wraps `@juun/db` queries with Next.js 16's `"use cache"` directive
- ✅ Provides consistent cache configuration across the app
- ✅ Keeps `@juun/db` framework-agnostic (can be used in other apps)
- ✅ Enables easy cache invalidation with tags
- ✅ Mirrors the same namespace structure as `@juun/db` for consistency

## Architecture

```text
@juun/db (packages/db)
    ↓
  Pure Prisma queries (no caching, framework-agnostic)
    ↓
Cache Layer (apps/web/lib/cache)
    ↓
  Next.js cached wrappers (same API structure)
    ↓
Server Components (app/*)
```

### Namespace Structure

Both `@juun/db` and `@/lib/cache` follow the same namespace pattern:

```typescript
// @juun/db structure
import post from "@juun/db/post";
await post.select.all();
await post.select.byId(1);

// @/lib/cache structure (same API!)
import cache from "@/lib/cache";
await cache.post.select.all();      // Cached version
await cache.post.select.byId(1);    // Cached version
await cache.post.create.one(input); // Write + invalidate "posts"
await cache.post.revalidate();      // Cache invalidation
```

`lib/cache/index.ts` also re-exports the `@juun/db/post` and `@juun/db/timeline` types, so pages can import types such as `Post` from `@/lib/cache`.

## Usage

### In Server Components

Every query takes an optional `locale` (defaults to `routing.defaultLocale`, `ko`).

```typescript
import cache from "@/lib/cache";

// Get all posts for a locale (cached with the "weeks" preset)
const posts = await cache.post.select.all(locale);

// Other post queries
const tagged = await cache.post.select.byTags(["docker"], locale);
const notes = await cache.post.select.byCategory("FIELD_NOTES", locale);

// Get post by id
const post = await cache.post.select.byId(1, locale);

if (!post) {
  notFound();
}

// Timeline (order defaults to "desc")
const items = await cache.timeline.select.all("desc", locale);
const item = await cache.timeline.select.byId(1, locale);
```

### Cache Invalidation

```typescript
// Method 1: Using cache helper
import cache from "@/lib/cache";
await cache.post.revalidate();
await cache.timeline.revalidate();

// Method 2: Using Next.js directly
import { revalidateTag, updateTag } from "next/cache";
revalidateTag("posts", "max");  // Stale-while-revalidate for all post queries
updateTag("posts");             // Server Actions only: expire now (read-your-own-writes)
```

Writes through `cache.post.create.one()` invalidate the `"posts"` tag automatically. The admin page's temporary "revalidate all" action (`app/[locale]/admin/_actions/revalidate-all.ts`) uses `updateTag` on both tags for content inserted directly into the database.

## Adding New Cached Entities

Follow this pattern to add caching for other database entities:

### Step 1: Create Cache Directory

Create `lib/cache/{entity}/` directory structure:

**`lib/cache/{entity}/select.ts`:**

```typescript
import type { Locale } from "@juun/db";
import entityQuery from "@juun/db/{entity}";
import { cacheLife, cacheTag } from "next/cache";

import { routing } from "@/i18n/routing";

const DEFAULT_LOCALE: Locale = routing.defaultLocale;

export async function all(locale: Locale = DEFAULT_LOCALE) {
  "use cache";
  cacheLife("weeks");
  cacheTag("{entities}", `{entities}-${locale}`);
  return await entityQuery.select.all(locale);
}

export async function byId(id: number, locale: Locale = DEFAULT_LOCALE) {
  "use cache";
  cacheLife("weeks");
  cacheTag("{entities}", `{entity}-${id}`, `{entity}-${id}-${locale}`);
  return await entityQuery.select.byId(id, locale);
}
```

**`lib/cache/{entity}/index.ts`:**

```typescript
import * as select from "./select";

export { select };

export async function revalidate() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("{entities}", "max");
}
```

### Step 2: Update Index

Add to `lib/cache/index.ts`:

```typescript
import * as {entity} from "./{entity}";

export type * from "@juun/db/{entity}";
export default { post, timeline, {entity} };
```

### Step 3: Use in Components

```typescript
import cache from "@/lib/cache";

const entities = await cache.{entity}.select.all(locale);
const entity = await cache.{entity}.select.byId(1, locale);
await cache.{entity}.revalidate();
```

## Cache Configuration

### Default Configuration

| Setting | Value | Description |
| --------- | ------- | ------------- |
| `cacheLife` | `"weeks"` | Revalidate after 1 week, expire after 30 days |
| `tags` | Entity, locale and item tags | For cache invalidation |

### Cache Tags by Entity

| Entity | Query | Tags |
| -------- | ------ | --------- |
| `post` | `all` | `posts`, `posts-{locale}` |
| `post` | `byTags` | `posts`, `posts-{locale}`, each tag name |
| `post` | `byCategory` | `posts`, `posts-{locale}`, the category |
| `post` | `byId` | `posts`, `post-{id}`, `post-{id}-{locale}` |
| `timeline` | `all` | `timelines`, `timelines-{locale}`, the order |
| `timeline` | `byId` | `timelines`, `timeline-{id}`, `timeline-{id}-{locale}` |

Invalidating `posts` or `timelines` clears every query for that entity.

### Customizing Cache Duration

Use Next.js 16's `cacheLife()` presets or a custom profile:

```typescript
"use cache";
cacheLife("seconds");  // revalidate 1s,   expire 1 min
cacheLife("minutes");  // revalidate 1 min, expire 1 h
cacheLife("hours");    // revalidate 1 h,  expire 1 day
cacheLife("days");     // revalidate 1 day, expire 1 week
cacheLife("weeks");    // revalidate 1 week, expire 30 days (used by this project)
cacheLife("max");      // revalidate 30 days, expire 1 year

// Custom profile (seconds)
cacheLife({ stale: 300, revalidate: 3600, expire: 86400 });
```

## When NOT to Use This Layer

**Don't cache:**

- ❌ User-specific data (auth state, preferences)
- ❌ Real-time data (chat, notifications, live updates)
- ❌ Data that changes frequently (< 1 minute)
- ❌ Data with user permissions/row-level security

**Instead use:**

- Direct `@juun/db` queries (always fresh)
- React Query with API routes (client-side caching)
- Server Actions with no caching
- Session/cookie storage for user data

## Advanced Patterns

### Per-Item Cache Tags

Each `byId` query carries item-specific tags for fine-grained control:

```typescript
import { revalidateTag } from "next/cache";

revalidateTag("post-1", "max");     // Only post 1, every locale
revalidateTag("post-1-en", "max");  // Only the English version of post 1
revalidateTag("posts-ko", "max");   // Korean list queries
revalidateTag("posts", "max");      // All post queries
```

### Conditional Caching

```typescript
import cache from "@/lib/cache";
import db from "@juun/db/post";

export const getPost = async (id: number, useCache = true) =>
  useCache
    ? await cache.post.select.byId(id)
    : await db.select.byId(id);
```

## Debugging & Monitoring

### Enable Cache Logging

```bash
# Development
NEXT_PRIVATE_DEBUG_CACHE=1 pnpm dev

# Production
NEXT_PRIVATE_DEBUG_CACHE=1 pnpm start
```

### Check Cache Hit Rate

Monitor your logs for:

- `CACHE HIT` - Query served from cache
- `CACHE MISS` - Query executed against database

### Verify Cache Invalidation

```typescript
// In a Server Action
"use server";
import { updateTag } from "next/cache";

export async function invalidatePosts() {
  console.log("Invalidating posts cache...");
  updateTag("posts");
  console.log("Cache invalidated!");
}
```

## File Structure

```text
lib/cache/
├── index.ts                # Main export (cache namespace + db type re-exports)
├── post/                   # Post cache directory
│   ├── index.ts            # Post exports (select, create, revalidate)
│   ├── select.ts           # Cached post.select queries (all, byTags, byCategory, byId)
│   └── create.ts           # post.create.one + "posts" invalidation
├── timeline/               # Timeline cache directory
│   ├── index.ts            # Timeline exports (select, revalidate)
│   └── select.ts           # Cached timeline.select queries (all, byId)
└── README.md               # This file
```

## Best Practices

1. **Mirror DB Structure** - Keep the same namespace structure as `@juun/db`
2. **Consistent Tags** - Use plural entity names for entity tags (`"posts"`, `"timelines"`) and add locale tags
3. **Use `cacheLife()` Presets** - Prefer built-in presets (`"weeks"`, `"days"`) over custom durations
4. **Per-Item Tags** - Add item-specific tags (e.g., `post-${id}`) for granular invalidation
5. **Document Cache Duration** - Comment why specific durations are chosen
6. **Invalidate on Write** - Wrap mutations (like `create.one`) so they invalidate their entity tag
7. **Monitor Performance** - Use cache debugging in development
8. **Organize by Directory** - Group related cache functions in subdirectories (`post/`, `timeline/`)

## Migration Guide

### Before (Direct DB Queries)

```typescript
import post from "@juun/db/post";

export default async function Page() {
  const posts = await post.select.all(); // Re-fetches every request
}
```

### After (Cached Queries)

```typescript
import cache from "@/lib/cache";

export default async function Page() {
  const posts = await cache.post.select.all(); // Cached ("weeks" preset)
}
```

## References

- [Next.js 16 Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [`"use cache"` Directive](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [`cacheLife()` API](https://nextjs.org/docs/app/api-reference/functions/cacheLife)
- [`cacheTag()` API](https://nextjs.org/docs/app/api-reference/functions/cacheTag)
- [`revalidateTag()` API](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [`updateTag()` API](https://nextjs.org/docs/app/api-reference/functions/updateTag)
- [@juun/db Package](../../../../packages/db/README.md)
