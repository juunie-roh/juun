// components/cesium/demo/api-features.ts
import { lazy } from "react";

import { Api, Feature } from "@/components/cesium/types";

import EntityToggler from "../../entity-toggler";
import CollectionDescription from "./collection/description";
import HighlightDescription from "./highlight/description";

// Lazy load other feature components
const Polygon = lazy(() => import("./highlight/polygon"));
const Model = lazy(() => import("./highlight/model-entity"));
const DataSource = lazy(() => import("./highlight/datasource-entity"));
const Silhouette = lazy(() => import("./highlight/silhouette"));

// Define features for each API
export const API_FEATURES: Record<Api, Feature[]> = {
  collection: [
    {
      value: "description",
      label: "Description",
      node: <CollectionDescription />,
    },
    {
      value: "item-1",
      label: "Add / Remove Item",
      node: <EntityToggler />,
    },
  ],

  terrain: [
    {
      value: "description",
      label: "Description",
      node: <div>Terrain description coming soon...</div>,
    },
  ],

  viewer: [
    {
      value: "description",
      label: "Description",
      node: <div>Viewer description coming soon...</div>,
    },
  ],

  highlight: [
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
  ],
};

// Helper function to get features for a specific API
export function getApiFeatures(api: Api): Feature[] {
  return API_FEATURES[api] || [];
}
