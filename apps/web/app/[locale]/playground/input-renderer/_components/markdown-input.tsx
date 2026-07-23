"use client";

import React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";

import {
  previewMarkdown,
  type PreviewState,
} from "../_actions/preview-markdown";
import MarkdownPreview from "./markdown-preview";

interface MarkdownInputProps {
  initialContent: string;
  initialRendered: React.ReactElement;
}

export default function MarkdownInput({
  initialContent,
  initialRendered,
}: MarkdownInputProps) {
  const [value, setValue] = React.useState(initialContent);

  const [state, runPreview, isPending] = React.useActionState<
    PreviewState,
    string
  >(previewMarkdown, { content: initialRendered, error: null });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // Debounced preview: re-render on the server 500ms after typing stops.
  // The action posts the content in the request body (no URL length limit),
  // and useActionState serializes calls so responses can't land out of order.
  // Skip the initial mount to keep the server-rendered preview.
  const isFirstRender = React.useRef(true);
  React.useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timer = setTimeout(() => {
      // The useActionState dispatch must run inside a transition when called
      // programmatically — this keeps the previous preview mounted while the
      // server re-renders (no reload/flash) and lets isPending update.
      React.startTransition(() => runPreview(value));
    }, 500);
    return () => clearTimeout(timer);
  }, [value, runPreview]);

  return (
    <ResizablePanelGroup orientation="horizontal" className="h-full">
      <ResizablePanel className="flex flex-col p-4">
        <Textarea
          value={value}
          onChange={handleChange}
          className="h-full min-h-0 resize-none font-mono"
          placeholder="# Start writing markdown..."
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="flex flex-col">
        <MarkdownPreview
          content={state.content ?? undefined}
          error={state.error}
          isPending={isPending}
        />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
