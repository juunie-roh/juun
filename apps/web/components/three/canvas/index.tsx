import { AspectRatio } from '@pkg/ui/aspect-ratio';
import { Skeleton } from '@pkg/ui/skeleton';
import type { CanvasProps } from '@react-three/fiber';
import { lazy, Suspense } from 'react';

const LazyCanvas = lazy(() => import('./canvas'));

export default function Canvas({ children, ...props }: CanvasProps) {
  return (
    <Suspense
      fallback={
        <AspectRatio
          ratio={16 / 9}
          className="size-full overflow-hidden rounded-md"
        >
          <Skeleton className="aspect-video w-full" />
        </AspectRatio>
      }
    >
      <LazyCanvas {...props}>{children}</LazyCanvas>
    </Suspense>
  );
}
