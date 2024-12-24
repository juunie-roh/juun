import clsx from 'clsx';

import type { BadgeProps } from '@/types/ui.types';

const Badge = (props: BadgeProps) => {
  const { variant, outline, size = 'md', className, children } = props;

  return (
    <div
      className={clsx([
        'badge',
        // Badge Styles
        {
          'badge-neutral': variant === 'neutral',
          'badge-primary': variant === 'primary',
          'badge-secondary': variant === 'secondary',
          'badge-accent': variant === 'accent',
          'badge-info': variant === 'info',
          'badge-success': variant === 'success',
          'badge-warning': variant === 'warning',
          'badge-error': variant === 'error',
          'badge-ghost': variant === 'ghost',
          'badge-outline': outline,
        },
        // Badge Sizes
        {
          'badge-xs': size === 'xs',
          'badge-sm': size === 'sm',
          'badge-md': size === 'md',
          'badge-lg': size === 'lg',
        },
        // Other Tailwindcss Classes
        className,
      ])}
    >
      {children}
    </div>
  );
};

export default Badge;
