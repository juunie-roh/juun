/**
 * Post cache layer
 *
 * Provides Next.js-cached wrappers around @juun/db/post queries.
 * Mirrors the same namespace structure for API consistency.
 *
 * @module lib/cache/post
 *
 * @example
 * ```ts
 * import cache from "@/lib/cache";
 *
 * // Get all posts (cached for 1 hour)
 * const posts = await cache.post.get.all();
 *
 * // Get post by slug (cached for 1 hour)
 * const post = await cache.post.get.bySlug("my-slug");
 *
 * // Revalidate all post caches
 * await cache.post.revalidate();
 * ```
 *
 * @see {@link @juun/db/post} - Source database queries (uncached)
 * @see {@link lib/cache/README.md} - Cache architecture documentation
 */

import postQuery from "@juun/db/post";
import { unstable_cache } from "next/cache";

/**
 * Cache configuration for post queries
 *
 * @property revalidate - Cache lifetime in seconds (1 hour)
 * @property tags - Cache tags for invalidation
 */
const CACHE_CONFIG = {
  revalidate: 3600, // 1 hour
  tags: ["posts"],
};

/**
 * Cached post queries
 *
 * This namespace mirrors @juun/db/post structure but adds Next.js caching.
 */
namespace post {
  /**
   * Query methods for retrieving posts
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
     * Get a single post by slug with caching
     *
     * Returns full post with content and tags.
     * Each slug is cached separately for 1 hour with tag "posts".
     *
     * @param slug - Post slug identifier
     * @returns Promise resolving to post with content, or null if not found
     *
     * @example
     * ```ts
     * const post = await cache.post.get.bySlug("npm-packages");
     * if (post) {
     *   console.log(post.title, post.content);
     * }
     * ```
     */
    export const bySlug = (slug: string) =>
      unstable_cache(async () => postQuery.get.bySlug(slug), [`post-${slug}`], {
        revalidate: 3600,
        tags: ["posts", `post-${slug}`],
      })();
  }

  /**
   * Revalidate all post caches
   *
   * Invalidates all cached post queries by revalidating the "posts" tag.
   * Use this after creating, updating, or deleting posts.
   *
   * @returns Promise that resolves when cache is invalidated
   *
   * @example
   * ```ts
   * // In a Server Action after updating a post
   * await updatePost(slug, data);
   * await cache.post.revalidate(); // Clear all post caches
   * ```
   *
   * @example
   * ```ts
   * // In an API route
   * import { revalidateTag } from "next/cache";
   * revalidateTag("posts"); // Alternative direct approach
   * ```
   */
  export async function revalidate() {
    const { revalidateTag } = await import("next/cache");
    revalidateTag("posts");
  }
}

export default post;
