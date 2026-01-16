import { prisma } from "@/client";
import { DEFAULT_LOCALE } from "@/constants";
import type { Locale } from "@/generated/prisma/enums";
import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";
import type {
  timeline_translationModel,
  timelineModel,
} from "@/generated/prisma/models";

// Base timeline type without translatable fields
type TimelineBase = Pick<
  timelineModel,
  | "id"
  | "title"
  | "category"
  | "article"
  | "playground"
  | "created_at"
  | "updated_at"
> & {
  tags: string[];
};

// Translation fields
type TimelineTranslation = Pick<
  timeline_translationModel,
  "locale" | "description" | "content"
>;

// Timeline with translation (full content)
export type Timeline = TimelineBase & {
  translation: TimelineTranslation;
};

// Timeline without content (for list views)
export type TimelineWithoutContent = TimelineBase & {
  translation: Omit<TimelineTranslation, "content">;
};

namespace timeline {
  export namespace select {
    /**
     * Get all timeline items with tags without details for a specific locale
     *
     * Timeline items are ordered by `created_at` descending (newest first)
     * Falls back to default locale (ko) if translation not found
     */
    export async function all(
      order: SortOrder | undefined,
      locale: Locale = DEFAULT_LOCALE,
    ): Promise<TimelineWithoutContent[]> {
      const timelines = await prisma.timeline.findMany({
        select: {
          id: true,
          title: true,
          category: true,
          article: true,
          playground: true,
          created_at: true,
          updated_at: true,
          translations: {
            where: { locale },
            select: {
              locale: true,
              description: true,
            },
          },
          timeline_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
        orderBy: {
          created_at: order ?? "desc",
        },
      });

      // Handle fallback for missing translations
      return Promise.all(
        timelines.map(async (timeline) => {
          let translation: { locale: Locale; description: string } | undefined =
            timeline.translations[0];

          // Fallback to default locale if translation missing
          if (!translation && locale !== DEFAULT_LOCALE) {
            const fallbackTranslation =
              await prisma.timeline_translation.findUnique({
                where: {
                  timeline_id_locale: {
                    timeline_id: timeline.id,
                    locale: DEFAULT_LOCALE,
                  },
                },
                select: {
                  locale: true,
                  description: true,
                },
              });
            translation = fallbackTranslation ?? undefined;
          }

          return {
            id: timeline.id,
            title: timeline.title,
            category: timeline.category,
            article: timeline.article,
            playground: timeline.playground,
            created_at: timeline.created_at,
            updated_at: timeline.updated_at,
            tags: timeline.timeline_tags.map((tt) => tt.tag.name),
            translation: translation ?? {
              locale,
              description: "",
            },
          };
        }),
      );
    }

    /**
     * Get a single timeline item by id with detail for a specific locale
     */
    export async function byId(
      id: number,
      locale: Locale = DEFAULT_LOCALE,
    ): Promise<Timeline | null> {
      const timeline = await prisma.timeline.findUnique({
        where: { id },
        select: {
          id: true,
          title: true,
          category: true,
          article: true,
          playground: true,
          created_at: true,
          updated_at: true,
          translations: {
            where: { locale },
          },
          timeline_tags: {
            select: { tag: { select: { name: true } } },
            orderBy: { tag: { name: "asc" } },
          },
        },
      });

      if (!timeline) return null;

      let translation: timeline_translationModel | undefined =
        timeline.translations[0];

      // Fallback to default locale
      if (!translation && locale !== DEFAULT_LOCALE) {
        translation =
          (await prisma.timeline_translation.findUnique({
            where: {
              timeline_id_locale: { timeline_id: id, locale: DEFAULT_LOCALE },
            },
          })) ?? undefined;
      }

      if (!translation) return null;

      return {
        id: timeline.id,
        title: timeline.title,
        category: timeline.category,
        article: timeline.article,
        playground: timeline.playground,
        created_at: timeline.created_at,
        updated_at: timeline.updated_at,
        tags: timeline.timeline_tags.map((tt) => tt.tag.name),
        translation: {
          locale: translation.locale,
          description: translation.description,
          content: translation.content,
        },
      };
    }
  }
}

export default timeline;
