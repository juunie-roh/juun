'use client';

import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { TriangleAlert } from 'lucide-react';
import type { ElementType, HTMLAttributes, SVGAttributes } from 'react';
import { forwardRef, useState } from 'react';

import { cn } from '@/utils';

// Internal Types
type Angle = { start: number; end: number };
type Point = { x: number; y: number };
interface WheelRootProps extends HTMLAttributes<HTMLDivElement> {}
interface WheelSectorProps
  extends VariantProps<typeof pathVariants>,
    VariantProps<typeof iconVariants> {
  index: number;
  angle: Angle;
  radius: number;
  innerRadius: number;
  rotation: number;
  icon: ElementType;
  isHovered: boolean;
  onHoverChange: (index: number | null) => void;
  onSelect?: (index: number) => void;
  iconSize?: number; // Size of the icon (defaults to 24)
}
interface WheelTitleProps extends HTMLAttributes<HTMLDivElement> {}

const DEFAULT_TITLES = [
  'Action 0',
  'Action 1',
  'Action 2',
  'Action 3',
  'Action 4',
];
// Variants:
const wheelVariants = cva('relative size-[200px]', {
  variants: {
    variant: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      destructive: 'bg-destructive text-destructive-foreground',
      outline: 'border bg-background',
    },
  },
});

const pathVariants = cva('cursor-pointer', {
  variants: {
    variant: {
      primary: 'fill-primary',
      secondary: 'fill-secondary',
      destructive: 'fill-destructive',
      outline: 'fill-background stroke-input',
    },
    isHovered: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      isHovered: true,
      className: 'fill-primary/90 stroke-primary',
    },
    {
      variant: 'secondary',
      isHovered: true,
      className: 'fill-secondary/80',
    },
    {
      variant: 'destructive',
      isHovered: true,
      className: 'fill-destructive/90',
    },
    {
      variant: 'outline',
      isHovered: true,
      className: 'fill-accent stroke-accent',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    isHovered: false,
  },
});

const iconVariants = cva('pointer-events-none', {
  variants: {
    variant: {
      primary: 'stroke-primary-foreground',
      secondary: 'stroke-secondary-foreground',
      destructive: 'stroke-destructive-foreground',
      outline: '',
    },
    isHovered: {
      true: '',
      false: '',
    },
  },
  compoundVariants: [
    {
      variant: 'outline',
      isHovered: true,
      className: 'stroke-accent-foreground',
    },
  ],
  defaultVariants: {
    variant: 'primary',
    isHovered: false,
  },
});

/**
 * Calculate the Cartesian coordinates from `angle` and `radius`.
 * @param angle
 * @param radius
 */
const calculatePoint = (angle: number, radius: number): Point => ({
  x: 100 + radius * Math.cos((angle * Math.PI) / 180),
  y: 100 + radius * Math.sin((angle * Math.PI) / 180),
});
/**
 * Draw a circle having `radius` from `startAngle` to `endAngle`, excluding the circle having `innerRadius`.
 * @param startAngle Degree to start circle
 * @param endAngle Degree to end circle
 * @param radius Radius of outer circle
 * @param innerRadius Radius of inner circle to be excluded
 */
