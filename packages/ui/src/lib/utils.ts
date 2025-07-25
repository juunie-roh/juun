import { type ClassValue, clsx } from "clsx";
import { createLucideIcon } from "lucide-react";
import type { FC, ReactElement, ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

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

export const createIconNode = (Svg: FC): IconNode => {
  const node: IconNode = [];
  const element: ReactNode | Promise<ReactNode> = Svg({});
  const children: ReactElement<any, any>[] = (element as ReactElement<any, any>)
    .props.children;
  children.forEach((child, index) => {
    node.push([child.type, { ...child.props, key: `icon-node-${index}` }]);
  });

  return node;
};

export function createIcon(
  iconName: string,
  Svg: FC,
): ReturnType<typeof createLucideIcon> {
  return createLucideIcon(iconName, createIconNode(Svg));
}
