import dynamic from "next/dynamic";

import { Skeleton } from "@/components/ui/skeleton";

import type { ViewerProps } from "./viewer";

const LazyViewer = dynamic(() => import("./viewer"), {
  // defensive blocker for viewer from being rendered at the server side
  ssr: false,
  // suspense fallback element
  loading: () => <Skeleton className="size-full" />,
});

export default function Viewer(props: ViewerProps) {
  return <LazyViewer {...props} />;
}

export type { ViewerProps };
