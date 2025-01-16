import React from 'react';
import { type SVGProps } from 'react';

import { cn } from '@/utils/className';

export interface IconProps extends SVGProps<SVGSVGElement> {
  /**
   * The imported SVG component to render
   */
  svg: React.FC<SVGProps<SVGSVGElement>>;
  /**
   * Size in pixels or a preset. This will be overridden by Tailwind size classes if present.
   * @example
   * // Using preset
   * <Icon size="sm" />
   * // Using number (pixels)
   * <Icon size={24} />
   * // Using Tailwind (takes precedence)
   * <Icon className="w-6 h-6" />
   */
  size?: 'sm' | 'md' | 'lg' | number;
  /**
   * Accessible label for the icon. Required unless decorative is true.
   */
  label?: string;
  /**
   * Whether the icon is purely decorative. If true, the icon will be hidden from screen readers.
   */
  decorative?: boolean;
  /**
   * Optional color applied to the stroke. Can be overridden by Tailwind classes.
   */
  color?: string;
  /**
   * Optional stroke width. Default is 2.
   */
  strokeWidth?: number;
}

const sizeMap = {
  sm: 16,
  md: 24,
  lg: 32,
} as const;

export const Icon = React.forwardRef<SVGSVGElement, IconProps>(
  (
    {
      svg: SvgComponent,
      size = 'md',
      label,
      decorative = false,
      className,
      color = 'currentColor',
      strokeWidth = 2,
      ...props
    },
    ref,
  ) => {
    // Calculate the base size in pixels
    const baseSize = typeof size === 'string' ? sizeMap[size] : size;

    // Create base styles that can be overridden by Tailwind classes
    const baseStyles = {
      width: baseSize,
      height: baseSize,
    };

    // Determine accessibility attributes
    const a11yProps = decorative
      ? { 'aria-hidden': 'true' as const, role: 'presentation' as const }
      : {
          'aria-label': label,
          role: 'img' as const,
          'aria-hidden': undefined as undefined | 'true',
        };

    // Base SVG properties that align with Lucide's defaults
    const svgProps: SVGProps<SVGSVGElement> = {
      xmlns: 'http://www.w3.org/2000/svg',
      width: '24',
      height: '24',
      viewBox: '0 0 24 24',
      fill: 'none',
      stroke: color,
      strokeWidth,
      strokeLinecap: 'round',
      strokeLinejoin: 'round',
      ...props,
    };

    return (
      <span
        style={baseStyles}
        className={cn(
          // Base classes that ensure proper sizing and alignment
          'inline-block shrink-0',
          '[&>svg]:!w-full [&>svg]:!h-full',
          // Allow className to override the base styles
          className,
        )}
      >
        <SvgComponent
          ref={ref}
          className="w-full h-full"
          {...svgProps}
          {...a11yProps}
        />
      </span>
    );
  },
);

// Set display name for better debugging and testing
Icon.displayName = 'Icon';
