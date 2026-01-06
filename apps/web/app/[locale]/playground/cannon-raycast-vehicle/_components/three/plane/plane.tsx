import type { PlaneProps } from "@react-three/cannon";
import { usePlane } from "@react-three/cannon";
import type { Ref } from "react";
import type { Group } from "three";

export default function Plane(props: PlaneProps) {
  const [ref] = usePlane(() => ({
    material: "ground",
    type: "Static",
    ...props,
  }));
  return (
    <group ref={ref as Ref<Group>}>
      <mesh receiveShadow castShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#303030" />
      </mesh>
    </group>
  );
}
