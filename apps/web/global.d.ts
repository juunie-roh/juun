// Global type declarations for the web app

// SVG imports handled by @svgr/webpack
declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}

// Cesium base URL global variable
declare global {
  interface Window {
    CESIUM_BASE_URL?: string;
  }

  // Global constant defined by webpack.DefinePlugin or Next.js env
  const CESIUM_BASE_URL: string;
}

export {};
