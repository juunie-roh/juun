import path from 'path';

import type { PortfolioMetadata } from '@/types/portfolio.types';
import {
  extractBaseMetadata,
  getPostsFromDirectory,
  type Post as BasePost,
} from '@/utils/post.utils';

export type Post = BasePost<PortfolioMetadata>;

/**
 * Extract portfolio-specific metadata
 * Currently uses base implementation, but can be extended with portfolio-specific fields
 */
function extractPortfolioMetadata(filePath: string): PortfolioMetadata {
  return extractBaseMetadata<PortfolioMetadata>(filePath);
}

/**
 * Gets all portfolio posts, sorted by date (newest first by default)
 * @param sortDescending Whether to sort in descending order (newest first)
 * @returns Array of posts
 */
export function getPosts(sortDescending = true): Post[] {
  const postsDir = path.join(process.cwd(), 'app', 'portfolio', 'posts');
  return getPostsFromDirectory<PortfolioMetadata>(
    postsDir,
    extractPortfolioMetadata,
    sortDescending,
  );
}
