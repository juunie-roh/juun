# Cache Layer

This directory contains Next.js caching wrappers for database queries.

## Why This Layer Exists

The `@juun/db` package provides pure Prisma queries without any framework dependencies. However, in Next.js applications, we want to cache these queries to avoid re-fetching on every page load.

This cache layer:

- ✅ Wraps `@juun/db` queries with Next.js `unstable_cache`
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
import db from "@juun/db/post";
db.get.all();
db.get.byId(1);

// @/lib/cache structure (same API!)
import cache from "@/lib/cache";
cache.post.get.all();      // Cached version
cache.post.get.byId(1); // Cached version
cache.post.revalidate();   // Cache invalidation
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
// Method 1: Using cache helper
import cache from "@/lib/cache";
await cache.post.revalidate();

// Method 2: Using Next.js directly
import { revalidateTag } from "next/cache";
revalidateTag("posts");
```

## Adding New Cached Entities

Follow this pattern to add caching for other database entities:

### Step 1: Create Cache File

Create `lib/cache/{entity}.ts`:

```typescript
/**
 * {Entity} cache layer
 *
 * Provides Next.js-cached wrappers around @juun/db/{entity} queries.
 * Mirrors the same namespace structure for API consistency.
 */

import entityQuery from "@juun/db/{entity}";
import { unstable_cache } from "next/cache";

const CACHE_CONFIG = {
  revalidate: 3600, // 1 hour
  tags: ["{entities}"],
};

namespace {entity} {
  export namespace get {
    export const all = unstable_cache(
      async () => entityQuery.get.all(),
      ["{entities}-all"],
      CACHE_CONFIG,
    );

    export const byId = unstable_cache(
      async (id: number) => entityQuery.get.byId(id),
      ["{entity}-by-id"],
      CACHE_CONFIG,
    );
  }

  export async function revalidate() {
    const { revalidateTag } = await import("next/cache");
    revalidateTag("{entities}");
  }
}

export default {entity};
```

### Step 2: Update Index

Add to `lib/cache/index.ts`:

```typescript
import {entity}Cache from "./{entity}";

namespace cache {
  export import post = postCache;
  export import {entity} = {entity}Cache; // Add this line
}

export default cache;
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
|---------|-------|-------------|
| `revalidate` | 3600 seconds (1 hour) | Cache lifetime |
| `tags` | Entity-specific | For cache invalidation |

### Cache Tags by Entity

| Entity | Tags | Purpose |
|--------|------|---------|
| `post` | `["posts"]` | Invalidate all post queries |
| `user` | `["users"]` | Invalidate all user queries |

### Customizing Cache Duration

Adjust `revalidate` based on data volatility:

```typescript
const CACHE_CONFIG = {
  revalidate: 60,    // 1 minute - frequently updated data
  revalidate: 3600,  // 1 hour - moderate updates (default)
  revalidate: 86400, // 24 hours - rarely updated data
  revalidate: false, // Never revalidate (manual only)
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

### Per-Parameter Cache Keys

For fine-grained cache control:

```typescript
export const byId = (id: number) =>
  unstable_cache(
    async () => postQuery.get.byId(id),
    [`post-${id}`], // Unique key per id
    {
      revalidate: 3600,
      tags: ["posts", `post-${id}`], // Multiple tags
    }
  )();

// Invalidate specific post
import { revalidateTag } from "next/cache";
revalidateTag("post-npm-packages");

// Invalidate all posts
revalidateTag("posts");
```

### Conditional Caching

```typescript
export const getPost = (id: number, useCache = true) =>
  useCache
    ? cache.post.get.byId(id)
    : db.post.get.byId(id);
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
  revalidateTag("posts");
  console.log("Cache invalidated!");

  return Response.json({ success: true });
}
```

## File Structure

```text
lib/cache/
├── index.ts           # Main export (cache namespace)
├── post.ts            # Post queries cache
├── user.ts            # User queries cache (example)
└── README.md          # This file
```

## Best Practices

1. **Mirror DB Structure** - Keep the same namespace structure as `@juun/db`
2. **Consistent Tags** - Use plural entity names for tags (`"posts"`, `"users"`)
3. **Document Cache Duration** - Comment why specific durations are chosen
4. **Test Invalidation** - Verify cache clears after mutations
5. **Monitor Performance** - Use cache debugging in development

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

- [Next.js Data Cache](https://nextjs.org/docs/app/building-your-application/caching#data-cache)
- [unstable_cache API](https://nextjs.org/docs/app/api-reference/functions/unstable_cache)
- [revalidateTag API](https://nextjs.org/docs/app/api-reference/functions/revalidateTag)
- [@juun/db Package](../../../../packages/db/README.md)
