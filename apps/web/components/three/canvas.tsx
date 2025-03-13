import { AspectRatio, Skeleton } from '@juun/ui';
import type { CanvasProps } from '@react-three/fiber';
import { Canvas } from '@react-three/fiber';

export function ThreeCanvas({ children, ...props }: CanvasProps) {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="size-full overflow-hidden rounded-md"
    >
      <Canvas {...props}>{children}</Canvas>
    </AspectRatio>
  );
}

export function ThreeCanvasSkeleton() {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="size-full overflow-hidden rounded-md"
    >
      <Skeleton className="aspect-video w-full" />
    </AspectRatio>
  );
}
