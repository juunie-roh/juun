"use client";

// Set Cesium base URL BEFORE importing Cesium (works with both webpack and Turbopack)
if (typeof window !== "undefined" && process.env.CESIUM_BASE_URL) {
  window.CESIUM_BASE_URL = process.env.CESIUM_BASE_URL;
}

import "cesium/Build/Cesium/Widgets/widgets.css";
import "cesium/Build/Cesium/Widgets/lighter.css";

import { cn } from "@juun/ui/lib/utils";
import {
  CameraEventType,
  KeyboardEventModifier,
  Viewer as CesiumViewer,
} from "cesium";
import { forwardRef, useEffect, useRef } from "react";

import { useViewer } from "../../_contexts";

export interface ViewerProps extends CesiumViewer.ConstructorOptions {
  /** Whether to show the credit container. @default true */
  bottomContainer?: boolean;
  /** Initial location of the camera */
  flyTo?: Parameters<CesiumViewer["camera"]["flyTo"]>[0];
  /** Additional CSS classes */
  className?: string;
  /** It is applied in order from the top to Viewer as `viewer.extend(XXX);` after the viewer is mounted. Nothing happens even it is updated by itself. */
  extend?: CesiumViewer.ViewerMixin[] | CesiumViewer.ViewerMixin;
}

const Viewer = forwardRef<HTMLDivElement, ViewerProps>(
  ({ bottomContainer = true, flyTo, className, extend, ...props }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewerRef = useRef<CesiumViewer | undefined>(undefined);
    const { setViewer } = useViewer();

    useEffect(() => {
      if (!containerRef.current) return;

      // Create Cesium viewer with minimal UI
      const viewer = new CesiumViewer(containerRef.current, {
        baseLayerPicker: false,
        fullscreenButton: false,
        geocoder: false,
        infoBox: false,
        navigationHelpButton: false,
        scene3DOnly: true,
        selectionIndicator: false,
        homeButton: false,
        ...props,
      });

      viewerRef.current = viewer;
      setViewer(viewer);

      // Configure UI elements
      if (!bottomContainer) {
        viewer.bottomContainer.remove();
      }

      // Configure camera controls
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

      viewer.scene.screenSpaceCameraController.zoomEventTypes = [
        CameraEventType.MIDDLE_DRAG,
        CameraEventType.WHEEL,
        CameraEventType.PINCH,
      ];

      if (extend) {
        if (Array.isArray(extend)) {
          extend.forEach((e) => viewer.extend(e, {}));
        } else {
          viewer.extend(extend);
        }
      }

      // Set initial camera position
      if (flyTo) {
        viewer.camera.flyTo(flyTo);
      }

      // Cleanup function
      return () => {
        if (viewerRef.current && !viewerRef.current.isDestroyed()) {
          viewerRef.current.destroy();
        }
        setViewer(undefined);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps -- props object causes infinite re-renders
    }, [bottomContainer, flyTo, setViewer, extend]);

    return (
      <div
        ref={(node) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        }}
        className={cn("size-full", className)}
      />
    );
  },
);

export default Viewer;
