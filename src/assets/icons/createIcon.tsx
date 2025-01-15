// src/assets/icons/createIcon.tsx
import type { SVGProps } from 'react';
import { forwardRef, useEffect, useState } from 'react';

import { cn } from '@/utils/className';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number | string;
  color?: string;
  strokeWidth?: number;
  className?: string;
}

type SvgComponent = React.ComponentType<React.SVGProps<SVGSVGElement>>;

export default function createIcon(
  importPromise: Promise<{ default: SvgComponent }>,
) {
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
      const [Svg, setSvg] = useState<SvgComponent | null>(null);

      useEffect(() => {
        importPromise.then((module) => {
          setSvg(() => module.default);
        });
      }, []);

      if (!Svg) return null;

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
