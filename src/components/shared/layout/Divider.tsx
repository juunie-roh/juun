import clsx from 'clsx';

import type { DividerProps } from '@/types/ui.types';

const Divider = (props: DividerProps) => {
  const { children, variant, direction, position, className } = props;

  return (
    <div
      className={clsx([
        'divider',
        {
          'divider-neutral': variant === 'neutral',
          'divider-primary': variant === 'primary',
          'divider-secondary': variant === 'secondary',
          'divider-accent': variant === 'accent',
          'divider-info': variant === 'info',
          'divider-success': variant === 'success',
          'divider-warning': variant === 'warning',
          'divider-error': variant === 'error',
        },
        {
          'divider-horizontal': direction === 'horizontal',
          'divider-vertical': direction === 'vertical',
        },
        {
          'divider-start': position === 'start',
          'divider-end': position === 'end',
        },
        className,
      ])}
    >
      {children}
    </div>
  );
};

export default Divider;
