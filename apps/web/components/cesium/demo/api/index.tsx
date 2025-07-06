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
    <div className="text-muted-foreground flex size-full items-center justify-center">
      Select an API feature to demonstrate
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
