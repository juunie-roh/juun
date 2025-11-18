"use client";

import { Alert, AlertDescription, AlertTitle } from "@juun/ui/alert";
import { ScrollArea } from "@juun/ui/scroll-area";
import { type ReactElement } from "react";

interface MarkdownPreviewProps {
  content?: ReactElement;
  error: string | null;
}

export function MarkdownPreview({ content, error }: MarkdownPreviewProps) {
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
