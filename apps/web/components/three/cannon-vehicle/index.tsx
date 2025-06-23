import { lazy, Suspense } from 'react';

const LazyCannonVehicle = lazy(() => import('./cannon-vehicle'));

export default function CannonVehicle({ debug = false }: { debug: boolean }) {
  return (
    <Suspense fallback={null}>
      <LazyCannonVehicle debug={debug} />
    </Suspense>
  );
}