const getSectorPath = ({
  startAngle,
  endAngle,
  radius,
  innerRadius,
}: {
  startAngle: number;
  endAngle: number;
  radius: number;
  innerRadius: number;
}): SVGAttributes<SVGPathElement>['d'] => {
  const start = calculatePoint(startAngle, innerRadius);
  const end = calculatePoint(startAngle, radius);
  const start2 = calculatePoint(endAngle, radius);
  const end2 = calculatePoint(endAngle, innerRadius);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${start.x} ${start.y}
          L ${end.x} ${end.y}
          A ${radius} ${radius} 0 ${largeArcFlag} 1 ${start2.x} ${start2.y}
          L ${end2.x} ${end2.y}
          A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${start.x} ${start.y}`;
};

// Internal Components
/**
 * Determines the size of the wheel.
 */
const WheelRoot = forwardRef<HTMLDivElement, WheelRootProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'relative size-[200px]',
        className,
        'bg-transparent border-none',
      )}
      {...props}
    />
  ),
);
WheelRoot.displayName = 'WheelRoot';

const WheelSector = ({
  index,
  angle,
  radius,
  innerRadius,
  rotation,
  icon: Icon,
  isHovered,
  onHoverChange,
  onSelect = (index) => console.log('Wheel Menu Selected:', index),
  iconSize = 24,
  variant = 'primary',
}: WheelSectorProps) => {
  const midRadius = (radius + innerRadius) / 2;
  const angleInRadians = (rotation * Math.PI) / 180;
  const x = 100 + midRadius * Math.cos(angleInRadians);
  const y = 100 + midRadius * Math.sin(angleInRadians);

  return (
    <g
      className={cn(
        'origin-center transition-all duration-300',
        isHovered && 'scale-110',
      )}
    >
      <path
        d={getSectorPath({
          startAngle: angle.start,
          endAngle: angle.end,
          radius,
          innerRadius,
        })}
        strokeWidth="1"
        className={cn(pathVariants({ variant, isHovered }))}
        onMouseEnter={() => onHoverChange(index)}
        onMouseLeave={() => onHoverChange(null)}
        onClick={() => onSelect?.(index)}
      />
      <Icon
        x={x - iconSize / 2}
        y={y - iconSize / 2}
        textAnchor="middle"
        dominantBaseline="middle"
        className={cn(
          iconVariants({ variant, isHovered }),
          `text-[${iconSize}px]`,
        )}
      />
    </g>
  );
};
WheelSector.displayName = 'WheelSector';

const WheelTitle = forwardRef<HTMLDivElement, WheelTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-secondary text-secondary-foreground px-2 py-1 rounded-sm pointer-events-none whitespace-nowrap text-sm',
        className,
      )}
      {...props}
    />
  ),
);
WheelTitle.displayName = 'WheelTitle';

export type WheelType = 'confirm' | 'four' | 'five';
export interface WheelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'>,
    VariantProps<typeof wheelVariants> {
  type: WheelType;
  onSelect?: (index: number) => void;
  icons?: ElementType[];
  titles?: string[];
  radius?: number;
  innerRadius?: number;
}

// Main Component
const Wheel = forwardRef<HTMLDivElement, WheelProps>(
  (
    {
      type,
      onSelect,
      icons,
      titles = DEFAULT_TITLES,
      radius = 80,
      innerRadius = 35,
      className,
      variant,
      ...props
    },
    ref,
  ) => {
    const [hovered, setHovered] = useState<number | null>(null);

    const getAngles = () => {
      switch (type) {
        case 'confirm':
          return [
            { start: 0 - 45, end: 0 + 45 },
            { start: 180 - 45, end: 180 + 45 },
          ];
        case 'four':
          return Array.from({ length: 4 }, (_, i) => ({
            start: i * 90 - 90,
            end: (i + 1) * 90 - 90,
          }));
        case 'five':
          return Array.from({ length: 5 }, (_, i) => ({
            start: i * 72 - 90,
            end: (i + 1) * 72 - 90,
          }));
        default:
          return [];
      }
    };

    const angles = getAngles();

    return (
      <WheelRoot
        ref={ref}
        className={cn(wheelVariants({ variant, className }))}
        {...props}
      >
        <svg viewBox="0 0 200 200">
          <g transform="translate(0, 0)">
            {angles.map((angle, i) => {
              const rotation = (angle.start + angle.end) / 2;
              const Comp = icons ? icons[i]! : TriangleAlert;

              return (
                <WheelSector
                  key={i}
                  index={i}
                  angle={angle}
                  radius={radius}
                  innerRadius={innerRadius}
                  rotation={rotation}
                  icon={Comp}
                  isHovered={hovered === i}
                  onHoverChange={setHovered}
                  onSelect={onSelect}
                  variant={variant}
                />
              );
            })}
          </g>
        </svg>

        {hovered !== null && titles[hovered] && (
          <WheelTitle>{titles[hovered]}</WheelTitle>
        )}
      </WheelRoot>
    );
  },
);
Wheel.displayName = 'Wheel';

export { Wheel };
