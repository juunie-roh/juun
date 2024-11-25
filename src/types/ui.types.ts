import type { ButtonHTMLAttributes } from 'react';

type ButtonVariant =
  | 'neutral'
  | 'primary'
  | 'secondary'
  | 'accent'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'
  | 'ghost'
  | 'link'
  | 'outline';

type ButtonSize = 'lg' | 'md' | 'sm' | 'xs';

type ButtonShape = 'wide' | 'block' | 'circle' | 'square';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  glass?: boolean;
  'no-animation'?: boolean;
  shape?: ButtonShape;
}
