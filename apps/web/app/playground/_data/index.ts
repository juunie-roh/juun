import { ImageProps } from "next/image";

export type PlaygroundCategory = "3D" | "UI" | "CMS";

export type PlaygroundItem = {
  title: string;
  description: string;
  date: string;
  category: PlaygroundCategory;
  href: string;
  image?: string;
  imageStyle?: ImageProps["style"];
};

export const PLAYGROUND_ITEMS: PlaygroundItem[] = [
  {
    title: "Cesium Utils Demo",
    date: "2025-05-13",
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
    title: "Three.js with Physics",
    date: "2024-04-20",
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
    date: "2023-03-09",
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
