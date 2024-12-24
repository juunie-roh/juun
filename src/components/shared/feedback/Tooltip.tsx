import clsx from 'clsx';

import type { TooltipProps } from '@/types/ui.types';

const Tooltip = (props: TooltipProps) => {
  const {
    'data-tip': dataTip,
    children,
    variant,
    position = 'top',
    open,
    className,
  } = props;

  return (
    <div
      className={clsx([
        'tooltip',
        {
          'tooltip-top': position === 'top',
          'tooltip-bottom': position === 'bottom',
          'tooltip-left': position === 'left',
          'tooltip-right': position === 'right',
        },
        {
          'tooltip-neutral': variant === 'neutral',
          'tooltip-primary': variant === 'primary',
          'tooltip-secondary': variant === 'secondary',
          'tooltip-accent': variant === 'accent',
          'tooltip-info': variant === 'info',
          'tooltip-success': variant === 'success',
          'tooltip-warning': variant === 'warning',
          'tooltip-error': variant === 'error',
        },
        { 'tooltip-open': open },
        className,
      ])}
      data-tip={dataTip}
    >
      {children}
    </div>
  );
};

export default Tooltip;
