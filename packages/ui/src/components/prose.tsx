import { cn } from "@juun/ui/lib/utils";
import type { ComponentProps } from "react";

function Prose({ className, children, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "prose prose-zinc dark:prose-invert prose-headings:tracking-tight max-w-none",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export { Prose };
