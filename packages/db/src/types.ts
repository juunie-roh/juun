import { SortOrder } from "@/generated/prisma/internal/prismaNamespace";

// Re-export types from generated Prisma client
export {
  Locale,
  PostCategory,
  TimelineCategory,
} from "@/generated/prisma/enums";

export type OrderBy<T> = {
  [K in keyof T]?: SortOrder;
};

export type { SortOrder };
