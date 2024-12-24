import clsx from 'clsx';
import { default as NLink } from 'next/link';

import type { LinkProps } from '@/types/ui.types';

const Link = (props: LinkProps) => {
  const { href, children, variant, 'hover-only': hoverOnly, className } = props;

  return (
    <NLink
      className={clsx([
        'link',
        {
          'link-neutral': variant === 'neutral',
          'link-primary': variant === 'primary',
          'link-secondary': variant === 'secondary',
          'link-accent': variant === 'accent',
          'link-success': variant === 'success',
          'link-info': variant === 'info',
          'link-warning': variant === 'warning',
          'link-error': variant === 'error',
        },
        { 'link-hover': hoverOnly },
        className,
      ])}
      href={href}
    >
      {children}
    </NLink>
  );
};

export default Link;
