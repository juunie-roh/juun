import React from 'react';

import { Icon, type IconProps } from './Icon';

// Omit the svg prop as it will be provided by the HOC
export type SpecificIconProps = Omit<IconProps, 'svg'>;

export default function createIcon(
  svg: React.FC<React.SVGProps<SVGSVGElement>>,
  defaultProps?: Partial<SpecificIconProps>,
) {
  const IconComponent = React.forwardRef<SVGSVGElement, SpecificIconProps>(
    (props, ref) => <Icon ref={ref} svg={svg} {...defaultProps} {...props} />,
  );

  // Set display name based on the SVG component's name
  IconComponent.displayName = `Icon${svg.displayName || 'Component'}`;

  return IconComponent;
}
