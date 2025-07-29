import fs from "fs";
import path from "path";

import type { BaseMetadata, Post } from "@/types/post.types";
import { sortPostsByDate } from "@/utils/compare";
import { parseDate } from "@/utils/date";

/**
 * Extract common metadata properties from a file
 *
 * @param filePath Path to the file
 * @param additionalExtractors Optional functions to extract additional metadata
 * @returns Metadata object
 */
export function extractBaseMetadata<T extends BaseMetadata>(
  filePath: string,
  additionalExtractors?: (content: string, metadata: T) => void,
): T {
  try {
    const content = fs.readFileSync(filePath, "utf8");

    // Default metadata with filename-based title as fallback
    const fileName = path.basename(filePath, path.extname(filePath));
    const defaultTitle = fileName
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");

    const metadata = { title: defaultTitle } as T;

    // Look for title in the file content
    const titleMatch = content.match(/title:\s*['"`]([^'"`]*)['"`]/);
    if (titleMatch && titleMatch[1]) {
      metadata.title = titleMatch[1];
    }

    // Look for description
    const descriptionMatch = content.match(
      /description:\s*['"`]([\s\S]*?)['"`]/,
    );
    if (descriptionMatch && descriptionMatch[1]) {
      metadata.description = descriptionMatch[1];
    }

    // Look for date and parse it to a Date object
    const dateMatch = content.match(/date:\s*['"`](.+?)['"`]/);
    if (dateMatch && dateMatch[1]) {
      const parsedDate = parseDate(dateMatch[1]);
      if (parsedDate) {
        metadata.date = parsedDate;
      } else {
        metadata.date = dateMatch[1]; // Fallback to string if parsing fails
      }
    }

    // Look for image
    const imageMatch = content.match(/image:\s*['"`]([\s\S]*?)['"`]/);
    if (imageMatch && imageMatch[1]) {
      metadata.image = imageMatch[1];
    }

    // Look for tags - this is more complex as it's an array
    const tagsMatch = content.match(/tags:\s*\[([\s\S]*?)\]/);
    if (tagsMatch && tagsMatch[1]) {
      const tagsString = tagsMatch[1];
      const tags = tagsString
        .split(",")
        .map((tag) => {
          // Extract just the text between quotes
          const match = tag.match(/['"`](.+?)['"`]/);
          return match ? match[1]?.trim() : null;
        })
        .filter(Boolean) as string[];

      if (tags.length > 0) {
        metadata.tags = tags;
      }
    }

    // Run additional extractors if provided
    if (additionalExtractors) {
      additionalExtractors(content, metadata);
    }

    return metadata;
  } catch (e) {
    console.error(`Error reading file ${filePath}:`, e);
    return {
      title: path.basename(filePath, path.extname(filePath)),
    } as T;
  }
}

/**
 * Generic function to get posts from a directory
 *
 * @param postsDir Directory containing the posts
 * @param metadataExtractor Function to extract metadata from a file
 * @param sortDescending Whether to sort in descending order (newest first)
 * @returns Array of posts
 */
export function getPostsFromDirectory<T extends BaseMetadata>(
  postsDir: string,
  metadataExtractor: (filePath: string) => T,
  sortDescending = true,
): Post<T>[] {
  try {
    if (!fs.existsSync(postsDir)) {
      console.warn(`Directory not found: ${postsDir}`);
      return [];
    }

    const files = fs
      .readdirSync(postsDir)
      .filter((file) => path.extname(file) === ".tsx");

    // Convert files to posts
    const posts = files.map((file) => {
      const filePath = path.join(postsDir, file);
      const metadata = metadataExtractor(filePath);

      return {
        metadata,
        slug: path.basename(file, path.extname(file)),
      };
    });

    // Sort posts by date
    return sortPostsByDate(posts, sortDescending);
  } catch (error: any) {
    console.error(`Error reading posts: ${error.message}`);
    return [];
  }
}
