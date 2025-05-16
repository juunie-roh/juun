'use client';

import { Skeleton } from '@pkg/ui';
import { lazy, Suspense } from 'react';

import { IViewerProps } from './cesium.types';

const LazyViewer = lazy(() => import('./lazy/viewer'));

export default function Viewer(props: IViewerProps) {
  return (
    <Suspense fallback={<Skeleton className="size-full" />}>
      <LazyViewer {...props} />
    </Suspense>
  );
}
