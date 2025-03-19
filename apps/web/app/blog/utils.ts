import path from 'path';

import type { BlogMetadata, Post } from '@/types/post.types';
import { extractBaseMetadata, getPostsFromDirectory } from '@/utils/post.utils';

/**
 * Extract blog-specific metadata including word count
 */
function extractBlogMetadata(filePath: string): BlogMetadata {
  return extractBaseMetadata<BlogMetadata>(filePath, (content, metadata) => {
    // Calculate word count from the entire post content
    // This is an approximation - we're trying to exclude the metadata section

    const contentStartMatch = content.match(/export\s+default\s+function/);
    let postContent = content;
    if (contentStartMatch && contentStartMatch.index) {
      // Get content after the export default
      postContent = content.substring(contentStartMatch.index);
    }

    // Clean up the content to remove JSX/HTML tags and code blocks
    const cleanedContent = postContent
      .replace(/<[^>]*>/g, ' ') // Remove HTML/JSX tags
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, ' ') // Remove JS comments
      .replace(/```[\s\S]*?```/g, ' ') // Remove code blocks
      .replace(/import.*?from.*?;/g, ' '); // Remove import statements

    // Count words (split by whitespace)
    const words = cleanedContent.split(/\s+/).filter(Boolean);
    metadata.wordCount = words.length;
  });
}

/**
 * Gets all blog posts, sorted by date (newest first by default)
 * @param sortDescending Whether to sort in descending order (newest first)
 * @returns Array of posts
 */
export function getPosts(sortDescending = true): Post<BlogMetadata>[] {
  const postsDir = path.join(process.cwd(), 'app', 'blog', 'posts');
  return getPostsFromDirectory<BlogMetadata>(
    postsDir,
    extractBlogMetadata,
    sortDescending,
  );
}
