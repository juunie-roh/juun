import { cn } from "@juun/ui/lib/utils";
import React from "react";

export default function FullScreenLayout({
  children,
  "fix-height": fixHeight,
}: Readonly<{
  children: React.ReactNode;
  "fix-height"?: boolean;
}>) {
  return (
    <div
      className={cn(
        "relative min-h-[calc(100vh-var(--spacing-header)-1px)]",
        fixHeight && "h-[calc(100vh-var(--spacing-header)-1px)]",
      )}
    >
      {children}
    </div>
  );
}
