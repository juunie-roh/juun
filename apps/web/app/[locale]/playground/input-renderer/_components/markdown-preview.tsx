"use client";

import { type ReactElement } from "react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MarkdownPreviewProps {
  content?: ReactElement;
  error: string | null;
}

export default function MarkdownPreview({
  content,
  error,
}: MarkdownPreviewProps) {
  return (
    <ScrollArea className="h-full p-4">
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
