import { Skeleton } from '@pkg/ui';
import { lazy, Suspense } from 'react';

const LazyEntityToggler = lazy(() => import('./entity-toggler'));

export default function EntityToggler() {
  return (
    <Suspense fallback={<Skeleton className="size-full" />}>
      <LazyEntityToggler />
    </Suspense>
  );
}
