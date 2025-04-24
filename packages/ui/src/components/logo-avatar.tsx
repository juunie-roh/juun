import { cn } from '@pkg/ui/lib/utils';
import { FC, SVGProps } from 'react';

interface LogoAvatarProps extends HTMLDivElement {
  logo: FC<SVGProps<SVGSVGElement>>;
  color?: string;
}

/**
 * An avatar that has self-blurred background.
 * @see {@link https://codepen.io/pxco/PoNOLyX Blurred Backgrounds}
 */
export function LogoAvatar({ logo, color, className }: LogoAvatarProps) {
  const Logo = logo;
  const c = color?.startsWith('#') ? `[${color}]` : color;
  return (
    <div
      className={cn(
        'relative flex size-7 items-center justify-center overflow-hidden rounded-md shadow-[inset_0_0_1px_1px_rgba(0,0,0,0.015)]',
        className,
      )}
    >
      <Logo
        aria-hidden
        className={cn(
          'absolute z-[1] size-full scale-[2] opacity-20 blur-md',
          c && `fill-${c}`,
        )}
      />
      <Logo
        className={cn(
          'z-[2] size-[70%] drop-shadow-[0_1px_4px_rgba(0,0,0,0.12)]',
          c && `fill-${c}`,
        )}
      />
    </div>
  );
}
