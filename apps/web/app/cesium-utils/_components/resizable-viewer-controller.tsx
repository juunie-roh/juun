"use client";

import { useMediaQuery } from "@juun/ui/hooks/use-media-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@juun/ui/resizable";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { useCesiumUtils } from "../_contexts/cesium-utils";
import FeatureDemo from "./api";
import Viewer from "./viewer";

interface ResizableViewerControllerProps {
  showDefaultDemo?: boolean;
}

export default function ResizableViewerController({
  showDefaultDemo = false,
}: ResizableViewerControllerProps) {
  const { removeFeature } = useCesiumUtils();
  const pathname = usePathname();
  // State to track viewport size
  const isLargeScreen = useMediaQuery("min-width: 1024px");

  // Clear feature selection when showing default demo or changing APIs
  useEffect(() => {
    if (showDefaultDemo) {
      removeFeature();
    }
  }, [showDefaultDemo, pathname, removeFeature]);

  const [flyToOption, setFlyToOption] = useState<any>(undefined);

  useEffect(() => {
    if (showDefaultDemo) {
      setFlyToOption(undefined);
      return;
    }

    // Get flyTo option based on current API
    const getFlyToOption = async () => {
      const currentApi = pathname.split("/").pop();
      if (
        !currentApi ||
        !["terrain", "collection", "highlight", "viewer", "sunlight"].includes(
          currentApi,
        )
      ) {
        return undefined;
      }

      try {
        const { Cartesian3, Math: CesiumMath } = await import("cesium");

        const flyToOptions: Record<string, any> = {
          collection: {
            destination: new Cartesian3(
              -3964624.632297504,
              3356819.574895879,
              3696707.310427818,
            ),
            orientation: {
              heading: CesiumMath.toRadians(0),
              pitch: CesiumMath.toRadians(-50),
              roll: 0.0,
            },
          },
          terrain: {
            destination: new Cartesian3(
              -3046596.558550092,
              4065701.630895504,
              3854536.407434127,
            ),
            orientation: {
              heading: CesiumMath.toRadians(0),
              pitch: CesiumMath.toRadians(-45),
              roll: 0.0,
            },
          },
        };

        return flyToOptions[currentApi];
      } catch (error) {
        console.error("Failed to load flyTo option:", error);
        return undefined;
      }
    };

    getFlyToOption().then(setFlyToOption);
  }, [pathname, showDefaultDemo]);

  return (
    <ResizablePanelGroup
      direction={isLargeScreen ? "horizontal" : "vertical"}
      className="size-full overflow-hidden rounded-lg border"
    >
      <ResizablePanel defaultSize={70} minSize={40}>
        <div className="size-full">
          <Viewer
            key={pathname} // refresh the viewer when API changes
            bottomContainer={false}
            animation={false}
            timeline={false}
            flyTo={flyToOption} // extendable viewer option
          />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="relative flex size-full flex-col gap-2 p-2">
          <div className="size-full overflow-y-auto">
            <FeatureDemo />
          </div>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
