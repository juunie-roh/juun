"use client";

import { Prose } from "@juun/ui/prose";

import type md from "@/lib/md";

interface MarkdownRendererProps {
  /** Parsed content from md.parse() (server-side) */
  parsed: md.ParsedContent;
}

/**
 * Renders markdown content parsed by the unified ecosystem
 *
 * The content is already converted to React elements by rehype-react,
 * so we simply render it inside the Prose wrapper for styling.
 */
export function MarkdownRenderer({ parsed }: MarkdownRendererProps) {
  const { content } = parsed;

  return <Prose>{content}</Prose>;
}
