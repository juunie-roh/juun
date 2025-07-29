// apps/web/app/test-mdx/page.tsx
import { MarkdownRenderer } from "@/components/md/renderer";
import { processMDX } from "@/lib/md";

export default async function TestMDX() {
  const markdownSource = `
---
title: "Simple Markdown Test"
description: "Using marked instead of MDX"
---

# Simple Markdown

This is **basic** markdown with *italic* text.

## Benefits

- No React 19 compatibility issues
- Simple and reliable
- Still supports frontmatter
- Works with your Tailwind prose classes

### Code Example

\`\`\`javascript
const simple = "and reliable"
console.log(simple)
\`\`\`

> This should work without any React conflicts.

[Link test](https://example.com)
  `;

  const { html, frontmatter } = await processMDX(markdownSource);

  return (
    <div className="container mx-auto py-8">
      <header className="mb-8">
        <h1 className="text-2xl font-bold">{frontmatter.title}</h1>
        <p className="text-gray-600">{frontmatter.description}</p>
      </header>

      <MarkdownRenderer html={html} />
    </div>
  );
}
