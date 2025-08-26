"use client";

import { CodeBlock } from "@juun/ui/code-block";
import { Prose } from "@juun/ui/prose";
import { Skeleton } from "@juun/ui/skeleton";
import Link from "next/link";
import type { ComponentType, LazyExoticComponent } from "react";
import { lazy, Suspense } from "react";

import useCesiumUtilsFeatureStore from "@/stores/slices/cesium-utils-feature";

import EntityToggler from "../entity-toggler";
import CollectionDescription from "./collection/description";
import HighlightDescription from "./highlight/description";
import SunlightDescription from "./sunlight/description";
import TerrainDescription from "./terrain/description";
import ViewerDescription from "./viewer/description";

export type Feature = {
  value: string;
  label: string;
  render: ComponentType<any> | LazyExoticComponent<ComponentType<any>>;
};

type ApiType = "collection" | "terrain" | "viewer" | "highlight" | "sunlight";

const API_FEATURES: Record<ApiType, Feature[]> = {
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
    {
      value: "item-1",
      label: "Hybrid Example",
      render: lazy(() => import("./terrain/hybrid-example")),
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
  sunlight: [
    {
      value: "description",
      label: "Description",
      render: SunlightDescription,
    },
  ],
};

export function getFeatures(api: ApiType): Feature[] {
  return API_FEATURES[api];
}

// Default component when no feature is selected
function DefaultDemo() {
  return (
    <Prose>
      <h2 className="mb-2 tracking-tight">Cesium Utils Demo</h2>
      <p className="mb-4">
        This page demonstrates the capabilities of the{" "}
        <code>@juun-roh/cesium-utils</code> library, a utility package.
      </p>

      <h3 className="mb-2 text-lg font-semibold">Environment</h3>
      <p className="mb-4">
        This demonstration is built using{" "}
        <Link href="https://nextjs.org">Next.js</Link>, the React framework, and
        leverages <Link href="https://resium.reearth.io/">Resium</Link>, a React
        wrapper for Cesium that provides declarative components for 3D
        geospatial applications.
      </p>

      <h3 className="mb-2 text-lg font-semibold">Usage</h3>
      <p className="mb-4">
        The <code>@juun-roh/cesium-utils</code> package maintains vanilla
        CesiumJS compatibility, meaning you can use it in any Cesium project
        regardless of framework choice. The utilities work directly with
        standard Cesium objects and APIs.
      </p>

      <h4 className="mb-2 text-base font-medium">Traditional CesiumJS</h4>
      <p className="mb-4">
        For traditional CesiumJS projects, import the utilities directly and use
        them with your existing viewer setup:
      </p>
      <CodeBlock
        fileName="main.js"
        code={`
import * as Cesium from "cesium";
import { Collection } from "@juun-roh/cesium-utils/collection";

async function main() {
  let viewer;
  try {
    viewer = new Cesium.Viewer("container", viewerOptions);
    
    // Create tagged collections for organized entity management
    const buildings = new Collection({ 
      collection: viewer.entities, 
      tag: "building" 
    });
    
    buildings.add(buildingEntity);
    
    // Use collection methods for bulk operations
    buildings.show();
    buildings.hide();
    buildings.removeByTag("residential");
    
  } catch (error) {
    console.error("Viewer initialization failed:", error);
  }
}

main();`}
      />

      <h4 className="mb-2 text-base font-medium">React/Resium Integration</h4>
      <p className="mb-4">
        When using Resium, the utilities integrate seamlessly within React
        components. Access the viewer through Resium's hooks and apply the same
        utility methods:
      </p>
      <CodeBlock
        fileName="viewer.tsx"
        code={`import * as Cesium from "cesium";
import * as React from "react";
import { useCesium, Viewer as RViewer } from "resium";
import { Collection } from "@juun-roh/cesium-utils/collection";

function ViewerContent(props: any) {
  const { viewer } = useCesium();
  const [collections, setCollections] = React.useState<Map<string, Collection>>(new Map());

  React.useEffect(() => {
    if (!viewer) return;
    
    // Configure viewer UI
    viewer.bottomContainer.remove();
    (viewer.timeline.container as HTMLElement).style.display = "none";
    (viewer.animation.container as HTMLElement).style.display = "none";

    // Initialize utility collections
    const buildingCollection = new Collection({ 
      collection: viewer.entities, 
      tag: "building" 
    });
    
    const roadCollection = new Collection({ 
      collection: viewer.entities, 
      tag: "road" 
    });

    setCollections(new Map([
      ["buildings", buildingCollection],
      ["roads", roadCollection]
    ]));

    // Add sample entities
    buildingCollection.add(buildingEntity);
    roadCollection.add(roadEntity);

  }, [viewer]);

  return null; // Viewer content logic only
}

export default function Viewer(props: any) {
  return (
    <RViewer {...props}>
      <ViewerContent {...props} />
    </RViewer>
  );
}`}
      />
    </Prose>
  );
}

export default function FeatureDemo() {
  const { feature } = useCesiumUtilsFeatureStore();

  // For the base /cesium-utils route, show the default demo
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    if (pathname === "/cesium-utils") {
      return <DefaultDemo />;
    }

    const currentApi = pathname.split("/").pop();
    if (
      !currentApi ||
      !["terrain", "collection", "highlight", "viewer"].includes(currentApi)
    ) {
      return <DefaultDemo />;
    }

    if (!feature) {
      const features = getFeatures(
        currentApi as "terrain" | "collection" | "highlight" | "viewer",
      );
      const defaultFeature =
        features.find((f) => f.value === "description") || features[0];

      if (!defaultFeature) {
        const apiLabels: Record<string, string> = {
          collection: "Collection",
          terrain: "Terrain",
          viewer: "Viewer",
          highlight: "Highlight",
        };

        return (
          <div className="prose max-w-none">
            <h2 className="mb-2 tracking-tight">{apiLabels[currentApi]}</h2>
            <p>No features available for this API.</p>
          </div>
        );
      }

      const Comp = defaultFeature.render;

      return (
        <Suspense fallback={<Skeleton className="h-32 w-full" />}>
          <Comp />
        </Suspense>
      );
    }
  }

  if (!feature) {
    return <DefaultDemo />;
  }

  const Comp = feature.render;
  return (
    <Suspense fallback={<Skeleton className="h-32 w-full" />}>
      <Comp />
    </Suspense>
  );
}
