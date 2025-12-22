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
  title?: string;
  description?: string;
  features: Feature[];
};

// Centralized API configuration
export const CESIUM_APIS: ApiConfig[] = [
  {
    key: "collection",
    label: "Collection",
    title: "Collection API",
    description: "Demonstration of Cesium collection management utilities",
    features: [
      {
        value: "description",
        label: "Description",
        render: CollectionDescription,
      },
      {
        value: "item-1",
        label: "Tag-based Control (entities)",
        render: React.lazy(
          () => import("../_components/api/collection/tag-based-control"),
        ),
      },
    ],
  },
  {
    key: "terrain",
    label: "Terrain",
    title: "Terrain API",
    description:
      "Demonstration of Cesium terrain utilities and hybrid terrain functionality",
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
    title: "Viewer API",
    description:
      "Demonstration of Cesium viewer configuration and management utilities",
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
    title: "Highlight API",
    description:
      "Demonstration of Cesium entity highlighting and visual effects",
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
    title: "Sunlight API",
    description:
      "Demonstration of experimental Cesium sunlight analysis using internal APIs",
    features: [
      {
        value: "description",
        label: "Description",
        render: SunlightDescription,
      },
      {
        value: "item-1",
        label: "Sunlight Analysis",
        render: React.lazy(
          () => import("../_components/api/sunlight/analysis"),
        ),
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

export function getApiMetadata(apiKey: string) {
  const config = getApiConfig(apiKey);
  return config
    ? {
        title: config.title || `${config.label} API`,
        description:
          config.description ||
          `Demonstration of Cesium ${config.label.toLowerCase()} utilities`,
      }
    : null;
}
