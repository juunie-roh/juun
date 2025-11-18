import md from "@/lib/md";

import { MarkdownInput } from "./_components/markdown-input";

const INITIAL_CONTENT = `# Welcome to Markdown Input Renderer

This playground demonstrates the **custom markdown processing pipeline** used in this project.

## Processing Pipeline

\`\`\`text
Markdown String
  ↓ gray-matter (extract frontmatter)
Markdown Content
  ↓ remark-parse (unified)
Markdown AST (mdast)
  ↓ remark-gfm
Enhanced Markdown AST (tables, strikethrough, etc.)
  ↓ remark-rehype
HTML AST (hast)
  ↓ rehype-raw (parse raw HTML nodes)
  ↓ rehype-unwrap-images (cleanup <p> wrappers)
Processed HTML AST
  ↓ rehype-react (with custom component mappings)
React Elements (JSX)
  ↓ <Prose> wrapper
Final Rendered Output
\`\`\`

## Features

- GitHub Flavored Markdown support (tables, strikethrough, task lists)
- Custom component mappings (Next.js Image, Link, CodeBlock)
- Syntax highlighting for code blocks
- Security: URL sanitization and XSS prevention
- Automatic image dimension detection

## Try it out!

Edit this text and see the preview update in real-time.

### Code Example

\`\`\`typescript
import md from "@/lib/md";

const parsed = await md.parse(markdown);
const rendered = md.render(parsed);
\`\`\`

### Links

- [Internal link](/blog)
- [External link](https://github.com)

### Images

![Example](/images/playground/markdown-icon.png)

### Tables

|Header|Header|Header|
|---|---|---|
|Item|Item|Item|
|Item|Item|Item|

> **Note**: This preview uses the exact same pipeline as the blog system.
`;

interface InputRendererPageProps {
  searchParams: Promise<{ content?: string }>;
}

export default async function InputRendererPage({
  searchParams,
}: InputRendererPageProps) {
  const params = await searchParams;
  const content = params.content || INITIAL_CONTENT;

  let renderedContent;
  let error: string | null = null;

  try {
    const parsed = await md.parse(content);
    renderedContent = md.render(parsed);
  } catch (e) {
    error = e instanceof Error ? e.message : "Failed to parse markdown";
  }

  return (
    <div className="size-full overflow-hidden rounded-lg border">
      <MarkdownInput
        initialContent={content}
        renderedContent={renderedContent}
        error={error}
      />
    </div>
  );
}
