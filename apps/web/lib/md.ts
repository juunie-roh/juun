import matter from "gray-matter";
import { marked } from "marked";

namespace md {
  export function decode(html: string): string {
    return html
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&");
  }

  export async function parse(
    md: string,
  ): Promise<{ html: string; data: { [key: string]: any } }> {
    const { data, content } = matter(md);

    // Convert markdown to HTML with custom renderer
    const html = await marked(content);

    return {
      html,
      data,
    };
  }
}

export default md;
