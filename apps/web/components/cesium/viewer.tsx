'use client';

import { Skeleton } from '@pkg/ui';
import { lazy, Suspense } from 'react';

import { ViewerProps } from '@/types/cesium.types';

const LazyViewer = lazy(() => import('./lazy/viewer'));

export default function Viewer(props: ViewerProps) {
  return (
    <Suspense fallback={<Skeleton className="size-full" />}>
      <LazyViewer {...props} />
    </Suspense>
  );
}
