import { Debug, Physics } from "@react-three/cannon";
import { Environment, OrbitControls } from "@react-three/drei";
import { Fragment, Suspense } from "react";

import Beetle from "../beetle";
import Canvas from "../canvas";
import Cylinder from "../cylinder";
import Plane from "../plane";

export default function CannonVehicle({ debug = false }: { debug: boolean }) {
  return (
    <Canvas shadows camera={{ fov: 50, position: [0, 5, 15] }}>
      <fog attach="fog" args={["#171720", 10, 50]} />
      <color attach="background" args={["#171720"]} />
      <ambientLight intensity={0.1} />
      <spotLight
        position={[10, 10, 10]}
        angle={Math.PI / 3}
        intensity={1}
        castShadow
        penumbra={1}
      />
      <Physics
        broadphase="SAP"
        defaultContactMaterial={{
          contactEquationRelaxation: 4,
          friction: 1e-3,
        }}
        allowSleep
      >
        {debug ? (
          <Debug>
            <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: "floor" }} />
            <Beetle
              position={[0, 2, 0]}
              rotation={[0, -Math.PI / 4, 0]}
              angularVelocity={[0, 0.5, 0]}
            />
            <Cylinder position={[-5, 2.5, -5]} userData={{ id: "pillar-1" }} />
            <Cylinder position={[0, 2.5, -5]} userData={{ id: "pillar-2" }} />
            <Cylinder position={[5, 2.5, -5]} userData={{ id: "pillar-3" }} />
          </Debug>
        ) : (
          <Fragment>
            <Plane rotation={[-Math.PI / 2, 0, 0]} userData={{ id: "floor" }} />
            <Beetle
              position={[0, 2, 0]}
              rotation={[0, -Math.PI / 4, 0]}
              angularVelocity={[0, 0.5, 0]}
            />
            <Cylinder position={[-5, 2.5, -5]} userData={{ id: "pillar-1" }} />
            <Cylinder position={[0, 2.5, -5]} userData={{ id: "pillar-2" }} />
            <Cylinder position={[5, 2.5, -5]} userData={{ id: "pillar-3" }} />
          </Fragment>
        )}
      </Physics>
      <Suspense fallback={null}>
        <Environment preset="city" />
      </Suspense>
      <OrbitControls />
    </Canvas>
  );
}
