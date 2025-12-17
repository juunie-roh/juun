import { cn } from "@juun/ui/lib/utils";
import React from "react";

export default function MaxWidthLayout({
  children,
  borderX,
}: Readonly<{
  children: React.ReactNode;
  borderX?: boolean;
}>) {
  return (
    <div
      className={cn("mx-auto size-full max-w-7xl", borderX && "xl:border-x")}
    >
      {children}
    </div>
  );
}
