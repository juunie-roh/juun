import { lazy } from "react";

import { Feature } from "@/components/cesium/types";

import FeatureAccordion from "../../feature-accordion";
import HighlightDescription from "./description";

const Polygon = lazy(() => import("./polygon"));
const Model = lazy(() => import("./model-entity"));
const DataSource = lazy(() => import("./datasource-entity"));
const Silhouette = lazy(() => import("./silhouette"));

const features: Feature[] = [
  {
    value: "description",
    label: "Description",
    node: <HighlightDescription />,
  },
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
  return <FeatureAccordion features={features} />;
}
