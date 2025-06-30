import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@pkg/ui/accordion";
import { Skeleton } from "@pkg/ui/skeleton";
import { lazy, Suspense } from "react";

import ModelEntity from "./model-entity";

const MouseEventHighlight = lazy(() => import("./mouse-event"));
const PolygonHighlight = lazy(() => import("./polygon"));
const SilhouetteHighlight = lazy(() => import("./silhouette"));

export default function HighlightDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="size-full"
      defaultValue="item-1"
    >
      <AccordionItem value="item-1">
        <AccordionTrigger>Polygon Entity</AccordionTrigger>
        <AccordionContent>
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <PolygonHighlight />
          </Suspense>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Model Entity</AccordionTrigger>
        <AccordionContent>
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <ModelEntity />
          </Suspense>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Mouse Event</AccordionTrigger>
        <AccordionContent>
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <MouseEventHighlight />
          </Suspense>
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>3D Tile Feature</AccordionTrigger>
        <AccordionContent>
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <SilhouetteHighlight />
          </Suspense>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
