import { cn } from '@pkg/ui/lib/utils';
import { ClassValue } from 'clsx';
import { FC, SVGProps } from 'react';

interface LogoAvatarProps {
  color: string;
  logo: FC<SVGProps<SVGSVGElement>>;
  className?: ClassValue;
}

export function LogoAvatar({ color, logo, className }: LogoAvatarProps) {
  const Logo = logo;
  const c = color.startsWith('#') ? `[${color}]` : color;
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
          'absolute z-[1] size-full scale-[2] fill-primary opacity-20 blur-md',
          `fill-${c}`,
        )}
      />
      <Logo
        className={cn(
          'z-[2] size-[70%] fill-primary drop-shadow-[0_1px_4px_rgba(0,0,0,0.12)]',
          `fill-${c}`,
        )}
      />
    </div>
  );
}
