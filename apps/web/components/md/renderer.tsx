"use client";

import { CodeBlock } from "@juun/ui/code-block";
import { Prose } from "@juun/ui/prose";
import { ComponentProps } from "react";

import md from "@/lib/md";

export function MarkdownRenderer({ html }: { html: string }) {
  // Extract code blocks from <pre><code class="language-*"> pattern
  const codeBlocks: ComponentProps<typeof CodeBlock>[] = [];
  let processedHtml = html;

  // Find all <pre><code class="language-*"> blocks
  const codeBlockRegex =
    /<pre><code class="language-([^"]*)">([\s\S]*?)<\/code><\/pre>/g;
  let match;
  let index = 0;

  while ((match = codeBlockRegex.exec(html)) !== null) {
    const [fullMatch, language, code] = match;
    const fileName = language || "text";

    if (!code) return;

    // Decode HTML entities for CodeBlock component
    const decodedCode = md.decode(code).replace(/\n$/, "");

    codeBlocks.push({ code: decodedCode, fileName });

    // Replace with placeholder
    processedHtml = processedHtml.replace(fullMatch, `__CODE_BLOCK_${index}__`);
    index++;
  }

  // Split HTML by code block placeholders
  const parts = processedHtml.split(/__CODE_BLOCK_(\d+)__/);

  return (
    <Prose>
      {parts.map((part, i) => {
        if (i % 2 === 0) {
          // Regular HTML content
          return <div key={i} dangerouslySetInnerHTML={{ __html: part }} />;
        } else {
          // Code block
          const blockIndex = parseInt(part, 10);
          const codeBlock = codeBlocks[blockIndex];
          if (codeBlock) {
            return <CodeBlock {...codeBlock} key={i} />;
          }
          return null;
        }
      })}
    </Prose>
  );
}
