import type { PostCategory } from "@prisma/client";

import { prisma } from "../client";

namespace post {
  /**
   * Post with tags
   */
  export interface WithTags {
    id: number;
    title: string;
    slug: string;
    description: string | undefined;
    content: string;
    category: PostCategory | undefined;
    image: string | undefined;
    created_at: Date;
    updated_at: Date;
    tags: string[];
  }

  export namespace get {
    /**
     * Get all posts with tags without contents
     *
     * Posts are ordered by `created_at` descending (newest first)
     */
    export async function all(): Promise<Omit<WithTags, "content">[]> {
      const posts = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          category: true,
          image: true,
          created_at: true,
          updated_at: true,
          post_tags: {
            select: {
              tag: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: {
              tag: {
                name: "asc",
              },
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });

      // Transform data to flatten tags
      return posts.map((post) => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        description: post.description ?? undefined,
        category: post.category ?? undefined,
        image: post.image ?? undefined,
        created_at: post.created_at,
        updated_at: post.updated_at,
        tags: post.post_tags.map((pt) => pt.tag.name),
      }));
    }

    /**
     * Get a single post by slug
     */
    export async function bySlug(slug: string): Promise<WithTags | null> {
      const post = await prisma.post.findUnique({
        where: { slug },
        select: {
          id: true,
          title: true,
          slug: true,
          description: true,
          content: true,
          category: true,
          image: true,
          created_at: true,
          updated_at: true,
          post_tags: {
            select: {
              tag: {
                select: {
                  name: true,
                },
              },
            },
            orderBy: {
              tag: {
                name: "asc",
              },
            },
          },
        },
      });

      if (!post) return null;

      return {
        id: post.id,
        title: post.title,
        slug: post.slug,
        description: post.description ?? undefined,
        content: post.content,
        category: post.category ?? undefined,
        image: post.image ?? undefined,
        created_at: post.created_at,
        updated_at: post.updated_at,
        tags: post.post_tags.map((pt) => pt.tag.name),
      };
    }
  }
}

export default post;
