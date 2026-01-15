import type { timelineModel } from "@/generated/prisma/models";

import { prisma } from "../client";

// Use Prisma's generated timeline type and extend with tags
export type Timeline = timelineModel & {
  tags: string[];
};

namespace timeline {
  export namespace select {
    /**
     * Get all timeline items with tags without details
     *
     * Timeline items are ordered by `created_at` descending (newest first)
     */
    export async function all(
      order: "asc" | "desc" | undefined,
    ): Promise<Omit<Timeline, "detail">[]> {
      const timelines = await prisma.timeline.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          article: true,
          playground: true,
          created_at: true,
          updated_at: true,
          timeline_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
        orderBy: {
          created_at: order ?? "desc",
        },
      });

      // Transform data to flatten tags
      return timelines.map((timeline) => ({
        id: timeline.id,
        title: timeline.title,
        description: timeline.description,
        category: timeline.category,
        article: timeline.article,
        playground: timeline.playground,
        created_at: timeline.created_at,
        updated_at: timeline.updated_at,
        tags: timeline.timeline_tags.map((tt) => tt.tag.name),
      }));
    }

    /**
     * Get a single timeline item by id, including its detail
     */
    export async function byId(id: number): Promise<Timeline | null> {
      const timeline = await prisma.timeline.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          description: true,
          category: true,
          detail: true,
          article: true,
          playground: true,
          created_at: true,
          updated_at: true,
          timeline_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
      });

      if (!timeline) return null;

      return {
        id: timeline.id,
        title: timeline.title,
        description: timeline.description,
        category: timeline.category,
        detail: timeline.detail,
        article: timeline.article,
        playground: timeline.playground,
        created_at: timeline.created_at,
        updated_at: timeline.updated_at,
        tags: timeline.timeline_tags.map((tt) => tt.tag.name),
      };
    }
  }
}

export default timeline;
