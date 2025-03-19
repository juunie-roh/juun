/**
 * Base interface for both blog and portfolio post metadata
 */
export interface BaseMetadata {
  title: string;
  description?: string;
  date?: Date | string;
  tags?: string[];
  image?: string;
}

/**
 * Generic Post interface for both blog and portfolio posts
 */
export interface Post<T extends BaseMetadata> {
  metadata: T;
  slug: string;
}

export type PostMetadata = BaseMetadata;
export type BlogMetadata = BaseMetadata & {
  wordCount?: number;
};
