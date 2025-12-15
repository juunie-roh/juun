import { cn } from "@juun/ui/lib/utils";
import React from "react";

export default function MaxWidthLayout({
  children,
  "border-x": borderX,
}: Readonly<{
  children: React.ReactNode;
  "border-x"?: boolean;
}>) {
  return (
    <div className={cn("mx-auto max-w-7xl", borderX && "xl:border-x")}>
      {children}
    </div>
  );
}
