"use client";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { TriangleAlert } from "lucide-react";
import type { HTMLAttributes, ReactElement, SVGAttributes } from "react";
import { Children, cloneElement, isValidElement, useState } from "react";

import { cn } from "@/lib/utils";

// Internal Types
type Angle = { start: number; end: number };
type Point = { x: number; y: number };
interface WheelRootProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}
interface WheelContentProps extends HTMLAttributes<HTMLDivElement> {
  title?: string;
  disabled?: boolean;
  children: ReactElement;
}
interface WheelSectorProps
  extends VariantProps<typeof pathVariants>, VariantProps<typeof iconVariants> {
  index: number;
  angle: Angle;
  radius: number;
  innerRadius: number;
  rotation: number;
  icon: ReactElement;
  title?: string;
  isHovered: boolean;
  isDisabled: boolean;
  onHoverChange: (index: number | null) => void;
  onSelect?: (index: number) => void;
  iconSize?: number;
  center: number;
}
interface WheelTitleProps extends HTMLAttributes<HTMLDivElement> {}

// Variants:
const wheelVariants = cva("relative size-[300px]", {
  variants: {
    variant: {
      primary: "",
      secondary: "",
      destructive: "",
      outline: "",
    },
  },
});

const pathVariants = cva("", {
  variants: {
    variant: {
      primary: "fill-primary",
      secondary: "fill-secondary",
      destructive: "fill-destructive",
      outline: "fill-background stroke-input",
    },
    isHovered: {
      true: "",
      false: "",
    },
    isDisabled: {
      true: "cursor-not-allowed opacity-50",
      false: "cursor-pointer",
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      isHovered: true,
      isDisabled: false,
      className: "fill-primary/90",
    },
    {
      variant: "secondary",
      isHovered: true,
      isDisabled: false,
      className: "fill-secondary/80",
    },
    {
      variant: "destructive",
      isHovered: true,
      isDisabled: false,
      className: "fill-destructive/80",
    },
    {
      variant: "outline",
      isHovered: true,
      isDisabled: false,
      className: "fill-accent stroke-accent",
    },
  ],
  defaultVariants: {
    variant: "primary",
    isHovered: false,
    isDisabled: false,
  },
});

const iconVariants = cva("pointer-events-none", {
  variants: {
    variant: {
      primary: "stroke-primary-foreground",
      secondary: "stroke-secondary-foreground",
      destructive: "stroke-accent",
      outline: "",
    },
    isHovered: {
      true: "",
      false: "",
    },
    isDisabled: {
      true: "opacity-60",
      false: "",
    },
  },
  compoundVariants: [
    {
      variant: "outline",
      isHovered: true,
      isDisabled: false,
      className: "stroke-accent-foreground",
    },
  ],
  defaultVariants: {
    variant: "primary",
    isHovered: false,
    isDisabled: false,
  },
});

const round = (n: number) => Math.round(n * 10) / 10;

/**
 * Calculate the Cartesian coordinates from `angle` and `radius`.
 * @param angle
 * @param radius
 * @param center SVG coordinate space center (= size / 2).
 */
const calculatePoint = (
  angle: number,
  radius: number,
  center: number,
): Point => ({
  x: round(center + radius * Math.cos((angle * Math.PI) / 180)),
  y: round(center + radius * Math.sin((angle * Math.PI) / 180)),
});

/**
 * Draw a circle having `radius` from `startAngle` to `endAngle`, excluding the circle having `innerRadius`.
 * @param startAngle Degree to start circle.
 * @param endAngle Degree to end circle.
 * @param radius Radius of outer circle.
 * @param innerRadius Radius of inner circle to be excluded.
 * @param center SVG coordinate space center (= size / 2).
 */
const getSectorPath = ({
  startAngle,
  endAngle,
  radius,
  innerRadius,
  center,
}: {
  startAngle: number;
  endAngle: number;
  radius: number;
  innerRadius: number;
  center: number;
}): SVGAttributes<SVGPathElement>["d"] => {
  const start = calculatePoint(startAngle, innerRadius, center);
  const end = calculatePoint(startAngle, radius, center);
  const start2 = calculatePoint(endAngle, radius, center);
  const end2 = calculatePoint(endAngle, innerRadius, center);

  const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

  return `M ${start.x} ${start.y}
          L ${end.x} ${end.y}
          A ${radius} ${radius} 0 ${largeArcFlag} 1 ${start2.x} ${start2.y}
          L ${end2.x} ${end2.y}
          A ${innerRadius} ${innerRadius} 0 ${largeArcFlag} 0 ${start.x} ${start.y}`;
};

// Internal Components
/**
 * Determines the wrapper size of the wheel.
 */
function WheelRoot({ className, size = 200, style, ...props }: WheelRootProps) {
  return (
    <div
      className={cn("relative", className, "border-none bg-transparent")}
      style={{ width: size, height: size, ...style }}
      {...props}
    />
  );
}

function WheelContent({
  children,
  title,
  disabled = false,
  ...props
}: WheelContentProps) {
  return (
    <div
      data-wheel-content
      data-title={title}
      data-disabled={disabled}
      {...props}
    >
      {children}
    </div>
  );
}
WheelContent.displayName = "WheelContent";

