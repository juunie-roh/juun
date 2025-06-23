import { lazy, Suspense } from 'react';

import { VehicleProps as BeetleProps } from './vehicle';

const Vehicle = lazy(() => import('./vehicle'));

export default function Beetle(props: BeetleProps) {
  return (
    <Suspense fallback={null}>
      <Vehicle {...props} />
    </Suspense>
  );
}
export type { BeetleProps };
