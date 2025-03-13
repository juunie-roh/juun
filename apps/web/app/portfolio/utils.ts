import path from 'path';

import type { Post, PostMetadata } from '@/types/post.types';
import { extractBaseMetadata, getPostsFromDirectory } from '@/utils/post.utils';

/**
 * Extract portfolio-specific metadata
 * Currently uses base implementation, but can be extended with portfolio-specific fields
 */
function extractPortfolioMetadata(filePath: string): PostMetadata {
  return extractBaseMetadata<PostMetadata>(filePath);
}

/**
 * Gets all portfolio posts, sorted by date (newest first by default)
 * @param sortDescending Whether to sort in descending order (newest first)
 * @returns Array of posts
 */
export function getPosts(sortDescending = true): Post<PostMetadata>[] {
  const postsDir = path.join(process.cwd(), 'app', 'portfolio', 'posts');
  return getPostsFromDirectory<PostMetadata>(
    postsDir,
    extractPortfolioMetadata,
    sortDescending,
  );
}
