/**
 * Post cache layer
 *
 * Provides dual caching strategies for @juun/db/post queries:
 * - Server-side: Next.js unstable_cache for SSR/SSG
 * - Client-side: React Query for browser-side data fetching
 *
 * Mirrors the same namespace structure as @juun/db/post for API consistency.
 *
 * @module lib/cache/post
 *
 * @example Server Component (Next.js cache)
 * ```ts
 * import cache from "@/lib/cache";
 *
 * // Get all posts (cached for 1 hour on server)
 * const posts = await cache.post.get.all();
 *
 * // Get post by id (cached for 1 hour on server)
 * const post = await cache.post.get.byId(1);
 *
 * // Revalidate all post caches
 * await cache.post.revalidate();
 * ```
 *
 * @example Client Component (React Query)
 * ```ts
 * "use client";
 * import cache from "@/lib/cache";
 *
 * function PostsByTag() {
 *   const { data, isLoading } = cache.post.get.use.byTags(["performance"]);
 *
 *   if (isLoading) return <div>Loading...</div>;
 *   return <ul>{data?.map(post => <li key={post.id}>{post.title}</li>)}</ul>;
 * }
 * ```
 *
 * @example Coordinated cache invalidation
 * ```ts
 * // Server and client caches share CACHE_CONFIG tags for coordinated invalidation
 * import cache from "@/lib/cache";
 * import { useQueryClient } from "@tanstack/react-query";
 *
 * // Server: Invalidate server-side cache
 * await cache.post.revalidate();
 *
 * // Client: Invalidate client-side cache using shared tags
 * const queryClient = useQueryClient();
 * await queryClient.invalidateQueries({ queryKey: cache.post.CACHE_CONFIG.tags });
 * ```
 *
 * @see {@link @juun/db/post} - Source database queries (uncached)
 * @see {@link lib/cache/README.md} - Cache architecture documentation
 */

import postQuery from "@juun/db/post";
import { QueryClient, useQuery } from "@tanstack/react-query";
import { unstable_cache } from "next/cache";

/**
 * Cached post queries
 *
 * This namespace mirrors @juun/db/post structure but adds dual caching strategies:
 * - `get.*` - Read operations (SELECT queries)
 *   - Direct calls: Server-side caching with Next.js unstable_cache
 *   - `get.use.*`: Client-side hooks with React Query
 *
 * Both strategies share the same underlying @juun/db/post queries but cache at different layers.
 *
 * ## Cache Coordination
 *
 * Server and client caches share the same configuration (`CACHE_CONFIG`), enabling coordinated invalidation:
 * - Server-side: Uses `tags` for Next.js cache invalidation
 * - Client-side: Uses `tags` as React Query's `queryKey` prefix
 *
 * This allows both caches to be invalidated using the same identifiers.
 */
namespace post {
  /**
   * Shared cache configuration for post queries
   *
   * Used by both Next.js unstable_cache (server) and React Query (client) to coordinate caching.
   * - `revalidate`: Cache lifetime in seconds
   * - `tags`: Cache tags for invalidation (server) and queryKey prefix (client)
   */
  export const CACHE_CONFIG = {
    revalidate: 3_600, // Server TTL
    staleTime: 3_600_000, // Client TTL (milliseconds)
    tags: ["posts"],
  };

  export type Metadata = Awaited<ReturnType<(typeof get)["all"]>>[number];
  /**
   * Read operations for retrieving posts
   *
   * Direct exports use Next.js unstable_cache for server-side caching (SSR/SSG).
   * Nested `use.*` exports are React Query hooks for client-side caching.
   *
   * @remarks
   * - Server: Direct function calls return Promises (must be awaited)
   * - Client: `use.*` hooks return React Query result objects
   */
  export namespace get {
    /**
     * Get all posts with caching
     *
     * Returns all posts without content, sorted by created_at descending.
     * Cached for 1 hour with tag "posts".
     *
     * @returns Promise resolving to array of posts (without content)
     *
     * @example
     * ```ts
     * const posts = await cache.post.get.all();
     * posts.forEach(post => console.log(post.title));
     * ```
     */
    export const all = unstable_cache(
      async () => postQuery.get.all(),
      ["posts-all"],
      CACHE_CONFIG,
    );

