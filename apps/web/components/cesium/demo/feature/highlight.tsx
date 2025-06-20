'use client';

import { Skeleton } from '@pkg/ui';
import { lazy, Suspense } from 'react';

const LazyHighlightDemo = lazy(() => import('./lazy/highlight'));

export default function HighlightDemo() {
  return (
    <Suspense fallback={<Skeleton className="size-full" />}>
      <LazyHighlightDemo />
    </Suspense>
  );
}
