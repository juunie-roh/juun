"use client";

import { type ReactElement } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface MarkdownPreviewProps {
  content?: ReactElement;
  error: string | null;
  /** Whether a server re-render is in flight (dims the stale preview). */
  isPending?: boolean;
}

export default function MarkdownPreview({
  content,
  error,
  isPending,
}: MarkdownPreviewProps) {
  return (
    <ScrollArea
      className={cn("h-full p-4 transition-opacity", isPending && "opacity-60")}
    >
      {error ? (
        <Alert variant="destructive">
          <AlertTitle>Parse Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      ) : content ? (
        content
      ) : (
        <p className="text-muted-foreground">Start typing to see preview...</p>
      )}
    </ScrollArea>
  );
}
