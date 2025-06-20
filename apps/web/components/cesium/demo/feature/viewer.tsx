'use client';

import { Skeleton } from '@pkg/ui';
import { lazy, Suspense } from 'react';

const LazyViewerDemo = lazy(() => import('./lazy/viewer'));

export default function ViewerDemo() {
  return (
    <Suspense fallback={<Skeleton className="size-full" />}>
      <LazyViewerDemo />
    </Suspense>
  );
}
