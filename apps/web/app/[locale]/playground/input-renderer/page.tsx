import md from "@/lib/server/md";

import MarkdownInput from "./_components/markdown-input";

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

export default async function InputRendererPage() {
  // Render the initial preview server-side so there is no flash on load.
  // Subsequent edits are rendered via the previewMarkdown Server Action.
  const parsed = await md.parse(INITIAL_CONTENT);
  const initialRendered = md.render(parsed);

  return (
    <div className="size-full overflow-hidden rounded-lg border">
      <MarkdownInput
        initialContent={INITIAL_CONTENT}
        initialRendered={initialRendered}
      />
    </div>
  );
}
