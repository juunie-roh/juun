import { Badge } from "@juun/ui/badge";
import { cn } from "@juun/ui/lib/utils";
import React from "react";

export default function TimelineTags({
  tags,
  className,
  children,
}: {
  tags: string[];
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("flex w-full flex-wrap gap-1.5", className)}>
      {children}
      {tags.map((tag) => (
        <Badge
          key={tag}
          variant={
            tag === "article" || tag === "playground" || tag === "ADR"
              ? "default"
              : "secondary"
          }
        >
          {tag}
        </Badge>
      ))}
    </div>
  );
}
