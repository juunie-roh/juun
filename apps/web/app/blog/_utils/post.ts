import path from "path";

import type { Post } from "@/types/post.types";
import { BaseMetadata } from "@/types/post.types";
import { extractBaseMetadata, getPostsFromDirectory } from "@/utils/post";

export type BlogMetadata = BaseMetadata & { wordCount?: number };
export type Heading = {
  id: string;
  text: string;
  level: number;
  element: Element;
};

/**
 * Gets all blog posts, sorted by date (newest first by default)
 * @param sortDescending Whether to sort in descending order (newest first)
 * @returns Array of posts
 */
export function getPosts(sortDescending = true): Post<BlogMetadata>[] {
  const postsDir = path.join(process.cwd(), "app", "blog", "_data");
  return getPostsFromDirectory<BlogMetadata>(
    postsDir,
    extractBlogMetadata,
    sortDescending,
  );
}

/**
 * Extract ID from heading element
 * If no ID exists, generate one from the text content
 * @param heading Target heading element to get ID from.
 */
export function getIdFromHeading(heading: Element): string {
  // If the heading already has an id, use it
  if (heading.id) {
    return heading.id;
  }

  // Otherwise, generate an id from the heading text
  const id = heading.textContent
    ?.toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  // Set the id on the heading element
  if (id) {
    heading.id = id;
  }

  return id || "";
}

export function getHeadings(
  contentSelector: string,
  headingSelector: string,
): Heading[] | undefined {
  // Find the content container
  const container = document.querySelector(contentSelector);
  if (!container) return;

  // Find all headings in the container
  const elements = Array.from(container.querySelectorAll(headingSelector));

  // Process headings
  const headingElements = elements.map((element) => {
    // Get or create an ID for the heading
    const id = getIdFromHeading(element);
    // Get heading level (h2 = 2, h3 = 3, etc.)
    const level = parseInt(element.tagName[1] as string, 10);

    return {
      id,
      text: element.textContent || "",
      level,
      element,
    };
  });

  return headingElements;
}

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
      .replace(/<[^>]*>/g, " ") // Remove HTML/JSX tags
      .replace(/\{\/\*[\s\S]*?\*\/\}/g, " ") // Remove JS comments
      .replace(/```[\s\S]*?```/g, " ") // Remove code blocks
      .replace(/import.*?from.*?;/g, " "); // Remove import statements

    // Count words (split by whitespace)
    const words = cleanedContent.split(/\s+/).filter(Boolean);
    metadata.wordCount = words.length;
  });
}
