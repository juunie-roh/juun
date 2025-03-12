import fs from 'fs';
import path from 'path';

import type { BlogMetadata } from '@/types/blog.types';

export interface Post {
  metadata: BlogMetadata;
  slug: string;
}

// Function to extract metadata and calculate word count from file contents
function extractMetadataFromFile(filePath: string): BlogMetadata {
  try {
    const content = fs.readFileSync(filePath, 'utf8');

    // Default metadata with filename-based title as fallback
    const fileName = path.basename(filePath, path.extname(filePath));
    const defaultTitle = fileName
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    let metadata: BlogMetadata = { title: defaultTitle };

    // Look for title in the file content
    const titleMatch = content.match(/title:\s*['"](.+?)['"]/);
    if (titleMatch && titleMatch[1]) {
      metadata.title = titleMatch[1];
    }

    // Look for description
    const descriptionMatch = content.match(/description:\s*['"](.+?)['"]/);
    if (descriptionMatch && descriptionMatch[1]) {
      metadata.description = descriptionMatch[1];
    }

    // Look for date
    const dateMatch = content.match(/date:\s*['"](.+?)['"]/);
    if (dateMatch && dateMatch[1]) {
      metadata.date = dateMatch[1];
    }

    // Look for image
    const imageMatch = content.match(/image:\s*['"](.+?)['"]/);
    if (imageMatch && imageMatch[1]) {
      metadata.image = imageMatch[1];
    }

    // Look for tags - this is more complex as it's an array
    const tagsMatch = content.match(/tags:\s*\[(.*?)\]/);
    if (tagsMatch && tagsMatch[1]) {
      const tagsString = tagsMatch[1];
      const tags = tagsString
        .split(',')
        .map((tag) => {
          // Extract just the text between quotes
          const match = tag.match(/['"](.+?)['"]/);
          return match ? match[1]?.trim() : null;
        })
        .filter(Boolean) as string[];

      if (tags.length > 0) {
        metadata.tags = tags;
      }
    }

    // Calculate word count from the entire post content
    // This is an approximation - we're trying to exclude the metadata section and focus on the actual content

    // Find the end of the metadata section (often after export default or after the metadata object)
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

    return metadata;
  } catch (e) {
    console.error(`Error reading file ${filePath}:`, e);
    return {
      title: path.basename(filePath, path.extname(filePath)),
    };
  }
}

export function getPosts(): Post[] {
  try {
    const dir = path.join(process.cwd(), 'app', 'blog', 'posts');
    if (!fs.existsSync(dir)) {
      console.warn('🚀 ~ getPosts ~ :', `Directory not found: ${dir}`);
      return [];
    }

    const files = fs
      .readdirSync(dir)
      .filter((file) => path.extname(file) === '.tsx');

    return files.map((file) => {
      const filePath = path.join(dir, file);
      const metadata = extractMetadataFromFile(filePath);

      return {
        metadata,
        slug: path.basename(file, path.extname(file)),
      };
    });
  } catch (error: any) {
    console.error(`Error reading posts: ${error.message}`);
    return [];
  }
}
