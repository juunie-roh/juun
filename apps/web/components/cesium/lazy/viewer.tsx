'use client';

import 'public/cesium/Widgets/widgets.css';
import 'public/cesium/Widgets/lighter.css';

import {
  CameraEventType,
  Cartesian3,
  Color,
  HeightReference,
  KeyboardEventModifier,
  Math as CMath,
  Terrain,
} from 'cesium';
import { useEffect } from 'react';
import { Entity, useCesium, Viewer as RViewer } from 'resium';

import type { IViewerProps } from '../cesium.types';

// Separate component that uses the viewer context
function ViewerContent({
  animation = true,
  bottomContainer = true,
  flyTo,
  timeline = true,
  terrain,
  terrainProvider,
}: IViewerProps) {
  const { viewer } = useCesium();

  useEffect(() => {
    if (!viewer) return;

    // Remove the credits area if specified as false
    if (!bottomContainer) viewer.bottomContainer.remove();

    // Hide timeline if specified as false
    if (!timeline) {
      (viewer.timeline.container as HTMLElement).style.display = 'none';
    }

    // Hide animation if specified as false
    if (!animation) {
      (viewer.animation.container as HTMLElement).style.display = 'none';
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

    // Fly to the initial location (custom or default Tokyo)
    viewer.camera.flyTo(
      flyTo || {
        destination: new Cartesian3(
          -3964624.632297504,
          3356819.574895879,
          3696707.310427818,
        ),
        orientation: {
          heading: CMath.toRadians(0),
          pitch: CMath.toRadians(-50),
          roll: 0.0,
        },
      },
    );

    // Set up terrain only if no custom terrain options provided
    if (!terrain && !terrainProvider) {
      const t = Terrain.fromWorldTerrain();
      t.readyEvent.addEventListener((provider) => {
        viewer.terrainProvider = provider;
      });
    }
  }, [
    animation,
    bottomContainer,
    flyTo,
    terrain,
    terrainProvider,
    timeline,
    viewer,
  ]);

  return (
    <Entity
      position={Cartesian3.fromDegrees(139.7454, 35.6586, 250)}
      box={{
        dimensions: new Cartesian3(50.0, 50.0, 333.0),
        material: Color.RED.withAlpha(0.8),
        outline: true,
        outlineColor: Color.WHITE,
        heightReference: HeightReference.CLAMP_TO_GROUND,
      }}
    />
  );
}

export default function LazyViewer({
  animation,
  bottomContainer,
  flyTo,
  timeline,
  terrain,
  terrainProvider,
  ...props
}: IViewerProps) {
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
