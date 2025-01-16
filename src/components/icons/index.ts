import AlertTriangleOutlinedSVG from '@/assets/svgs/alert-triangle-outlined.svg';
import CheckSVG from '@/assets/svgs/check.svg';
import ChevronDownSVG from '@/assets/svgs/chevron-down.svg';
import ChevronLeftSVG from '@/assets/svgs/chevron-left.svg';
import ChevronRightSVG from '@/assets/svgs/chevron-right.svg';
import ChevronUpSVG from '@/assets/svgs/chevron-up.svg';
import CircleSVG from '@/assets/svgs/circle.svg';
import CircleCheckOutlinedSVG from '@/assets/svgs/circle-check-outlined.svg';
import CircleXOutlinedSVG from '@/assets/svgs/circle-x-outlined.svg';
import CopySVG from '@/assets/svgs/copy.svg';
import DotsSVG from '@/assets/svgs/dots.svg';
import EditSVG from '@/assets/svgs/edit.svg';
import InfoCircleOutlinedSVG from '@/assets/svgs/info-circle-outlined.svg';
import Loader2SVG from '@/assets/svgs/loader-2.svg';
import MinusSVG from '@/assets/svgs/minus.svg';
import MoonSVG from '@/assets/svgs/moon.svg';
import PlusSVG from '@/assets/svgs/plus.svg';
import SquareSVG from '@/assets/svgs/square.svg';
import SunSVG from '@/assets/svgs/sun.svg';
import XSVG from '@/assets/svgs/x.svg';

import createIcon from './createIcon';

// Helper type to ensure consistent icon creation
type IconDefinition = {
  svg: React.FC<React.SVGProps<SVGSVGElement>>;
  displayName: string;
  label?: string;
  decorative?: boolean;
};

// Helper function to create an icon with proper typing and display name
function defineIcon({
  svg,
  displayName,
  label,
  decorative = true,
}: IconDefinition) {
  const IconComponent = createIcon(svg, {
    label,
    decorative,
  });
  IconComponent.displayName = `Icon${displayName}`;
  return IconComponent;
}

// Export each icon individually with its proper configuration
export const AlertTriangleOutlined = defineIcon({
  svg: AlertTriangleOutlinedSVG,
  displayName: 'AlertTriangleOutlined',
  label: 'Alert Triangle',
  decorative: false,
});

export const Check = defineIcon({
  svg: CheckSVG,
  displayName: 'Check',
  label: 'Check',
});

export const ChevronDown = defineIcon({
  svg: ChevronDownSVG,
  displayName: 'ChevronDown',
  label: 'Chevron Down',
});

export const ChevronLeft = defineIcon({
  svg: ChevronLeftSVG,
  displayName: 'ChevronLeft',
  label: 'Chevron Left',
});

export const ChevronRight = defineIcon({
  svg: ChevronRightSVG,
  displayName: 'ChevronRight',
  label: 'Chevron Right',
});

export const ChevronUp = defineIcon({
  svg: ChevronUpSVG,
  displayName: 'ChevronUp',
  label: 'Chevron Up',
});

export const Circle = defineIcon({
  svg: CircleSVG,
  displayName: 'Circle',
  label: 'Circle',
});

export const CircleCheckOutlined = defineIcon({
  svg: CircleCheckOutlinedSVG,
  displayName: 'CircleCheckOutlined',
  label: 'Circle Check',
  decorative: false,
});

export const CircleXOutlined = defineIcon({
  svg: CircleXOutlinedSVG,
  displayName: 'CircleXOutlined',
  label: 'Circle X',
  decorative: false,
});

export const Copy = defineIcon({
  svg: CopySVG,
  displayName: 'Copy',
  label: 'Copy',
});

export const Dots = defineIcon({
  svg: DotsSVG,
  displayName: 'Dots',
  label: 'More options',
});

export const Edit = defineIcon({
  svg: EditSVG,
  displayName: 'Edit',
  label: 'Edit',
});

export const InfoCircleOutlined = defineIcon({
  svg: InfoCircleOutlinedSVG,
  displayName: 'InfoCircleOutlined',
  label: 'Information',
  decorative: false,
});

export const Loader2 = defineIcon({
  svg: Loader2SVG,
  displayName: 'Loader2',
  label: 'Loading',
});

export const Minus = defineIcon({
  svg: MinusSVG,
  displayName: 'Minus',
  label: 'Minus',
});

export const Moon = defineIcon({
  svg: MoonSVG,
  displayName: 'Moon',
  label: 'Dark theme',
});

export const Plus = defineIcon({
  svg: PlusSVG,
  displayName: 'Plus',
  label: 'Add',
});

export const Square = defineIcon({
  svg: SquareSVG,
  displayName: 'Square',
  label: 'Square',
});

export const Sun = defineIcon({
  svg: SunSVG,
  displayName: 'Sun',
  label: 'Light theme',
});

export const X = defineIcon({
  svg: XSVG,
  displayName: 'X',
  label: 'Close',
});

// Export a type that represents all available icon names
export type IconName =
  | 'AlertTriangleOutlined'
  | 'Check'
  | 'ChevronDown'
  | 'ChevronLeft'
  | 'ChevronRight'
  | 'ChevronUp'
  | 'Circle'
  | 'CircleCheckOutlined'
  | 'CircleXOutlined'
  | 'Copy'
  | 'Dots'
  | 'Edit'
  | 'InfoCircleOutlined'
  | 'Loader2'
  | 'Minus'
  | 'Moon'
  | 'Plus'
  | 'Square'
  | 'Sun'
  | 'X';
