import { prisma } from "@/client";
import { DEFAULT_LOCALE } from "@/constants";
import type { Locale, PostCategory } from "@/generated/prisma/enums";
import type {
  post_translationModel,
  postModel,
} from "@/generated/prisma/models";

// Base post type without translatable fields
type PostBase = Pick<
  postModel,
  "id" | "category" | "image" | "created_at" | "updated_at"
> & {
  tags: string[];
};

// Translation fields
type PostTranslation = Pick<
  post_translationModel,
  "locale" | "title" | "description" | "content" | "word_count"
>;

// Post with translation (full content)
export type Post = PostBase & {
  translation: PostTranslation;
};

// Post without content (for list views)
export type PostWithoutContent = PostBase & {
  translation: Omit<PostTranslation, "content">;
};

// Input for creating posts
export type Input = {
  category: PostCategory;
  image?: string | null;
  tags: string[];
  translations: {
    locale: Locale;
    title: string;
    description?: string | null;
    content: string;
  }[];
};

namespace post {
  export namespace select {
    /**
     * Get all posts without contents for a specific locale
     *
     * Posts are ordered by `created_at` descending (newest first)
     * Falls back to default locale (ko) if translation not found
     */
    export async function all(
      locale: Locale = DEFAULT_LOCALE,
    ): Promise<PostWithoutContent[]> {
      const posts = await prisma.post.findMany({
        select: {
          id: true,
          category: true,
          image: true,
          created_at: true,
          updated_at: true,
          translations: {
            where: { locale },
            select: {
              locale: true,
              title: true,
              description: true,
              word_count: true,
            },
          },
          post_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
        orderBy: { created_at: "desc" },
      });

      // Translation type for list views (without content)
      type ListTranslation = {
        locale: Locale;
        title: string;
        description: string | null;
        word_count: number;
      };

      // Handle fallback for missing translations
      return Promise.all(
        posts.map(async (post) => {
          let translation: ListTranslation | undefined = post.translations[0];

          // Fallback to default locale if translation missing
          if (!translation && locale !== DEFAULT_LOCALE) {
            const fallbackTranslation =
              await prisma.post_translation.findUnique({
                where: {
                  post_id_locale: { post_id: post.id, locale: DEFAULT_LOCALE },
                },
                select: {
                  locale: true,
                  title: true,
                  description: true,
                  word_count: true,
                },
              });
            translation = fallbackTranslation ?? undefined;
          }

          return {
            id: post.id,
            category: post.category,
            image: post.image,
            created_at: post.created_at,
            updated_at: post.updated_at,
            tags: post.post_tags.map((pt) => pt.tag.name),
            translation: translation ?? {
              locale,
              title: "",
              description: null,
              word_count: 0,
            },
          };
        }),
      );
    }

    /**
     * Get all posts having specific tags without contents
     */
    export async function byTags(
      tags: string[],
      locale: Locale = DEFAULT_LOCALE,
    ): Promise<PostWithoutContent[]> {
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
          category: true,
          image: true,
          created_at: true,
          updated_at: true,
          translations: {
            where: { locale },
            select: {
              locale: true,
              title: true,
              description: true,
              word_count: true,
            },
          },
          post_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
        orderBy: { created_at: "desc" },
      });

      // Translation type for list views (without content)
      type ListTranslation = {
        locale: Locale;
        title: string;
        description: string | null;
        word_count: number;
      };

      return Promise.all(
        posts.map(async (post) => {
          let translation: ListTranslation | undefined = post.translations[0];

          if (!translation && locale !== DEFAULT_LOCALE) {
            const fallbackTranslation =
              await prisma.post_translation.findUnique({
                where: {
                  post_id_locale: { post_id: post.id, locale: DEFAULT_LOCALE },
                },
                select: {
                  locale: true,
                  title: true,
                  description: true,
                  word_count: true,
                },
              });
            translation = fallbackTranslation ?? undefined;
          }

          return {
            id: post.id,
            category: post.category,
            image: post.image,
            created_at: post.created_at,
            updated_at: post.updated_at,
            tags: post.post_tags.map((pt) => pt.tag.name),
            translation: translation ?? {
              locale,
              title: "",
              description: null,
              word_count: 0,
            },
          };
        }),
      );
    }

