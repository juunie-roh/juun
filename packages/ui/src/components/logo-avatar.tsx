import { cn } from '@pkg/ui/lib/utils';
import React from 'react';

interface LogoAvatarProps
  extends Omit<React.HTMLProps<HTMLDivElement>, 'color'> {
  color?: string | false;
  children: React.ReactElement;
}

export function LogoAvatar({
  color,
  children,
  className,
  ...props
}: LogoAvatarProps) {
  if (!React.isValidElement(children)) {
    console.warn('LogoAvatar requires an SVG or image element as children');
    return null;
  }

  // Check if the child is an SVG element or component
  const isSvgElement =
    children.type === 'svg' || // Direct SVG element
    (typeof children.type === 'function' &&
      (children.props as React.SVGProps<SVGSVGElement>)?.xmlns?.includes(
        'svg',
      )) || // Check xmlns prop
    (children.props as React.SVGProps<SVGSVGElement>)?.viewBox !== undefined; // Most SVGs have viewBox

  let c: string | undefined;
  if (color === false) {
    c = undefined; // Explicitly don't apply color
  } else if (typeof color === 'string') {
    c = color; // Use provided color
  } else if (isSvgElement) {
    c = 'primary'; // Default for SVG elements
  }

  // Create background (blurred) and foreground versions of the logo
  const backgroundLogo = React.cloneElement(children, {
    'aria-hidden': 'true',
    className: cn(
      'absolute z-[1] size-full scale-[2] opacity-20 blur-md',
      c && (c.startsWith('#') ? 'fill-[var(--logo-color)]' : `fill-${c}`),
    ),
  } as React.HTMLAttributes<Element>);

  const foregroundLogo = React.cloneElement(children, {
    className: cn(
      'z-[2] size-[70%] drop-shadow-[0_1px_4px_rgba(0,0,0,0.12)]',
      c && (c.startsWith('#') ? 'fill-[var(--logo-color)]' : `fill-${c}`),
    ),
  } as React.HTMLAttributes<Element>);

  return (
    <div
      className={cn(
        'relative flex size-7 items-center justify-center overflow-hidden rounded-md shadow-[inset_0_0_1px_1px_rgba(0,0,0,0.015)]',
        className,
      )}
      {...props}
      style={
        {
          '--logo-color': c && c.startsWith('#') ? c : undefined,
          ...props.style,
        } as React.CSSProperties
      }
    >
      {backgroundLogo}
      {foregroundLogo}
    </div>
  );
}
