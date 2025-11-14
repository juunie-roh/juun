import { cn } from "@juun/ui/lib/utils";
import React from "react";

export default function BaseLayout({
  children,
  fixHeight,
}: Readonly<{
  children: React.ReactNode;
  fixHeight?: boolean;
}>) {
  return (
    <div
      className={cn(
        "relative min-h-[calc(100vh-var(--spacing-header)-1px)] px-4 py-8",
        fixHeight && "h-[calc(100vh-var(--spacing-header)-1px)]",
      )}
    >
      {children}
    </div>
  );
}
