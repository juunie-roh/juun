/**
 * Cached database queries
 *
 * This module provides Next.js-cached wrappers around @juun/db queries.
 * All exports follow the same namespace structure as @juun/db for consistency.
 *
 * @example
 * ```ts
 * import cache from "@/lib/cache";
 *
 * // Same API as @juun/db, but cached!
 * const posts = await cache.post.get.all();
 * const post = await cache.post.get.bySlug("my-slug");
 *
 * // Revalidate caches
 * await cache.post.revalidate();
 * ```
 */

import postCache from "./post";
import timelineCache from "./timeline";

namespace cache {
  export import post = postCache;
  export import timeline = timelineCache;
}

export default cache;
