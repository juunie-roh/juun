'use client';

import { Skeleton } from '@pkg/ui/skeleton';
import { lazy, Suspense } from 'react';

const LazyTerrainDemo = lazy(() => import('./lazy/terrain'));

export default function TerrainDemo() {
  return (
    <Suspense fallback={<Skeleton className="size-full" />}>
      <LazyTerrainDemo />
    </Suspense>
  );
}
