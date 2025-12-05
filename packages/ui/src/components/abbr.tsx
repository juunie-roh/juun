import type { TooltipProps } from "@radix-ui/react-tooltip";
import { HTMLAttributes } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";

export interface AbbrProps {
  title?: HTMLAttributes<HTMLElement>["title"];
  children?: HTMLAttributes<HTMLElement>["children"];
  delayDuration?: TooltipProps["delayDuration"];
}
/**
 * This returns a `Tooltip` root which must be under `TooltipProvider`.
 * @see {@link Tooltip}
 */
export function Abbr({ title, children, delayDuration }: AbbrProps) {
  return (
    <Tooltip delayDuration={delayDuration}>
      <TooltipTrigger asChild className="underline decoration-dotted">
        <abbr>{children}</abbr>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
}