    /**
     * Get a single post by id with caching
     *
     * Returns full post with content and tags.
     * Each id is cached separately for 1 hour with tag "posts".
     *
     * @param id - Post id identifier
     * @returns Promise resolving to post with content, or null if not found
     *
     * @example
     * ```ts
     * const post = await cache.post.get.byId(2);
     * if (post) {
     *   console.log(post.title, post.content);
     * }
     * ```
     */
    export const byId = (id: number) =>
      unstable_cache(async () => postQuery.get.byId(id), [`post-${id}`], {
        ...CACHE_CONFIG,
        tags: [...CACHE_CONFIG.tags, `post-${id}`],
      })();

    /**
     * Client-side query hooks for retrieving posts
     *
     * Uses React Query (@tanstack/react-query) for browser-side data fetching.
     * All methods are React hooks and must follow Rules of Hooks (only call in Client Components).
     *
     * @example
     * ```ts
     * "use client";
     * import cache from "@/lib/cache";
     *
     * function PostList() {
     *   const { data: posts, isLoading, error } = cache.post.get.use.byTags(["react"]);
     *
     *   if (isLoading) return <Spinner />;
     *   if (error) return <Error message={error.message} />;
     *   return <Posts data={posts} />;
     * }
     * ```
     */
    export namespace use {
      /**
       * Get posts by tags with client-side caching
       *
       * Returns posts filtered by the specified tags.
       * Uses React Query for automatic background refetching and cache management.
       *
       * @param tags - Array of tag names to filter by
       * @returns React Query result object with data, isLoading, error, etc.
       *
       * @example
       * ```tsx
       * const { data, isLoading } = cache.post.get.use.byTags(["performance", "react"]);
       * ```
       */
      export function byTags(tags: string[]) {
        return useQuery({
          queryKey: [...CACHE_CONFIG.tags, "post-tags", ...tags],
          queryFn: async () => postQuery.get.byTags(tags),
          staleTime: CACHE_CONFIG.staleTime,
        });
      }
    }
  }

  /**
   * Invalidate server cache (rarely needed for read-only sites)
   *
   * For static/read-only sites, caches automatically revalidate based on `CACHE_CONFIG.revalidate` TTL.
   * Manual invalidation is only needed for:
   * - Development/testing (force cache refresh)
   * - On-demand revalidation after content updates (if using a CMS)
   *
   * @example Development use
   * ```ts
   * // Force refresh during development
   * await cache.post.revalidate();
   * ```
   */
  export async function revalidate() {
    "use server";
    const { revalidateTag } = await import("next/cache");
    revalidateTag("posts", "max");
  }

  /**
   * Invalidate client cache (optional UX enhancement)
   *
   * For read-only sites with long `staleTime`, this provides a manual refresh mechanism.
   * Useful for "Refresh" buttons or pull-to-refresh gestures.
   *
   * @param queryClient - React Query client instance
   *
   * @example Manual refresh button
   * ```tsx
   * "use client";
   * import { useQueryClient } from "@tanstack/react-query";
   * import cache from "@/lib/cache";
   *
   * function RefreshButton() {
   *   const queryClient = useQueryClient();
   *
   *   return (
   *     <button onClick={() => cache.post.invalidateClient(queryClient)}>
   *       Refresh Posts
   *     </button>
   *   );
   * }
   * ```
   */
  export function invalidateClient(queryClient: QueryClient) {
    return queryClient.invalidateQueries({ queryKey: CACHE_CONFIG.tags });
  }
}

export default post;
