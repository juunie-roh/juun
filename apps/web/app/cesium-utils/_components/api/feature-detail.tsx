"use client";

import { CodeBlock } from "@juun/ui/code-block";
import { Prose } from "@juun/ui/prose";
import { Skeleton } from "@juun/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";

import { useCesiumUtils } from "../../_contexts/cesium-utils";
import { API_LABELS, getFeatures, isValidApi } from "../../_data";

export default function ApiFeatureDetail() {
  const { feature } = useCesiumUtils();

  // For the base /cesium-utils route, show the default demo
  if (typeof window !== "undefined") {
    const pathname = window.location.pathname;
    if (pathname === "/cesium-utils") {
      return <Default />;
    }

    const api = pathname.split("/").pop();
    if (!api || !isValidApi(api)) {
      return <Default />;
    }

    if (!feature) {
      const features = getFeatures(api);
      const defaultFeature =
        features.find((f) => f.value === "description") || features[0];

      if (!defaultFeature) {
        return (
          <div className="prose max-w-none">
            <h2 className="mb-2 tracking-tight">{API_LABELS[api]}</h2>
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
    return <Default />;
  }

  const Comp = feature.render;
  return (
    <Suspense fallback={<Skeleton className="h-32 w-full" />}>
      <Comp />
    </Suspense>
  );
}

// Default component when no feature is selected
function Default() {
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
        leverages native Cesium APIs with a lightweight React wrapper for
        optimal performance and direct access to 3D geospatial capabilities.
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

      <h4 className="mb-2 text-base font-medium">React Integration</h4>
      <p className="mb-4">
        When using React, the utilities integrate seamlessly with native Cesium
        viewers. Access the viewer through React refs or context and apply the
        utility methods:
      </p>
      <CodeBlock
        fileName="viewer.tsx"
        code={`import * as Cesium from "cesium";
import * as React from "react";
import { Collection } from "@juun-roh/cesium-utils/collection";

export default function CesiumViewer() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const viewerRef = React.useRef<Cesium.Viewer>();
  const [collections, setCollections] = React.useState<Map<string, Collection>>(new Map());

  React.useEffect(() => {
    if (!containerRef.current) return;

    // Create native Cesium viewer
    const viewer = new Cesium.Viewer(containerRef.current, {
      baseLayerPicker: false,
      fullscreenButton: false,
      geocoder: false,
      infoBox: false,
      navigationHelpButton: false,
      scene3DOnly: true,
      selectionIndicator: false,
      homeButton: false,
    });

    viewerRef.current = viewer;

    // Configure viewer UI
    viewer.bottomContainer.remove();

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

    return () => {
      if (viewer && !viewer.isDestroyed()) {
        viewer.destroy();
      }
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
}`}
      />
    </Prose>
  );
}
