import { lazy } from "react";

import { Api, Feature } from "@/components/cesium/types";

import EntityToggler from "../../entity-toggler";
import CollectionDescription from "./collection/description";
import HighlightDescription from "./highlight/description";
import TerrainDescription from "./terrain/description";
import ViewerDescription from "./viewer/description";

// Define features for each API
export const API_FEATURES: Record<Api, Feature[]> = {
  collection: [
    {
      value: "description",
      label: "Description",
      render: CollectionDescription,
    },
    {
      value: "item-1",
      label: "Add / Remove Item",
      render: EntityToggler,
    },
  ],

  terrain: [
    {
      value: "description",
      label: "Description",
      render: TerrainDescription,
    },
  ],

  viewer: [
    {
      value: "description",
      label: "Description",
      render: ViewerDescription,
    },
  ],

  highlight: [
    {
      value: "description",
      label: "Description",
      render: HighlightDescription,
    },
    {
      value: "item-1",
      label: "Polygon Entity",
      render: lazy(() => import("./highlight/polygon")),
    },
    {
      value: "item-2",
      label: "Model Entity",
      render: lazy(() => import("./highlight/model-entity")),
    },
    {
      value: "item-3",
      label: "Datasource Entity",
      render: lazy(() => import("./highlight/datasource-entity")),
    },
    {
      value: "item-4",
      label: "Cesium3DTileFeature",
      render: lazy(() => import("./highlight/silhouette")),
    },
  ],
};

// Helper function to get features for a specific API
export function getApiFeatures(api: Api): Feature[] {
  return API_FEATURES[api] || [];
}
