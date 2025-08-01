import matter from "gray-matter";
import { marked } from "marked";

export interface ProcessedMDX {
  html: string;
  frontmatter: Record<string, any>;
}

// Custom renderer for code blocks
const renderer = new marked.Renderer();
renderer.code = function ({
  text,
  lang,
  escaped,
}: {
  text: string;
  lang?: string;
  escaped?: boolean;
}) {
  const safeCode = escaped ? text : escape(text);
  const language = lang || "text";
  const fileName = `code.${language === "javascript" ? "js" : language === "typescript" ? "ts" : language}`;

  // Return a custom div that can be processed by React
  return `<div class="custom-code-block" data-code="${escape(safeCode)}" data-filename="${fileName}"></div>`;
};

function escape(html: string): string {
  return html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export async function processMDX(source: string): Promise<ProcessedMDX> {
  const { data: frontmatter, content } = matter(source);

  // Convert markdown to HTML with custom renderer
  const html = await marked(content, { renderer });

  return {
    html,
    frontmatter,
  };
}
