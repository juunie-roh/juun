"use client";

import { ReactNode } from "react";

import { cn } from "../lib/utils";

interface MarqueeProps {
  children: ReactNode;
  direction?: "left" | "right";
  className?: string;
}

export function Marquee({
  children,
  direction = "left",
  className,
}: MarqueeProps) {
  return (
    <div className={cn("relative flex overflow-x-hidden", className)}>
      <div
        className={cn(
          "py-12 whitespace-nowrap",
          direction === "left" ? "animate-marquee" : "animate-marquee-reverse",
        )}
      >
        {children}
      </div>
      <div
        className={cn(
          "absolute top-0 py-12 whitespace-nowrap",
          direction === "left"
            ? "animate-marquee2"
            : "animate-marquee2-reverse",
        )}
      >
        {children}
      </div>
    </div>
  );
}
