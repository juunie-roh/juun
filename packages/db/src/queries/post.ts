import type { PostCategory } from "@/generated/prisma/enums";
import type { postModel } from "@/generated/prisma/models";

import { prisma } from "../client";

// Use Prisma's generated timeline type and extend with tags
export type Post = postModel & {
  tags: string[];
};

export type Input = Omit<Post, "created_at" | "updated_at" | "id">;

namespace post {
  export namespace select {
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

  export namespace create {
    /**
     * Create a new post with tags
     *
     * Tags are created if they don't exist (connectOrCreate pattern)
     * Word count is automatically calculated from content
     */
    export async function one(input: Input): Promise<Post> {
      const { title, description, content, category, image, tags } = input;
      const word_count = calculateWordCount(content);

      const post = await prisma.post.create({
        data: {
          title,
          description,
          content,
          word_count,
          category,
          image,
          post_tags: {
            create: tags.map((tagName) => ({
              tag: {
                connectOrCreate: {
                  where: { name: tagName },
                  create: { name: tagName },
                },
              },
            })),
          },
        },
        select: {
          id: true,
          title: true,
          description: true,
          content: true,
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
      });

      return {
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        word_count: post.word_count,
        category: post.category,
        image: post.image,
        created_at: post.created_at,
        updated_at: post.updated_at,
        tags: post.post_tags.map((pt) => pt.tag.name),
      };
    }

    /**
     * Calculate word count from content
     * Counts words separated by whitespace, handling both English and Korean text
     */
    function calculateWordCount(content: string): number {
      return content
        .replace(/[^\p{L}\p{N}\s]/gu, "") // Remove non-letter, non-number characters
        .split(/\s+/)
        .filter((word) => word.length > 0).length;
    }
  }
}

export default post;
