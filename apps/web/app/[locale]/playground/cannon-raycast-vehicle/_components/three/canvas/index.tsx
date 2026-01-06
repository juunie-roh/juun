import type { CanvasProps } from "@react-three/fiber";
import { lazy, Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";

const LazyCanvas = lazy(() => import("./canvas"));

export default function Canvas({ children, ...props }: CanvasProps) {
  return (
    <Suspense
      fallback={
        <div className="size-full overflow-hidden rounded-md">
          <Skeleton className="size-full" />
        </div>
      }
    >
      <LazyCanvas {...props}>{children}</LazyCanvas>
    </Suspense>
  );
}
