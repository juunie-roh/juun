// src/assets/icons/createIcon.tsx
import type { SVGProps } from 'react';
import { forwardRef } from 'react';

import { cn } from '@/utils/className';

export interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

type SvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

// Add return type for better type inference
export type IconComponent = ReturnType<typeof createIcon>;

export default function createIcon(Svg: SvgComponent) {
  return forwardRef<SVGSVGElement, IconProps>(
    (
      {
        color = 'currentColor',
        size = 24,
        strokeWidth = 2,
        className,
        ...props
      },
      ref,
    ) => {
      return (
        <Svg
          ref={ref}
          width={size}
          height={size}
          stroke={color}
          strokeWidth={strokeWidth}
          className={cn('inline-block', className)}
          {...props}
        />
      );
    },
  );
}
