"use client";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@juun/ui/resizable";
import { Textarea } from "@juun/ui/textarea";
import { useRouter } from "next/navigation";
import { type ReactElement, useCallback, useEffect, useState } from "react";

import { MarkdownPreview } from "./markdown-preview";

interface MarkdownInputProps {
  initialContent: string;
  renderedContent?: ReactElement;
  error: string | null;
}

export function MarkdownInput({
  initialContent,
  renderedContent,
  error,
}: MarkdownInputProps) {
  const router = useRouter();
  const [value, setValue] = useState(initialContent);

  // Debounced URL update
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      params.set("content", value);
      router.replace(`/playground/input-renderer?${params.toString()}`, {
        scroll: false,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [value, router]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [],
  );

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
      <ResizablePanel className="flex flex-col p-4">
        <Textarea
          value={value}
          onChange={handleChange}
          className="h-full min-h-0 resize-none border-none font-mono"
          placeholder="# Start writing markdown..."
        />
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel className="flex flex-col">
        <MarkdownPreview content={renderedContent} error={error} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
