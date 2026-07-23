"use server";

import type { ReactElement } from "react";

import md from "@/lib/server/md";

export interface PreviewState {
  /** Rendered preview, or null when parsing failed. */
  content: ReactElement | null;
  /** Parse error message, or null on success. */
  error: string | null;
}

/**
 * Render markdown to React on the server, keeping the `md` pipeline server-only.
 *
 * Invoked as a Server Action (POST body transport) so content is not subject to
 * URL length limits. The returned `ReactElement` is serialized back to the
 * client via the RSC payload, preserving custom component mappings (CodeBlock,
 * Next.js Image/Link).
 *
 * Shaped for `useActionState`: `(prevState, payload) => nextState`.
 */
export async function previewMarkdown(
  _prevState: PreviewState,
  markdown: string,
): Promise<PreviewState> {
  try {
    const parsed = await md.parse(markdown);
    return { content: md.render(parsed), error: null };
  } catch (e) {
    return {
      content: null,
      error: e instanceof Error ? e.message : "Failed to parse markdown",
    };
  }
}
