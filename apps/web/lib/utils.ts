import { Column } from "@tanstack/react-table";
import { type ClassValue, clsx } from "clsx";
import { createLucideIcon } from "lucide-react";
import type { FC, ReactElement } from "react";
import { twMerge } from "tailwind-merge";

type SVGElementType =
  | "circle"
  | "ellipse"
  | "g"
  | "line"
  | "path"
  | "polygon"
  | "polyline"
  | "rect";
type IconNode = [elementName: SVGElementType, attrs: Record<string, string>][];

/**
 * Combines multiple class names into a single string with Tailwind CSS conflict resolution.
 *
 * Uses `clsx` for conditional class name concatenation and `tailwind-merge` to
 * intelligently merge Tailwind classes, removing conflicts (e.g., only keeps the last
 * spacing/color class when multiple are provided).
 *
 * @param inputs - Any number of class values (strings, objects, arrays, etc.)
 * @returns A single merged class name string
 *
 * @example
 * ```tsx
 * cn('px-2 py-1', 'px-4') // Returns: 'py-1 px-4'
 * cn('text-red-500', condition && 'text-blue-500') // Returns: 'text-blue-500' if condition is true
 * ```
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Calculates inline styles for column pinning in TanStack Table.
 *
 * Generates CSS properties for sticky column positioning with visual indicators:
 * - Positions pinned columns using `left` or `right` offsets
 * - Adds inset box shadows to the last left/first right pinned columns for visual separation
 * - Sets column width based on table configuration
 *
 * @template TData - The type of data in the table rows
 * @param column - TanStack Table column instance
 * @returns React CSS properties object for inline styles
 *
 * @example
 * ```tsx
 * <TableHead style={getColumnPinningStyles(header.column)}>
 *   {header.column.columnDef.header}
 * </TableHead>
 * ```
 *
 * @remarks
 * - Must be used with `position: sticky` CSS class
 * - Requires table to have `border-collapse: separate` for proper rendering
 * - Shadow appears on the edge column to indicate scrollable content
 */
export function getColumnPinningStyles<TData>(
  column: Column<TData>,
): React.CSSProperties {
  const isPinned = column.getIsPinned();
  const isLastLeftPinnedColumn =
    isPinned === "left" && column.getIsLastColumn("left");
  const isFirstRightPinnedColumn =
    isPinned === "right" && column.getIsFirstColumn("right");

  return {
    boxShadow: isLastLeftPinnedColumn
      ? "-4px 0 4px -4px gray inset"
      : isFirstRightPinnedColumn
        ? "4px 0 4px -4px gray inset"
        : undefined,
    left: isPinned === "left" ? `${column.getStart("left")}px` : undefined,
    right: isPinned === "right" ? `${column.getAfter("right")}px` : undefined,
    width: column.getSize(),
  };
}

/**
 * Creates a Lucide-compatible icon component from a React SVG component.
 *
 * Converts a standard React SVG functional component into a Lucide icon by extracting
 * SVG element nodes and wrapping them with Lucide's icon API. This allows custom SVG
 * icons to be used seamlessly alongside Lucide icons with consistent sizing and styling.
 *
 * @param iconName - The name identifier for the icon (used for debugging/display)
 * @param Svg - A React functional component that renders an SVG element
 * @returns A Lucide icon component compatible with lucide-react
 *
 * @example
 * ```tsx
 * const CustomLogo = () => (
 *   <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
 *     <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z" />
 *   </svg>
 * );
 *
 * const LogoIcon = createIcon('logo', CustomLogo);
 * // Use like any Lucide icon: <LogoIcon size={24} />
 * ```
 *
 * @remarks
 * **IMPORTANT:** The SVG must be stroke-based to be compatible with Lucide's styling system.
 * - Use `stroke="currentColor"` instead of `fill` attributes
 * - Set `fill="none"` on the SVG element
 * - Use `strokeWidth`, `strokeLinecap`, and `strokeLinejoin` for styling
 * - Avoid filled shapes; use outlined/stroked paths instead
 *
 * This ensures the icon inherits color from CSS and maintains consistency with Lucide icons.
 *
 * @see {@link createIconNode} for the internal SVG parsing logic
 */
export function createIcon(
  iconName: string,
  Svg: FC,
): ReturnType<typeof createLucideIcon> {
  return createLucideIcon(iconName, createIconNode(Svg));
}

const createIconNode = (svg: FC): IconNode => {
  const node: IconNode = [];
  const element = svg({});

  // Ensure we have a valid React element
  if (!element || typeof element !== "object" || !("props" in element)) {
    console.warn("Invalid SVG component provided to createIconNode");
    return node;
  }

  const svgElement = element as ReactElement<any>;

  // Handle both direct children and nested children
  const children = svgElement.props.children;
  if (!children) {
    return node;
  }

  // Normalize children to array
  const childArray = Array.isArray(children) ? children : [children];

  childArray.forEach((child, index) => {
    if (child && typeof child === "object" && "type" in child) {
      const childElement = child as ReactElement<any>;
      // Filter out non-SVG elements and ensure type is string
      if (typeof childElement.type === "string") {
        // Extract props and filter out React-specific ones
        const props = childElement.props || {};
        // eslint-disable-next-line unused-imports/no-unused-vars
        const { children, key, ref, ...attrs } = props;
        node.push([
          childElement.type as SVGElementType,
          { ...attrs, key: `icon-node-${index}` },
        ]);
      }
    }
  });

  return node;
};
