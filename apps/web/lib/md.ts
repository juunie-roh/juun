import matter from "gray-matter";
import { marked } from "marked";

namespace md {
  type Data = Record<string, any>;
  type WithData<T> = T & Data;

  export function decode(html: string): string {
    return html
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&amp;/g, "&");
  }

  export async function parse(md: string): Promise<WithData<{ html: string }>> {
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