const WheelSector = ({
  index,
  angle,
  radius,
  innerRadius,
  rotation,
  icon,
  isHovered,
  isDisabled,
  onHoverChange,
  onSelect = () => {},
  iconSize = 24,
  center,
  variant = "primary",
}: WheelSectorProps) => {
  const midRadius = (radius + innerRadius) / 2;
  const angleInRadians = (rotation * Math.PI) / 180;
  const x = center + midRadius * Math.cos(angleInRadians);
  const y = center + midRadius * Math.sin(angleInRadians);

  const handleMouseEnter = () => {
    if (!isDisabled) {
      onHoverChange(index);
    }
  };

  const handleMouseLeave = () => {
    if (!isDisabled) {
      onHoverChange(null);
    }
  };

  const handleClick = () => {
    if (!isDisabled) {
      onSelect?.(index);
    }
  };

  const iconToRender = isValidElement(icon) ? icon : <TriangleAlert />;
  const iconElement = (
    <g
      transform={`translate(${x - iconSize / 2}, ${y - iconSize / 2})`}
      style={{ pointerEvents: "none" }}
    >
      {cloneElement(iconToRender, {
        width: iconSize,
        height: iconSize,
        className: cn(iconVariants({ variant, isHovered, isDisabled })),
      })}
    </g>
  );

  return (
    <g
      className={cn(
        "origin-center transition-all duration-300",
        isHovered && !isDisabled && "scale-110",
      )}
    >
      <path
        d={getSectorPath({
          startAngle: angle.start,
          endAngle: angle.end,
          radius,
          innerRadius,
          center,
        })}
        strokeWidth={!isDisabled ? "2" : "1"}
        className={cn(pathVariants({ variant, isHovered, isDisabled }))}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        style={{ pointerEvents: isDisabled ? "none" : "auto" }}
      />
      {iconElement}
    </g>
  );
};

function WheelTitle({ className, ...props }: WheelTitleProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-secondary px-2 py-1 text-center text-sm whitespace-nowrap text-secondary-foreground",
        className,
      )}
      {...props}
    />
  );
}

function getAngles(num: number): Angle[] {
  if (num === 2)
    return [
      { start: -45, end: 45 },
      { start: 135, end: 225 },
    ];

  const a = 360 / num;

  return Array.from({ length: num }, (_, i) => ({
    start: i * a - 90,
    end: (i + 1) * a - 90,
  }));
}

interface WheelProps
  extends
    Omit<HTMLAttributes<HTMLDivElement>, "onSelect" | "children">,
    VariantProps<typeof wheelVariants> {
  /**
   * Callback to execute on menu selected.
   */
  onSelect?: (index: number, title?: string) => void;
  /**
   * WheelContent components.
   */
  children: React.ReactNode;

  size?: number;
  radius?: number;
  innerRadius?: number;
  iconSize?: number;
}

// Main Component
function Wheel({
  children,
  onSelect,
  size = 200,
  radius = 80,
  innerRadius = 35,
  iconSize,
  className,
  variant,
  ...props
}: WheelProps) {
  // Parse children to extract WheelContent data
  const wheelItems = Children.toArray(children)
    .filter(
      (child): child is ReactElement =>
        isValidElement(child) &&
        typeof child.type === "function" &&
        (child.type as any).displayName === "WheelContent",
    )
    .map((child) => {
      const props = child.props as WheelContentProps;
      return {
        icon: props.children,
        title: props.title,
        disabled: props.disabled || false,
      };
    });

  const num = wheelItems.length;

  if (num < 2)
    throw new Error("Wheel requires at least 2 WheelContent children");

  const [hovered, setHovered] = useState<number | null>(null);

  const angles = getAngles(num);

  const center = size / 2;
  const viewBoxSize = Math.max(size, 2 * (radius * 1.2)); // 20% extra space for hover scaling
  const viewBoxOrigin = size / 2 - viewBoxSize / 2;
  const viewBox = `${viewBoxOrigin} ${viewBoxOrigin} ${viewBoxSize} ${viewBoxSize}`;

  const handleSelect = (index: number) => {
    onSelect?.(index, wheelItems[index]?.title);
  };

  return (
    <WheelRoot
      size={size}
      className={cn(wheelVariants({ variant, className }))}
      {...props}
    >
      <svg viewBox={viewBox}>
        <g>
          {angles.map((angle, i) => {
            const rotation = (angle.start + angle.end) / 2;
            const item = wheelItems[i];
            const icon = item?.icon || <TriangleAlert />;

            return (
              <WheelSector
                key={i}
                index={i}
                angle={angle}
                radius={radius}
                innerRadius={innerRadius}
                rotation={rotation}
                icon={icon}
                title={item?.title}
                isHovered={hovered === i}
                isDisabled={item?.disabled || false}
                onHoverChange={setHovered}
                onSelect={handleSelect}
                variant={variant}
                center={center}
                iconSize={iconSize}
              />
            );
          })}
        </g>
      </svg>

      {hovered !== null ? (
        <WheelTitle>{wheelItems[hovered]?.title || ""}</WheelTitle>
      ) : null}
    </WheelRoot>
  );
}

export { Wheel, WheelContent, type WheelContentProps, type WheelProps };
