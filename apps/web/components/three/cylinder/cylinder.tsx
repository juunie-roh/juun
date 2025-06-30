import type { CylinderArgs, CylinderProps } from "@react-three/cannon";
import { useCylinder } from "@react-three/cannon";
import type { Ref } from "react";
import type { Mesh } from "three";

export default function Cylinder(props: CylinderProps) {
  const args: CylinderArgs = [0.7, 0.7, 5, 16];
  const [ref] = useCylinder(() => ({
    args,
    mass: 10,
    ...props,
  }));
  return (
    <mesh ref={ref as Ref<Mesh>} castShadow receiveShadow>
      <cylinderGeometry args={args} />
      <meshNormalMaterial />
    </mesh>
  );
}