    /**
     * Get all posts classified with `category` without contents
     *
     * @see {@link PostCategory}
     */
    export async function byCategory(
      category: PostCategory,
      locale: Locale = DEFAULT_LOCALE,
    ): Promise<PostWithoutContent[]> {
      const posts = await prisma.post.findMany({
        where: { category },
        select: {
          id: true,
          category: true,
          image: true,
          created_at: true,
          updated_at: true,
          translations: {
            where: { locale },
            select: {
              locale: true,
              title: true,
              description: true,
              word_count: true,
            },
          },
          post_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
        orderBy: { created_at: "desc" },
      });

      // Translation type for list views (without content)
      type ListTranslation = {
        locale: Locale;
        title: string;
        description: string | null;
        word_count: number;
      };

      return Promise.all(
        posts.map(async (post) => {
          let translation: ListTranslation | undefined = post.translations[0];

          if (!translation && locale !== DEFAULT_LOCALE) {
            const fallbackTranslation =
              await prisma.post_translation.findUnique({
                where: {
                  post_id_locale: { post_id: post.id, locale: DEFAULT_LOCALE },
                },
                select: {
                  locale: true,
                  title: true,
                  description: true,
                  word_count: true,
                },
              });
            translation = fallbackTranslation ?? undefined;
          }

          return {
            id: post.id,
            category: post.category,
            image: post.image,
            created_at: post.created_at,
            updated_at: post.updated_at,
            tags: post.post_tags.map((pt) => pt.tag.name),
            translation: translation ?? {
              locale,
              title: "",
              description: null,
              word_count: 0,
            },
          };
        }),
      );
    }

    /**
     * Get a single post by id with content for a specific locale
     */
    export async function byId(
      id: number,
      locale: Locale = DEFAULT_LOCALE,
    ): Promise<Post | null> {
      const post = await prisma.post.findUnique({
        where: { id },
        select: {
          id: true,
          category: true,
          image: true,
          created_at: true,
          updated_at: true,
          translations: {
            where: { locale },
          },
          post_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
      });

      if (!post) return null;

      let translation: post_translationModel | undefined = post.translations[0];

      // Fallback to default locale
      if (!translation && locale !== DEFAULT_LOCALE) {
        translation =
          (await prisma.post_translation.findUnique({
            where: { post_id_locale: { post_id: id, locale: DEFAULT_LOCALE } },
          })) ?? undefined;
      }

      if (!translation) return null;

      return {
        id: post.id,
        category: post.category,
        image: post.image,
        created_at: post.created_at,
        updated_at: post.updated_at,
        tags: post.post_tags.map((pt) => pt.tag.name),
        translation: {
          locale: translation.locale,
          title: translation.title,
          description: translation.description,
          content: translation.content,
          word_count: translation.word_count,
        },
      };
    }
  }

  export namespace create {
    /**
     * Create a new post with translations and tags
     *
     * Tags are created if they don't exist (connectOrCreate pattern)
     * Word count is automatically calculated from content for each translation
     */
    export async function one(input: Input): Promise<Post> {
      const { category, image, tags, translations } = input;

      const post = await prisma.post.create({
        data: {
          category,
          image,
          translations: {
            create: translations.map((t) => ({
              locale: t.locale,
              title: t.title,
              description: t.description,
              content: t.content,
              word_count: calculateWordCount(t.content),
            })),
          },
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
          category: true,
          image: true,
          created_at: true,
          updated_at: true,
          translations: {
            where: { locale: DEFAULT_LOCALE },
          },
          post_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
      });

      const translation = post.translations[0];

      return {
        id: post.id,
        category: post.category,
        image: post.image,
        created_at: post.created_at,
        updated_at: post.updated_at,
        tags: post.post_tags.map((pt) => pt.tag.name),
        translation: translation ?? {
          locale: DEFAULT_LOCALE,
          title: "",
          description: null,
          content: "",
          word_count: 0,
        },
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
