import type { ComponentProps } from "react";

import { cn } from "@/lib/utils";

function Prose({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose max-w-none prose-zinc dark:prose-invert prose-headings:tracking-tight",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Prose };
