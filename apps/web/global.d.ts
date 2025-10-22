// Global type declarations for the web app

// SVG imports handled by @svgr/webpack
declare module "*.svg" {
  import type { FC, SVGProps } from "react";
  const content: FC<SVGProps<SVGSVGElement>>;
  export default content;
}
