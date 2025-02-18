import { createLucideIcon } from 'lucide-react';
import { type FC, type ReactElement, type ReactNode } from 'react';

type SVGElementType =
  | 'circle'
  | 'ellipse'
  | 'g'
  | 'line'
  | 'path'
  | 'polygon'
  | 'polyline'
  | 'rect';
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

function createIcon(iconName: string, Svg: FC) {
  return createLucideIcon(iconName, createIconNode(Svg));
}

export default createIcon;
