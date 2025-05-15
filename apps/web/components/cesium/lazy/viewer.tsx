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
  Viewer as CViewer,
} from 'cesium';
import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CesiumComponentRef,
  Entity,
  Viewer as RViewer,
  ViewerProps,
} from 'resium';

export default function LazyViewer({ ...props }: ViewerProps) {
  const initialized = useRef<boolean>(false);
  const [viewer, setViewer] = useState<CViewer | undefined>(undefined);

  // Your callback ref and useEffects (copied from your original component)
  const ref = useCallback((node: CesiumComponentRef<CViewer> | null) => {
    if (node?.cesiumElement && !initialized.current) {
      console.log('🚀 ~ :', 'Cesium viewer obtained successfully');
      setViewer(node.cesiumElement);
      initialized.current = true;
    }
  }, []);

  // Effect that runs when viewer is available
  useEffect(() => {
    if (!viewer || !initialized.current) return;
    // Remove the credits area
    viewer.bottomContainer.remove();
    (viewer.timeline.container as HTMLElement).style.display = 'none';
    (viewer.animation.container as HTMLElement).style.display = 'none';
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

    // Fly to Tokyo
    viewer.camera.flyTo({
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
    });

    const terrain = Terrain.fromWorldTerrain();
    terrain.readyEvent.addEventListener((provider) => {
      viewer.terrainProvider = provider;
    });
  }, [viewer]);

  return (
    <RViewer
      ref={ref}
      baseLayerPicker={true}
      fullscreenButton={false}
      geocoder={false}
      infoBox={false}
      navigationHelpButton={false}
      scene3DOnly={true}
      selectionIndicator={false}
      homeButton={false}
      className="size-full"
      {...props}
    >
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
    </RViewer>
  );
}
