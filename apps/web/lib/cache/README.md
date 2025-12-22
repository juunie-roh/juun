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
await post.get.all();
await post.get.byId(1);

// @/lib/cache structure (same API!)
import cache from "@/lib/cache";
await cache.post.get.all();      // Cached version
await cache.post.get.byId(1);    // Cached version
await cache.post.revalidate();   // Cache invalidation
```

## Usage

### In Server Components

```typescript
import cache from "@/lib/cache";

// Get all posts (cached for 1 hour)
const posts = await cache.post.get.all();

// Get post by id (cached for 1 hour)
const post = await cache.post.get.byId(1);

if (!post) {
  notFound();
}
```

### Cache Invalidation

```typescript
// Method 1: Using cache helper (recommended)
import cache from "@/lib/cache";
await cache.post.revalidate();
await cache.timeline.revalidate();

// Method 2: Using Next.js directly
import { revalidateTag } from "next/cache";
revalidateTag("posts", "max");      // Invalidate all post queries
revalidateTag("timelines", "max");  // Invalidate all timeline queries
```

## Adding New Cached Entities

Follow this pattern to add caching for other database entities:

### Step 1: Create Cache Directory

Create `lib/cache/{entity}/` directory structure:

**`lib/cache/{entity}/get.ts`:**

```typescript
import entityQuery from "@juun/db/{entity}";
import { cacheLife, cacheTag } from "next/cache";

export async function all() {
  "use cache";
  cacheLife("hours");
  cacheTag("{entities}");
  return await entityQuery.get.all();
}

export async function byId(id: number) {
  "use cache";
  cacheLife("hours");
  cacheTag("{entities}", `{entity}-${id}`);
  return await entityQuery.get.byId(id);
}
```

**`lib/cache/{entity}/index.ts`:**

```typescript
import * as get from "./get";

export { get };

export async function revalidate() {
  const { revalidateTag } = await import("next/cache");
  revalidateTag("{entities}", "max");
}

export const CACHE_CONFIG = {
  revalidate: 3600,
  staleTime: 3_600_000,  // 1 hour in milliseconds
  tags: ["{entities}"],
};
```

### Step 2: Update Index

Add to `lib/cache/index.ts`:

```typescript
import * as {entity} from "./{entity}";

export default { post, timeline, {entity} };
```

### Step 3: Use in Components

```typescript
import cache from "@/lib/cache";

const entities = await cache.{entity}.get.all();
const entity = await cache.{entity}.get.byId(1);
await cache.{entity}.revalidate();
```

## Cache Configuration

### Default Configuration

| Setting | Value | Description |
| --------- | ------- | ------------- |
| `cacheLife` | `"hours"` (1 hour) | Cache lifetime preset |
| `staleTime` | 3,600,000 ms (1 hour) | Maximum stale time |
| `tags` | Entity-specific | For cache invalidation |

### Cache Tags by Entity

| Entity | Tags | Purpose |
| -------- | ------ | --------- |
| `post` | `["posts"]` | Invalidate all post queries |
| `timeline` | `["timelines"]` | Invalidate all timeline queries |

### Customizing Cache Duration

Use Next.js 16's `cacheLife()` presets or custom durations:

```typescript
// Using presets
"use cache";
cacheLife("seconds");  // 1 second
cacheLife("minutes");  // 5 minutes
cacheLife("hours");    // 1 hour (default for this project)
cacheLife("days");     // 7 days
cacheLife("weeks");    // 4 weeks
cacheLife("max");      // Indefinite (manual revalidation only)

// Custom configuration
export const CACHE_CONFIG = {
  revalidate: 60,         // Revalidate after 60 seconds
  staleTime: 60_000,      // Serve stale for 60 seconds
  tags: ["{entities}"],   // Cache tags for invalidation
};
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

For fine-grained cache control, use multiple tags:

```typescript
export async function byId(id: number) {
  "use cache";
  cacheLife("hours");
  cacheTag("posts", `post-${id}`);  // Multiple tags for granular control
  return await postQuery.get.byId(id);
}

// Invalidate specific post
import { revalidateTag } from "next/cache";
revalidateTag("post-1", "max");  // Invalidate only post with id=1

// Invalidate all posts
revalidateTag("posts", "max");   // Invalidate all posts
```

### Conditional Caching

```typescript
import cache from "@/lib/cache";
import db from "@juun/db/post";

export const getPost = async (id: number, useCache = true) =>
  useCache
    ? await cache.post.get.byId(id)
    : await db.get.byId(id);
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
// In API route or Server Action
import { revalidateTag } from "next/cache";

export async function POST() {
  console.log("Invalidating posts cache...");
  revalidateTag("posts", "max");  // "max" scope for maximum invalidation
  console.log("Cache invalidated!");

  return Response.json({ success: true });
}
```

## File Structure

```text
lib/cache/
├── index.ts                # Main export (cache namespace)
├── post/                   # Post cache directory
│   ├── index.ts            # Post exports (get, revalidate, CACHE_CONFIG)
│   └── get.ts              # Cached post.get queries (all, byId)
├── timeline/               # Timeline cache directory
│   ├── index.ts            # Timeline exports (get, revalidate, CACHE_CONFIG)
│   └── get.ts              # Cached timeline.get queries (all, byId)
└── README.md               # This file
```

## Best Practices

1. **Mirror DB Structure** - Keep the same namespace structure as `@juun/db`
2. **Consistent Tags** - Use plural entity names for tags (`"posts"`, `"timelines"`)
3. **Use `cacheLife()` Presets** - Prefer built-in presets (`"hours"`, `"days"`) over custom durations
4. **Per-Item Tags** - Add item-specific tags (e.g., `post-${id}`) for granular invalidation
5. **Document Cache Duration** - Comment why specific durations are chosen
6. **Test Invalidation** - Verify cache clears after mutations with `"max"` scope
7. **Monitor Performance** - Use cache debugging in development
8. **Organize by Directory** - Group related cache functions in subdirectories (`post/`, `timeline/`)

## Migration Guide

### Before (Direct DB Queries)

```typescript
import post from "@juun/db/post";

export default async function Page() {
  const posts = await post.get.all(); // Re-fetches every request
}
```

### After (Cached Queries)

```typescript
import cache from "@/lib/cache";

export default async function Page() {
  const posts = await cache.post.get.all(); // Cached for 1 hour
}
```

## References

- [Next.js 16 Caching](https://nextjs.org/docs/app/building-your-application/caching)
- [`"use cache"` Directive](https://nextjs.org/docs/app/api-reference/directives/use-cache)
- [`cacheLife()` API](https://nextjs.org/docs/app/api-reference/functions/cacheLife)
- [`cacheTag()` API](https://nextjs.org/docs/app/api-reference/functions/cacheTag)
- [`revalidateTag()` API](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [@juun/db Package](../../../../packages/db/README.md)
