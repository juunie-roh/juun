import type { CylinderProps } from "@react-three/cannon";
import { lazy } from "react";

const LazyCylinder = lazy(() => import("./cylinder"));

export default function Cylinder(props: CylinderProps) {
  return <LazyCylinder {...props} />;
}
