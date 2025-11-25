/**
 * Timeline cache layer
 *
 * Provides Next.js-cached wrappers around @juun/db/timeline queries.
 * Mirrors the same namespace structure for API consistency.
 *
 * @module lib/cache/timeline
 *
 * @example
 * ```ts
 * import cache from "@/lib/cache";
 *
 * // Get all timeline items (cached for 1 hour)
 * const timelines = await cache.timeline.get.all();
 *
 * // Get timeline by id (cached for 1 hour)
 * const timeline = await cache.timeline.get.byId(1);
 *
 * // Revalidate all timeline caches
 * await cache.timeline.revalidate();
 * ```
 *
 * @see {@link @juun/db/timeline} - Source database queries (uncached)
 * @see {@link lib/cache/README.md} - Cache architecture documentation
 */

import timelineQuery from "@juun/db/timeline";
import { unstable_cache } from "next/cache";

/**
 * Cache configuration for timeline queries
 *
 * @property revalidate - Cache lifetime in seconds (1 hour)
 * @property tags - Cache tags for invalidation
 */
const CACHE_CONFIG = {
  revalidate: 3600, // 1 hour
  tags: ["timelines"],
};

/**
 * Cached timeline queries
 *
 * This namespace mirrors @juun/db/timeline structure but adds Next.js caching.
 */
namespace timeline {
  export type Metadata = Awaited<ReturnType<(typeof get)["all"]>>[number];
  /**
   * Query methods for retrieving timeline items
   */
  export namespace get {
    /**
     * Get all timeline items with caching
     *
     * Returns all timeline items without details, sorted by created_at descending.
     * Cached for 1 hour with tag "timelines".
     *
     * @returns Promise resolving to array of timeline items (without details)
     *
     * @example
     * ```ts
     * const timelines = await cache.timeline.get.all();
     * timelines.forEach(timeline => console.log(timeline.title));
     * ```
     */
    export const all = unstable_cache(
      async (order: "asc" | "desc" | undefined) => timelineQuery.get.all(order),
      ["timelines-all"],
      CACHE_CONFIG,
    );

    /**
     * Get a single timeline item by id with caching
     *
     * Returns full timeline item with detail and tags.
     * Each id is cached separately for 1 hour with tag "timelines".
     *
     * @param id - Timeline id identifier
     * @returns Promise resolving to timeline item with detail, or null if not found
     *
     * @example
     * ```ts
     * const timeline = await cache.timeline.get.byId(1);
     * if (timeline) {
     *   console.log(timeline.title, timeline.detail);
     * }
     * ```
     */
    export const byId = (id: number) =>
      unstable_cache(
        async () => timelineQuery.get.byId(id),
        [`timeline-${id}`],
        {
          revalidate: 3600,
          tags: ["timelines", `timeline-${id}`],
        },
      )();
  }

  /**
   * Revalidate all timeline caches
   *
   * Invalidates all cached timeline queries by revalidating the "timelines" tag.
   * Use this after creating, updating, or deleting timeline items.
   * Uses "max" profile for stale-while-revalidate semantics (Next.js 16+).
   *
   * @returns Promise that resolves when cache is invalidated
   *
   * @example
   * ```ts
   * // In a Server Action after updating a timeline item
   * await updateTimeline(id, data);
   * await cache.timeline.revalidate(); // Clear all timeline caches
   * ```
   *
   * @example
   * ```ts
   * // In an API route
   * import { revalidateTag } from "next/cache";
   * revalidateTag("timelines", "max"); // Alternative direct approach
   * ```
   */
  export async function revalidate() {
    const { revalidateTag } = await import("next/cache");
    revalidateTag("timelines", "max");
  }
}

export default timeline;
