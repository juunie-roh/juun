import { Skeleton } from "@pkg/ui/skeleton";
import { lazy, Suspense } from "react";

import type { ViewerProps } from "../types";

const LazyViewer = lazy(() => import("./viewer"));

export default function Viewer(props: ViewerProps) {
  return (
    <Suspense fallback={<Skeleton className="size-full" />}>
      <LazyViewer {...props} />
    </Suspense>
  );
}

export type { ViewerProps };
