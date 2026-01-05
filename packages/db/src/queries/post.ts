import type { PostCategory } from "@/generated/prisma/enums";
import type { postModel } from "@/generated/prisma/models";

import { prisma } from "../client";

// Use Prisma's generated timeline type and extend with tags
export type Post = postModel & {
  tags: string[];
};

namespace post {
  export namespace get {
    /**
     * Get all posts without contents
     *
     * Posts are ordered by `created_at` descending (newest first)
     */
    export async function all(): Promise<Omit<Post, "content">[]> {
      const posts = await prisma.post.findMany({
        select: {
          id: true,
          title: true,
          description: true,
          word_count: true,
          category: true,
          image: true,
          created_at: true,
          updated_at: true,
          post_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
        orderBy: { created_at: "desc" },
      });

      // Transform data to flatten tags
      return posts.map((post) => ({
        id: post.id,
        title: post.title,
        word_count: post.word_count,
        description: post.description,
        category: post.category,
        image: post.image,
        created_at: post.created_at,
        updated_at: post.updated_at,
        tags: post.post_tags.map((pt) => pt.tag.name),
      }));
    }
    /**
     * Get all posts having specific tags without contents
     */
    export async function byTags(
      tags: string[],
    ): Promise<Omit<Post, "content">[]> {
      const posts = await prisma.post.findMany({
        where: {
          AND: tags.map((name) => ({
            post_tags: {
              some: { tag: { name } },
            },
          })),
        },
        select: {
          id: true,
          title: true,
          description: true,
          word_count: true,
          category: true,
          image: true,
          created_at: true,
          updated_at: true,
          post_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
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
        word_count: post.word_count,
        description: post.description,
        category: post.category,
        image: post.image,
        created_at: post.created_at,
        updated_at: post.updated_at,
        tags: post.post_tags.map((pt) => pt.tag.name),
      }));
    }
    /**
     * Get all posts classified with `category` without contents
     *
     * @see {@link PostCategory}
     */
    export async function byCategory(
      category: PostCategory,
    ): Promise<Omit<Post, "content">[]> {
      const posts = await prisma.post.findMany({
        where: { category },
        select: {
          id: true,
          title: true,
          description: true,
          word_count: true,
          category: true,
          image: true,
          created_at: true,
          updated_at: true,
          post_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
        orderBy: { created_at: "desc" },
      });

      return posts.map((post) => ({
        id: post.id,
        title: post.title,
        word_count: post.word_count,
        description: post.description,
        category: post.category,
        image: post.image,
        created_at: post.created_at,
        updated_at: post.updated_at,
        tags: post.post_tags.map((pt) => pt.tag.name),
      }));
    }

    /**
     * Get a single post by id, with content, without word count
     */
    export async function byId(
      id: number,
    ): Promise<Omit<Post, "word_count"> | null> {
      const post = await prisma.post.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          description: true,
          content: true,
          category: true,
          image: true,
          created_at: true,
          updated_at: true,
          post_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
      });

      if (!post) return null;

      return {
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        category: post.category,
        image: post.image,
        created_at: post.created_at,
        updated_at: post.updated_at,
        tags: post.post_tags.map((pt) => pt.tag.name),
      };
    }
  }
}

export default post;
