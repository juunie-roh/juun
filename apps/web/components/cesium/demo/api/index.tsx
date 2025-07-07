import { CodeBlock } from "@pkg/ui/code-block";
import Link from "next/link";

import { Api } from "@/components/cesium/types";

import CollectionDemo from "./collection";
import HighlightDemo from "./highlight";
import TerrainDemo from "./terrain";
import ViewerDemo from "./viewer";

// Map each API feature to its corresponding demo component
export const FeatureDemos: Record<Api, React.ComponentType> = {
  collection: CollectionDemo,
  terrain: TerrainDemo,
  viewer: ViewerDemo,
  highlight: HighlightDemo,
};

// Default component when no feature is selected
function DefaultDemo() {
  return (
    <div className="prose text-primary max-w-none">
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
    </div>
  );
}

// Feature demo renderer component
interface FeatureDemoProps {
  feat: Api | undefined;
}

export default function FeatureDemo({ feat }: FeatureDemoProps) {
  if (!feat) {
    return <DefaultDemo />;
  }

  const DemoComponent = FeatureDemos[feat];
  return <DemoComponent />;
}
