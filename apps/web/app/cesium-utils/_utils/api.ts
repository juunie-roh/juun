import React from "react";

import CollectionDescription from "../_components/api/collection/description";
import HighlightDescription from "../_components/api/highlight/description";
import SunlightDescription from "../_components/api/sunlight/description";
import TerrainDescription from "../_components/api/terrain/description";
import ViewerDescription from "../_components/api/viewer/description";

export type Feature = {
  value: string;
  label: string;
  render:
    | React.ComponentType<any>
    | React.LazyExoticComponent<React.ComponentType<any>>;
};

export type ApiConfig = {
  key: string;
  label: string;
  features: Feature[];
};

// Centralized API configuration
export const CESIUM_APIS: ApiConfig[] = [
  {
    key: "collection",
    label: "Collection",
    features: [
      {
        value: "description",
        label: "Description",
        render: CollectionDescription,
      },
      {
        value: "item-1",
        label: "Add / Remove Item",
        render: React.lazy(() => import("../_components/entity-toggler")),
      },
    ],
  },
  {
    key: "terrain",
    label: "Terrain",
    features: [
      {
        value: "description",
        label: "Description",
        render: TerrainDescription,
      },
      {
        value: "item-1",
        label: "Hybrid Example",
        render: React.lazy(
          () => import("../_components/api/terrain/hybrid-example"),
        ),
      },
    ],
  },
  {
    key: "viewer",
    label: "Viewer",
    features: [
      {
        value: "description",
        label: "Description",
        render: ViewerDescription,
      },
    ],
  },
  {
    key: "highlight",
    label: "Highlight",
    features: [
      {
        value: "description",
        label: "Description",
        render: HighlightDescription,
      },
      {
        value: "item-1",
        label: "Polygon Entity",
        render: React.lazy(
          () => import("../_components/api/highlight/polygon"),
        ),
      },
      {
        value: "item-2",
        label: "Model Entity",
        render: React.lazy(
          () => import("../_components/api/highlight/model-entity"),
        ),
      },
      {
        value: "item-3",
        label: "Datasource Entity",
        render: React.lazy(
          () => import("../_components/api/highlight/datasource-entity"),
        ),
      },
      {
        value: "item-4",
        label: "Cesium3DTileFeature",
        render: React.lazy(
          () => import("../_components/api/highlight/silhouette"),
        ),
      },
    ],
  },
  {
    key: "sunlight",
    label: "Sunlight",
    features: [
      {
        value: "description",
        label: "Description",
        render: SunlightDescription,
      },
    ],
  },
];

// Derived utilities
export const API_KEYS = CESIUM_APIS.map((api) => api.key);

export const API_LABELS = CESIUM_APIS.reduce(
  (acc, api) => {
    acc[api.key] = api.label;
    return acc;
  },
  {} as Record<string, string>,
);

// Helper functions
export function getApiConfig(apiKey: string): ApiConfig | undefined {
  return CESIUM_APIS.find((api) => api.key === apiKey);
}

export function getFeatures(apiKey: string): Feature[] {
  return getApiConfig(apiKey)?.features || [];
}

export function isValidApi(apiKey: string): boolean {
  return API_KEYS.includes(apiKey);
}

export function getApiOptions() {
  return CESIUM_APIS.map((api) => ({
    api: api.key,
    label: api.label,
  }));
}
