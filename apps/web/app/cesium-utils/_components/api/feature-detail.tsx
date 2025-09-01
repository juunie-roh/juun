"use client";

import { CodeBlock } from "@juun/ui/code-block";
import { Prose } from "@juun/ui/prose";
import { Skeleton } from "@juun/ui/skeleton";
import Link from "next/link";
import { Suspense } from "react";

import { useCesiumUtils } from "../../_contexts/cesium-utils";
import { API_LABELS, getFeatures, isValidApi } from "../../_utils";

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
