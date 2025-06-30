import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@pkg/ui/accordion";
import { Skeleton } from "@pkg/ui/skeleton";
import { lazy, Suspense } from "react";

import { Feature } from "@/components/cesium/types";

import HighlightDescription from "./description";

const Polygon = lazy(() => import("./polygon"));
const Model = lazy(() => import("./model-entity"));
const DataSource = lazy(() => import("./datasource-entity"));
const Silhouette = lazy(() => import("./silhouette"));

const features: Feature[] = [
  {
    value: "item-1",
    label: "Polygon Entity",
    node: <Polygon />,
  },
  {
    value: "item-2",
    label: "Model Entity",
    node: <Model />,
  },
  {
    value: "item-3",
    label: "Datasource Entity",
    node: <DataSource />,
  },
  {
    value: "item-4",
    label: "Cesium3DTileFeature",
    node: <Silhouette />,
  },
];

export default function HighlightDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      className="size-full"
      defaultValue="description"
    >
      <AccordionItem value="description">
        <AccordionTrigger>Description</AccordionTrigger>
        <AccordionContent>
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            <HighlightDescription />
          </Suspense>
        </AccordionContent>
      </AccordionItem>
      {features.map((feat) => (
        <AccordionItem key={feat.value} value={feat.value}>
          <AccordionTrigger>{feat.label}</AccordionTrigger>
          <AccordionContent>
            <Suspense fallback={<Skeleton className="h-10 w-full" />}>
              {feat.node}
            </Suspense>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
