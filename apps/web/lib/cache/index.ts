import postCache from "./post";
import timelineCache from "./timeline";

/**
 * Unified cache layer for database queries
 *
 * Provides dual caching strategies for @juun/db queries while maintaining namespace consistency:
 *
 * ## Architecture
 *
 * All entities follow a semantic namespace structure:
 *
 * - **`get.*`**: Read operations (SELECT queries)
 *   - **Direct calls** (e.g., `cache.post.get.all()`): Server-side caching with Next.js unstable_cache
 *     - Caches on the server for 1 hour
 *     - Used in Server Components
 *     - Returns Promises (must be awaited)
 *   - **`get.use.*`** (e.g., `cache.post.get.use.byTags()`): Client-side hooks with React Query
 *     - Caches in the browser with automatic refetching
 *     - Used in Client Components
 *     - Returns React Query result objects
 *
 * ## Usage Patterns
 *
 * Both caching strategies share the same underlying @juun/db queries but cache at different layers.
 * The namespace structure mirrors @juun/db for API consistency.
 *
 * ## Cache Coordination
 *
 * Each entity exports a shared `CACHE_CONFIG` object that both server and client caches use:
 * - **Server**: Uses `tags` for Next.js cache invalidation via `revalidateTag()`
 * - **Client**: Uses `tags` as React Query's `queryKey` prefix
 *
 * This enables coordinated invalidation across both caching layers using the same identifiers.
 *
 * @example Server Component (Next.js cache)
 * ```tsx
 * // app/blog/page.tsx
 * import cache from "@/lib/cache";
 *
 * export default async function BlogPage() {
 *   // Server-side caching with unstable_cache
 *   const posts = await cache.post.get.all();
 *   const timeline = await cache.timeline.get.all();
 *
 *   return <BlogList posts={posts} timeline={timeline} />;
 * }
 * ```
 *
 * @example Client Component (React Query)
 * ```tsx
 * // app/blog/_components/filtered-posts.tsx
 * "use client";
 * import cache from "@/lib/cache";
 *
 * export function FilteredPosts({ tags }: { tags: string[] }) {
 *   // Client-side caching with React Query (nested under get.use)
 *   const { data: posts, isLoading, error } = cache.post.get.use.byTags(tags);
 *
 *   if (isLoading) return <Spinner />;
 *   if (error) return <ErrorMessage error={error} />;
 *   return <PostGrid posts={posts} />;
 * }
 * ```
 *
 * @example Cache invalidation (server-side)
 * ```ts
 * // Server Action after mutation
 * "use server";
 * import cache from "@/lib/cache";
 *
 * export async function createPost(data: PostInput) {
 *   await db.post.create(data);
 *   await cache.post.revalidate(); // Invalidate server caches
 * }
 * ```
 *
 * @example Coordinated cache invalidation (server + client)
 * ```ts
 * // Each entity exports a shared CACHE_CONFIG for coordinated invalidation
 *
 * // Server Action
 * "use server";
 * import cache from "@/lib/cache";
 *
 * export async function createPost(data: PostInput) {
 *   await db.post.create(data);
 *   await cache.post.revalidate(); // Invalidate server cache
 *   return { success: true };
 * }
 *
 * // Client Component
 * "use client";
 * import { useQueryClient } from "@tanstack/react-query";
 * import cache from "@/lib/cache";
 *
 * function CreatePostButton() {
 *   const queryClient = useQueryClient();
 *
 *   async function handleCreate() {
 *     await createPost(data);
 *     // Invalidate client cache using shared CACHE_CONFIG tags
 *     await queryClient.invalidateQueries({
 *       queryKey: cache.post.CACHE_CONFIG.tags
 *     });
 *   }
 * }
 * ```
 *
 * @module lib/cache
 * @see {@link lib/cache/post} - Post caching implementation
 * @see {@link lib/cache/timeline} - Timeline caching implementation
 * @see {@link lib/cache/README.md} - Cache architecture documentation
 */
namespace cache {
  export import post = postCache;
  export import timeline = timelineCache;
}

export default cache;
