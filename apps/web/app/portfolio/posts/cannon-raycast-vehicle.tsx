'use client';

import { Label, Switch } from '@pkg/ui';
import { Debug, Physics } from '@react-three/cannon';
import { Environment, OrbitControls } from '@react-three/drei';
import { Fragment, Suspense, useState } from 'react';

import { Beetle } from '@/components/three/beetle';
import { ThreeCanvas, ThreeCanvasSkeleton } from '@/components/three/canvas';
import { Cylinder } from '@/components/three/cylinder';
import { Plane } from '@/components/three/plane';

export const metadata = {
  title: 'Three Cannon Raycast Vehicle Example',
  description: 'Three js Vehicle Demonstration with Canno physics applied',
  date: '2024-04-20',
  tags: ['Next.js', 'Three.js', '3D', 'Cannon'],
  image: '/images/cannon-raycast-vehicle.png',
};

export default function CannonRaycastVehicle() {
  const [isDebug, setIsDebug] = useState<boolean>(false);

  return (
    <Fragment>
      <Suspense fallback={<ThreeCanvasSkeleton />}>
        <ThreeCanvas shadows camera={{ fov: 50, position: [0, 5, 15] }}>
          <fog attach="fog" args={['#171720', 10, 50]} />
          <color attach="background" args={['#171720']} />
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
            {isDebug ? (
              <Debug>
                <Plane
                  rotation={[-Math.PI / 2, 0, 0]}
                  userData={{ id: 'floor' }}
                />
                <Beetle
                  position={[0, 2, 0]}
                  rotation={[0, -Math.PI / 4, 0]}
                  angularVelocity={[0, 0.5, 0]}
                />
                <Cylinder
                  position={[-5, 2.5, -5]}
                  userData={{ id: 'pillar-1' }}
                />
                <Cylinder
                  position={[0, 2.5, -5]}
                  userData={{ id: 'pillar-2' }}
                />
                <Cylinder
                  position={[5, 2.5, -5]}
                  userData={{ id: 'pillar-3' }}
                />
              </Debug>
            ) : (
              <Fragment>
                <Plane
                  rotation={[-Math.PI / 2, 0, 0]}
                  userData={{ id: 'floor' }}
                />
                <Beetle
                  position={[0, 2, 0]}
                  rotation={[0, -Math.PI / 4, 0]}
                  angularVelocity={[0, 0.5, 0]}
                />
                <Cylinder
                  position={[-5, 2.5, -5]}
                  userData={{ id: 'pillar-1' }}
                />
                <Cylinder
                  position={[0, 2.5, -5]}
                  userData={{ id: 'pillar-2' }}
                />
                <Cylinder
                  position={[5, 2.5, -5]}
                  userData={{ id: 'pillar-3' }}
                />
              </Fragment>
            )}
          </Physics>
          <Suspense fallback={null}>
            <Environment preset="city" />
          </Suspense>
          <OrbitControls />
        </ThreeCanvas>
      </Suspense>

      <p>
        * WASD or Arrow Keys to drive, SPACE to brake
        <br />r to reset
      </p>
      <div className="flex items-center space-x-2">
        <Switch
          id="debug-mode"
          checked={isDebug}
          onCheckedChange={(checked) => setIsDebug(checked)}
        >
          Toggle Debug Mode
        </Switch>
        <Label htmlFor="debug-mode">Debug Mode</Label>
      </div>
    </Fragment>
  );
}
