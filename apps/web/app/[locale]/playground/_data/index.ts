import { ImageProps } from "next/image";

export type PlaygroundCategory =
  | "3D"
  | "UI"
  | "Content Management"
  | "Not Found";

export type PlaygroundItem = {
  title: string;
  description: string;
  date: number | Date;
  category: PlaygroundCategory;
  href: string;
  image?: string;
  imageStyle?: ImageProps["style"];
};

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    title: "Markdown Input Renderer",
    date: new Date("2025-11-18"),
    category: "Content Management",
    href: "/playground/input-renderer",
    image: "/images/playground/markdown-icon.png",
    imageStyle: { objectFit: "contain" },
    description: `Real-time markdown preview system demonstrating the custom content processing pipeline used throughout this project.

- **Live Preview**: Debounced real-time rendering with URL-based state management for instant feedback
- **Custom Pipeline**: Full \`unified/remark/rehype\` processing with Next.js Image, Link, and syntax-highlighted CodeBlock components
- **Production Pipeline**: Uses the exact same markdown parser as the blog system for consistent rendering
- **Server-Side Rendering**: React Server Components handle parsing and rendering, avoiding client-side serialization issues`,
  },
  {
    title: "Cesium Utils Demo",
    date: new Date("2025-05-13"),
    category: "3D",
    href: "/cesium-utils",
    image: "https://cesium.com/logo-kit/cesium/Cesium_dark_color.svg",
    imageStyle: { objectFit: "contain" },
    description: `Interactive demonstration for [\`@juun-roh/cesium-utils\`](https://www.npmjs.com/package/@juun-roh/cesium-utils) npm package.

- **HybridTerrainProvider**: Combines multiple terrain sources with automatic fallback handling ([PR submitted](https://github.com/CesiumGS/cesium/pull/12822) to core library)
- **Collection**: Type-safe wrapper for Cesium data structures with enhanced TypeScript support
- **Highlight**: Flyweight visual highlighting with silhouette and surface effects`,
  },
  {
    title: "UI Tests",
    date: new Date("2025-03-02"),
    category: "UI",
    href: "/playground/ui-tests",
    image: "/images/playground/wheel.png",
    imageStyle: { objectFit: "cover" },
    description: `Experimental UI component showcase featuring custom-built interaction patterns and animation systems.

- **Marquee Component**: Infinite scroll animation with bidirectional movement and seamless looping
- **Wheel Interfaces**: A unique circular menu system for 3D scene interaction.`,
  },
  {
    title: "Three.js with Physics",
    date: new Date("2024-04-20"),
    category: "3D",
    href: "/playground/cannon-raycast-vehicle",
    image: "/images/playground/cannon-raycast-vehicle.png",
    imageStyle: { objectFit: "cover" },
    description: `3D environment with Cannon physics engine integration.

- **Keyboard Controls**: WASD/Arrow keys for vehicle movement with realistic steering and acceleration
- **Physics Simulation**: Cannon.js rigid body dynamics with collision detection and constraints
- **Vehicle Mechanics**: Raycast-based vehicle with suspension, friction, and wheel rotation
- **React Three Fiber**: Component-based 3D scene management with hooks integration`,
  },
  {
    title: "100 Days of CSS Challenge",
    date: new Date("2023-03-09"),
    category: "UI",
    href: "/100days/index.html",
    image: "/images/playground/100days.png",
    imageStyle: { objectFit: "cover" },
    description: `Daily CSS animation practice showcasing 15 completed challenges focused on pure CSS techniques and interactive components.

- **Pure CSS Animations**: Keyframe animations, transitions, and transforms without JavaScript dependencies
- **Interactive Components**: Animated menu icons, user galleries with modals, and tab navigation systems
- **Visual Effects**: Gradient backgrounds, hover states, overlay effects, and smooth state transitions
- **Gallery View**: Iframe-based showcase with live previews, refresh functionality, and individual challenge links`,
  },
];
