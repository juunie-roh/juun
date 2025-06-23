'use client';

import { Label } from '@pkg/ui/label';
import { Switch } from '@pkg/ui/switch';
import { Fragment, lazy, useState } from 'react';

const CannonVehicle = lazy(() => import('@/components/three/cannon-vehicle'));

export const metadata = {
  title: 'Three Cannon Raycast Vehicle Example',
  description: 'Three js Vehicle Demonstration with Cannon physics applied',
  date: '2024-04-20',
  tags: ['Next.js', 'Three.js', '3D', 'Cannon'],
  image: '/images/cannon-raycast-vehicle.png',
};

export default function CannonRaycastVehicle() {
  const [isDebug, setIsDebug] = useState<boolean>(false);

  return (
    <Fragment>
      <CannonVehicle debug={isDebug} />

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
