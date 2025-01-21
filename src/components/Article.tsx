import type { HTMLAttributes } from 'react';

import { cn } from '@/utils';

interface ArticleProps extends HTMLAttributes<HTMLElement> {}

export default function Article({
  className,
  children,
  ...props
}: ArticleProps) {
  return (
    <article className={cn('prose', className)} {...props}>
      {children}
    </article>
  );
}
