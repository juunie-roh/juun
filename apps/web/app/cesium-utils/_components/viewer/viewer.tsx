"use client";

import "cesium/Build/Cesium/Widgets/widgets.css";
import "cesium/Build/Cesium/Widgets/lighter.css";

import type { Viewer } from "cesium";
import { CameraEventType, KeyboardEventModifier, Terrain } from "cesium";
import { Fragment, useEffect } from "react";
import type { ViewerProps as RViewerProps } from "resium";
import { useCesium, Viewer as RViewer } from "resium";

import useViewerStore from "@/stores/slices/viewer";

export interface ViewerProps extends Omit<RViewerProps, "className"> {
  /** Whether to show the credit container. @default true */
  bottomContainer?: boolean;
  /** Initial location of the camera */
  flyTo?: Parameters<Viewer["camera"]["flyTo"]>[0];
  /** Whether to show the timeline CesiumWidget. @default true */
  timeline?: boolean;
  /** Whether to show the animation CesiumWidget. @default true */
  animation?: boolean;
}

// Separate component that uses the viewer context
function ViewerContent({
  animation = true,
  bottomContainer = true,
  flyTo,
  timeline = true,
  terrain,
  terrainProvider,
}: ViewerProps) {
  const { viewer } = useCesium();
  const { setViewer, removeViewer, setIsFlying } = useViewerStore();

  useEffect(() => {
    if (!viewer) return;
    setViewer(viewer);
    // Remove the credits area if specified as false
    if (!bottomContainer) viewer.bottomContainer.remove();

    // Hide timeline if specified as false
    if (!timeline) {
      (viewer.timeline.container as HTMLElement).style.display = "none";
    }

    // Hide animation if specified as false
    if (!animation) {
      (viewer.animation.container as HTMLElement).style.display = "none";
    }

    // Set tilt event type as RIGHT_DRAG
    viewer.scene.screenSpaceCameraController.tiltEventTypes = [
      CameraEventType.RIGHT_DRAG,
      CameraEventType.PINCH,
      {
        eventType: CameraEventType.LEFT_DRAG,
        modifier: KeyboardEventModifier.CTRL,
      },
      {
        eventType: CameraEventType.RIGHT_DRAG,
        modifier: KeyboardEventModifier.CTRL,
      },
    ];

    // Set zoom event type as MIDDLE_DRAG
    viewer.scene.screenSpaceCameraController.zoomEventTypes = [
      CameraEventType.MIDDLE_DRAG,
      CameraEventType.WHEEL,
      CameraEventType.PINCH,
    ];

    // Fly to the initial location
    const originalFlyTo = viewer.camera.flyTo.bind(viewer.camera);
    viewer.camera.flyTo = (options) => {
      setIsFlying(true);
      originalFlyTo({
        ...options,
        complete: () => {
          if (options.complete) options.complete();
          setIsFlying(false);
        },
      });
    };

    if (flyTo) viewer.camera.flyTo(flyTo);

    // Set up terrain only if no custom terrain options provided
    if (!terrain && !terrainProvider) {
      const t = Terrain.fromWorldTerrain();
      t.readyEvent.addEventListener((provider) => {
        viewer.terrainProvider = provider;
      });
    }

    return () => {
      if (viewer) {
        viewer.camera.flyTo = originalFlyTo;
        removeViewer();
      }
    };
  }, [
    animation,
    bottomContainer,
    flyTo,
    terrain,
    terrainProvider,
    timeline,
    viewer,
    setViewer,
    removeViewer,
    setIsFlying,
  ]);

  return <Fragment />;
}

export default function LazyViewer({
  animation,
  bottomContainer,
  flyTo,
  timeline,
  terrain,
  terrainProvider,
  ...props
}: ViewerProps) {
  return (
    <RViewer
      baseLayerPicker={false}
      fullscreenButton={false}
      geocoder={false}
      infoBox={false}
      navigationHelpButton={false}
      scene3DOnly={true}
      selectionIndicator={false}
      homeButton={false}
      className="size-full"
      terrain={terrain}
      terrainProvider={terrainProvider}
      {...props}
    >
      <ViewerContent
        animation={animation}
        bottomContainer={bottomContainer}
        flyTo={flyTo}
        timeline={timeline}
        terrain={terrain}
        terrainProvider={terrainProvider}
      />
    </RViewer>
  );
}
