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

### Table Example

| Feature | Status | Notes |
|---------|--------|-------|
| Basic Markdown | ✅ Working | Simple and reliable |
| Code Blocks | ✅ Working | Uses custom CodeBlock component |
| Tables | ✅ Working | Standard markdown tables |
| Links | ✅ Working | Standard markdown links |

> This should work without any React conflicts.

[Link test](https://example.com)
  `;

  const { html, frontmatter } = await processMDX(markdownSource);

  return (
    <article className="xl:w-3xl mx-auto w-full max-w-3xl px-2 pb-20 pt-4 md:px-8">
      <header className="mb-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tighter">
          {frontmatter.title}
        </h1>
        <p className="text-lg">{frontmatter.description}</p>
      </header>

      <MarkdownRenderer html={html} />
    </article>
  );
}
