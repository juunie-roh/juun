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

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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
