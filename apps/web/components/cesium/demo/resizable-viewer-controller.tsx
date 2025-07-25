"use client";

import { useMediaQuery } from "@pkg/ui/hooks/use-media-query";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@pkg/ui/resizable";

import useCesiumUtilsApiStore from "@/stores/slices/cesium-utils-api";

import Viewer from "../viewer";
import FeatureDemo from "./api";

export default function ResizableViewerController() {
  const { option } = useCesiumUtilsApiStore();
  // State to track viewport size
  const isLargeScreen = useMediaQuery("min-width: 1024px");

  return (
    <ResizablePanelGroup
      direction={isLargeScreen ? "horizontal" : "vertical"}
      className="size-full overflow-hidden rounded-lg border"
    >
      <ResizablePanel defaultSize={70} minSize={40}>
        <div className="size-full">
          <Viewer
            key={option?.api || "default"} // refresh the viewer
            bottomContainer={false}
            animation={false}
            timeline={false}
            flyTo={option?.flyTo} // extendable viewer option
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
