// apps/web/lib/mdx.ts
import matter from "gray-matter";
import { marked } from "marked";

export interface ProcessedMDX {
  html: string;
  frontmatter: Record<string, any>;
}

export async function processMDX(source: string): Promise<ProcessedMDX> {
  const { data: frontmatter, content } = matter(source);

  // Convert markdown to HTML
  const html = await marked(content);

  return {
    html,
    frontmatter,
  };
}
