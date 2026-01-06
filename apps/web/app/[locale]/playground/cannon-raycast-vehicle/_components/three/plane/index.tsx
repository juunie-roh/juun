import type { PlaneProps } from "@react-three/cannon";
import { lazy } from "react";

const LazyPlane = lazy(() => import("./plane"));

export default function Plane(props: PlaneProps) {
  return <LazyPlane {...props} />;
}
