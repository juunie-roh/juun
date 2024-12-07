import clsx from 'clsx';

import type { KbdProps } from '@/types/ui.types';

const Kbd = (props: KbdProps) => {
  const { size = 'md', children } = props;

  const kbdClasses = clsx('kbd', {
    'kbd-lg': size === 'lg',
    'kbd-md': size === 'md',
    'kbd-sm': size === 'sm',
    'kbd-xs': size === 'xs',
  });

  return <kbd className={kbdClasses}>{children}</kbd>;
};

export default Kbd;
