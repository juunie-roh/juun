"use client";

import { Highlight } from "@juun-roh/cesium-utils";
import * as Cesium from "cesium";
import React from "react";

import { useViewer } from "../../../_contexts";
import ColorSelector from "./color-selector";

export default function Silhouette() {
  const { viewer } = useViewer();
  const [color, setColor] = React.useState<string>(
    Cesium.Color.RED.toCssColorString(),
  );
  const highlightRef = React.useRef<Highlight>(null);

  const addTileset = React.useEffectEvent(async () => {
    if (!viewer) return;
    try {
      const tileset = await Cesium.Cesium3DTileset.fromIonAssetId(75343);
      viewer.scene.primitives.add(tileset);
    } catch (e) {
      console.error(`Error creating tileset: ${e}`);
    }
  });

  const onMouseMove = React.useEffectEvent(
    (movement: Cesium.ScreenSpaceEventHandler.MotionEvent) => {
      if (!viewer || !highlightRef.current) return;
      const picked = viewer.scene.pick(movement.endPosition);
      if (!Cesium.defined(picked)) return highlightRef.current.hide();
      highlightRef.current.show(picked, {
        color: Cesium.Color.fromCssColorString(color),
      });
    },
  );

  React.useEffect(() => {
    if (!viewer) return;

    highlightRef.current = Highlight.getInstance(viewer);

    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        -74.01881302800248,
        40.69114333714821,
        753,
      ),
      orientation: Cesium.HeadingPitchRoll.fromDegrees(
        21.27879878293835,
        -21.34390550872462,
        0.0716951918898415,
      ),
      endTransform: Cesium.Matrix4.IDENTITY,
    });

    addTileset();

    viewer.screenSpaceEventHandler.setInputAction(
      onMouseMove,
      Cesium.ScreenSpaceEventType.MOUSE_MOVE,
    );

    return () => {
      viewer?.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.MOUSE_MOVE,
      );
    };
  }, [viewer]);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <ColorSelector color={color} setColor={setColor} />
      </div>
    </div>
  );
}
