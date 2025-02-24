'use client';

import { TriangleAlert } from 'lucide-react';
import { type ElementType, forwardRef, useState } from 'react';

import { cn } from '@/utils';

// Types
interface Angle {
  start: number;
  end: number;
}

interface Point {
  x: number;
  y: number;
}

export type WheelType = 'confirm' | 'four' | 'five';

interface WheelRootProps extends React.HTMLAttributes<HTMLDivElement> {}

interface WheelSectorProps {
  index: number;
  angle: Angle;
  radius: number;
  innerRadius: number;
  rotation: number;
  icon: ElementType;
  isHovered: boolean;
  onHoverChange: (index: number | null) => void;
  onSelect?: (index: number) => void;
}

interface WheelTitleProps extends React.HTMLAttributes<HTMLDivElement> {}

export interface WheelProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  type: WheelType;
  onSelect?: (index: number) => void;
  icons?: ElementType[];
  titles?: string[];
  radius?: number;
  innerRadius?: number;
}

const DEFAULT_TITLES = [
  'Action 0',
  'Action 1',
  'Action 2',
  'Action 3',
  'Action 4',
];

// Helper functions
const calculatePoint = (angle: number, radius: number): Point => ({
  x: 100 + radius * Math.cos((angle * Math.PI) / 180),
  y: 100 + radius * Math.sin((angle * Math.PI) / 180),
});

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
}): string => {
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
const WheelRoot = forwardRef<HTMLDivElement, WheelRootProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn('relative size-[200px]', className)}
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
}: WheelSectorProps) => {
  const midRadius = (radius + innerRadius) / 2;
  const angleInRadians = (rotation * Math.PI) / 180;
  const x = 100 + midRadius * Math.cos(angleInRadians);
  const y = 100 + midRadius * Math.sin(angleInRadians);

  return (
    <g
      className={cn(
        'origin-center transition-all duration-300',
        isHovered ? 'scale-110 opacity-100' : 'opacity-80',
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
        className="cursor-pointer fill-[hsl(var(--primary))]"
        onMouseEnter={() => onHoverChange(index)}
        onMouseLeave={() => onHoverChange(null)}
        onClick={() => onSelect?.(index)}
      />
      <Icon
        x={x - 12}
        y={y - 12}
        textAnchor="middle"
        dominantBaseline="middle"
        stroke="hsl(var(--primary-foreground))"
        className="pointer-events-none"
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
        'absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center bg-primary text-primary-foreground px-2 py-1 rounded-sm pointer-events-none whitespace-nowrap text-sm',
        className,
      )}
      {...props}
    />
  ),
);
WheelTitle.displayName = 'WheelTitle';

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
        className={cn('relative size-[200px]', className)}
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
