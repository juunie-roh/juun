import clsx from 'clsx';

import type { ButtonProps } from '@/types/ui.types';

const Button = (props: ButtonProps) => {
  const {
    variant,
    size = 'md',
    shape,
    disabled = false,
    glass = false,
    animation = true,
    children,
  } = props;

  const buttonClasses = clsx(
    'btn',
    // Button variants
    {
      'btn-neutral': variant === 'neutral',
      'btn-primary': variant === 'primary',
      'btn-secondary': variant === 'secondary',
      'btn-accent': variant === 'accent',
      'btn-info': variant === 'info',
      'btn-success': variant === 'success',
      'btn-warning': variant === 'warning',
      'btn-error': variant === 'error',
      'btn-ghost': variant === 'ghost',
      'btn-link': variant === 'link',
      'btn-outline': variant === 'outline',
    },

    // Button sizes
    {
      'btn-lg': size === 'lg',
      'btn-md': size === 'md',
      'btn-sm': size === 'sm',
      'btn-xs': size === 'xs',
    },

    // Button shapes
    {
      'btn-wide': shape === 'wide',
      'btn-block': shape === 'block',
      'btn-circle': shape === 'circle',
      'btn-square': shape === 'square',
    },

    // Special states
    {
      'btn-disabled': disabled,
      // eslint-disable-next-line prettier/prettier
      'glass': glass,
      'no-animation': !animation,
    },
  );

  return (
    <button className={buttonClasses} {...props}>
      {children}
    </button>
  );
};

export default Button;
