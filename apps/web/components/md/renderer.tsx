"use client";

import { CodeBlock } from "@juun/ui/code-block";

interface MarkdownRendererProps {
  html: string;
}

interface CodeBlockData {
  code: string;
  fileName: string;
  index: number;
}

export function MarkdownRenderer({ html }: MarkdownRendererProps) {
  // Extract code blocks from HTML and prepare data
  const codeBlocks: CodeBlockData[] = [];
  let processedHtml = html;

  // Find all custom code blocks and extract their data
  const codeBlockRegex =
    /<div class="custom-code-block" data-code="([^"]*)" data-filename="([^"]*)"><\/div>/g;
  let match;
  let index = 0;

  while ((match = codeBlockRegex.exec(html)) !== null) {
    const [fullMatch, encodedCode, fileName] = match;

    if (!encodedCode || !fileName) continue;

    // Unescape the code
    const code = encodedCode
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'");

    codeBlocks.push({ code, fileName, index });

    // Replace with a placeholder
    processedHtml = processedHtml.replace(fullMatch, `__CODE_BLOCK_${index}__`);
    index++;
  }

  // Split HTML by code block placeholders
  const parts = processedHtml.split(/__CODE_BLOCK_(\d+)__/);

  return (
    <div className="prose prose-zinc dark:prose-invert max-w-none">
      {parts.map((part, i) => {
        if (i % 2 === 0) {
          // Regular HTML content
          return <div key={i} dangerouslySetInnerHTML={{ __html: part }} />;
        } else {
          // Code block
          const blockIndex = parseInt(part, 10);
          const codeBlock = codeBlocks[blockIndex];
          if (codeBlock) {
            return (
              <div key={i} className="not-prose my-6">
                <CodeBlock
                  code={codeBlock.code}
                  fileName={codeBlock.fileName}
                />
              </div>
            );
          }
          return null;
        }
      })}
    </div>
  );
}
