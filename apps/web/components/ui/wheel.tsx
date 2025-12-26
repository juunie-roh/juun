"use client";

import type { VariantProps } from "class-variance-authority";
import { cva } from "class-variance-authority";
import { TriangleAlert } from "lucide-react";
import type { HTMLAttributes, ReactElement, SVGAttributes } from "react";
import { Children, forwardRef, isValidElement, useState } from "react";

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
  extends VariantProps<typeof pathVariants>,
    VariantProps<typeof iconVariants> {
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
}
interface WheelTitleProps extends HTMLAttributes<HTMLDivElement> {}

// Variants:
const wheelVariants = cva("relative size-[200px]", {
  variants: {
    variant: {
      primary: "bg-primary text-primary-foreground",
      secondary: "bg-secondary text-secondary-foreground",
      destructive: "bg-destructive text-accent",
      outline: "border bg-background",
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
      className: "fill-primary/90 stroke-primary",
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
      className: "fill-destructive/90",
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
}): SVGAttributes<SVGPathElement>["d"] => {
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
 * Determines the wrapper size of the wheel.
 */
const WheelRoot = forwardRef<HTMLDivElement, WheelRootProps>(
  ({ className, size = 200, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        `relative size-[${size}px]`,
        className,
        "border-none bg-transparent",
      )}
      {...props}
    />
  ),
);
WheelRoot.displayName = "WheelRoot";

const WheelContent = ({
  children,
  title,
  disabled = false,
  ...props
}: WheelContentProps) => {
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
};
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
  onSelect = (index) => console.log("Wheel Menu Selected:", index),
  iconSize = 24,
  variant = "primary",
}: WheelSectorProps) => {
  const midRadius = (radius + innerRadius) / 2;
  const angleInRadians = (rotation * Math.PI) / 180;
  const x = 100 + midRadius * Math.cos(angleInRadians);
  const y = 100 + midRadius * Math.sin(angleInRadians);

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

  // Handle icon rendering within SVG context
  const iconElement = isValidElement(icon) ? (
    <g
      transform={`translate(${x - iconSize / 2}, ${y - iconSize / 2})`}
      style={{ pointerEvents: "none" }}
    >
      <foreignObject
        width={iconSize}
        height={iconSize}
        style={{ pointerEvents: "none" }}
      >
        <div
          className={cn(
            iconVariants({ variant, isHovered, isDisabled }),
            "flex h-full w-full items-center justify-center",
          )}
          style={{ pointerEvents: "none" }}
        >
          {icon}
        </div>
      </foreignObject>
    </g>
  ) : (
    <TriangleAlert
      x={x - iconSize / 2}
      y={y - iconSize / 2}
      width={iconSize}
      height={iconSize}
      className={cn(iconVariants({ variant, isHovered, isDisabled }))}
    />
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
WheelSector.displayName = "WheelSector";

const WheelTitle = forwardRef<HTMLDivElement, WheelTitleProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-sm bg-secondary px-2 py-1 text-center text-sm whitespace-nowrap text-secondary-foreground",
        className,
      )}
      {...props}
    />
  ),
);
WheelTitle.displayName = "WheelTitle";

interface WheelProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "onSelect" | "children">,
    VariantProps<typeof wheelVariants> {
  /** Callback to execute on menu selected */
  onSelect?: (index: number, title?: string) => void;
  /** WheelContent components */
  children: React.ReactNode;
  size?: number;
  radius?: number;
  innerRadius?: number;
}

// Main Component
const Wheel = forwardRef<HTMLDivElement, WheelProps>(
  (
    {
      children,
      onSelect,
      size = 200,
      radius = 80,
      innerRadius = 35,
      className,
      variant,
      ...props
    },
    ref,
  ) => {
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

    const getAngles = () => {
      // Specify the shape for wheel with 2 menus.
      if (num === 2) {
        return [
          { start: -45, end: 45 },
          { start: 135, end: 225 },
        ];
      }

      const a = 360 / num;
      return Array.from({ length: num }, (_, i) => ({
        start: i * a - 90,
        end: (i + 1) * a - 90,
      }));
    };

    const angles = getAngles();

    const viewBoxSize = Math.max(size, 2 * (radius * 1.2)); // 20% extra space for hover scaling
    const viewBoxOrigin = size / 2 - viewBoxSize / 2;
    const viewBox = `${viewBoxOrigin} ${viewBoxOrigin} ${viewBoxSize} ${viewBoxSize}`;

    const handleSelect = (index: number) => {
      onSelect?.(index, wheelItems[index]?.title);
    };

    return (
      <WheelRoot
        ref={ref}
        size={viewBoxSize}
        className={cn(
          wheelVariants({ variant, className }),
          size && `size-[${size}px]`,
        )}
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
                />
              );
            })}
          </g>
        </svg>

        {hovered !== null && (
          <WheelTitle>{wheelItems[hovered]?.title || ""}</WheelTitle>
        )}
      </WheelRoot>
    );
  },
);
Wheel.displayName = "Wheel";

export { Wheel, WheelContent, type WheelContentProps, type WheelProps };
