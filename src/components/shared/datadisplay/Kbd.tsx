import clsx from 'clsx';

import type { KbdProps } from '@/types/ui.types';

const Kbd = (props: KbdProps) => {
  const { size = 'md', children } = props;

  return (
    <kbd
      className={clsx('kbd', {
        'kbd-lg': size === 'lg',
        'kbd-md': size === 'md',
        'kbd-sm': size === 'sm',
        'kbd-xs': size === 'xs',
      })}
    >
      {children}
    </kbd>
  );
};

export default Kbd;
