"use client";

import React from "react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "@/i18n/navigation";

import MarkdownPreview from "./markdown-preview";

interface MarkdownInputProps {
  initialContent: string;
  renderedContent?: React.ReactElement;
  error: string | null;
}

export default function MarkdownInput({
  initialContent,
  renderedContent,
  error,
}: MarkdownInputProps) {
  const router = useRouter();
  const [value, setValue] = React.useState(initialContent);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(e.target.value);
  };

  // Debounced URL update
  React.useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams();
      params.set("content", value);
      router.replace(`/playground/input-renderer?${params.toString()}`, {
        scroll: false,
      });
    }, 500);

    return () => clearTimeout(timer);
  }, [value, router]);

  return (
    <ResizablePanelGroup direction="horizontal" className="h-full">
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
        <MarkdownPreview content={renderedContent} error={error} />
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
