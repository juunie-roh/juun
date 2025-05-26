import { HTMLAttributes } from 'react';

import { Tooltip, TooltipContent, TooltipTrigger } from './tooltip';

interface AbbrProps {
  title?: HTMLAttributes<HTMLElement>['title'];
  children?: HTMLAttributes<HTMLElement>['children'];
}
/**
 * This returns a `Tooltip` root which must be under `TooltipProvider`.
 * @see {@link Tooltip}
 */
export function Abbr({ title, children }: AbbrProps) {
  return (
    <Tooltip delayDuration={500}>
      <TooltipTrigger asChild className="underline decoration-dotted">
        <abbr aria-label={title}>{children}</abbr>
      </TooltipTrigger>
      <TooltipContent side="bottom">
        <p>{title}</p>
      </TooltipContent>
    </Tooltip>
  );
}
