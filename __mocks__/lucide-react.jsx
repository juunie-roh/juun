import React, { forwardRef } from 'react';

// Type for the icon component
// type IconComponent = ForwardRefExoticComponent<
//   IconProps & RefAttributes<SVGSVGElement>
// >;

// Helper function to convert to kebab case
/**
 * @param {string} str
 * @returns {string}
 */
const toKebabCase = (str) =>
  str.replace(/([a-z0-9])([A-Z])/g, '$1-$2').toLowerCase();

// Create a base mock SVG component
/**
 * @param {string} iconName
 * @returns {React.ForwardRefExoticComponent<SVGProps<SVGSVGElement> & {color?: string; size?: string | number; strokeWidth?: string | number; absoluteStrokeWidth?: boolean; className?: string;} & RefAttributes<SVGSVGElement>>}
 */
const createMockIcon = (iconName) => {
  const MockIcon = forwardRef(
    (
      {
        color = 'currentColor',
        size = 24,
        strokeWidth = 2,
        className = '',
        children,
        ...props
      },
      ref,
    ) => (
      <svg
        ref={ref}
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke={color}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
        className={`lucide lucide-${toKebabCase(iconName)} ${className}`.trim()}
        data-testid={`lucide-${toKebabCase(iconName)}`}
        {...props}
      >
        {/* Mock path that will be rendered for all icons */}
        <path d="M12 12h.01" />
        {children}
      </svg>
    ),
  );

  MockIcon.displayName = iconName;
  return MockIcon;
};

// Create commonly used icons
export const AlertCircle = createMockIcon('AlertCircle');
export const ArrowRight = createMockIcon('ArrowRight');
export const Check = createMockIcon('Check');
export const ChevronDown = createMockIcon('ChevronDown');
export const ChevronRight = createMockIcon('ChevronRight');
export const ChevronUp = createMockIcon('ChevronUp');
export const Circle = createMockIcon('Circle');
export const Clock = createMockIcon('Clock');
export const Copy = createMockIcon('Copy');
export const Delete = createMockIcon('Delete');
export const File = createMockIcon('File');
export const Heart = createMockIcon('Heart');
export const Home = createMockIcon('Home');
export const Image = createMockIcon('Image');
export const Info = createMockIcon('Info');
export const Link = createMockIcon('Link');
export const Mail = createMockIcon('Mail');
export const Menu = createMockIcon('Menu');
export const MessageCircle = createMockIcon('MessageCircle');
export const Move = createMockIcon('Move');
export const Plus = createMockIcon('Plus');
export const RotateCw = createMockIcon('RotateCw');
export const Search = createMockIcon('Search');
export const Settings = createMockIcon('Settings');
export const Square = createMockIcon('Square');
export const Star = createMockIcon('Star');
export const TriangleAlert = createMockIcon('TriangleAlert');
export const User = createMockIcon('User');
export const X = createMockIcon('X');

// Export createLucideIcon to match the actual API
/**
 * @param {string} iconName
 * @param {[string, Record<string, any>][]} _iconNode
 * @returns {React.ReactNode}
 */
export const createLucideIcon = (iconName, _iconNode) => {
  return createMockIcon(iconName);
};

// Mock the default export (if needed)
export default {
  AlertCircle,
  ArrowRight,
  Check,
  ChevronDown,
  ChevronRight,
  ChevronUp,
  Circle,
  Clock,
  Copy,
  Delete,
  File,
  Heart,
  Home,
  Image,
  Info,
  Link,
  Mail,
  MessageCircle,
  Menu,
  Move,
  Plus,
  RotateCw,
  Search,
  Settings,
  Square,
  Star,
  TriangleAlert,
  User,
  X,
  createLucideIcon,
};
