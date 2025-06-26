'use client';

import { Highlight } from '@juun-roh/cesium-utils';
import {
  Cartesian3,
  Cesium3DTileset,
  Color,
  defined,
  HeadingPitchRoll,
  Matrix4,
  ScreenSpaceEventType,
} from 'cesium';
import { useCallback, useEffect, useMemo, useState } from 'react';

import useViewerStore from '@/stores/slices/viewer';

import ColorSelector from './color-selector';

export default function Silhouette() {
  const { viewer } = useViewerStore();
  const [color, setColor] = useState<string>(Color.RED.toCssColorString());
  const highlight = useMemo(
    () => (viewer ? Highlight.getInstance(viewer) : undefined),
    [viewer],
  );
  const tilesetPromise = useMemo(
    () => Cesium3DTileset.fromIonAssetId(75343),
    [],
  );

  const onMouseMove = useCallback(
    (movement: any) => {
      if (!viewer || !highlight) return;
      const picked = viewer.scene.pick(movement.endPosition);
      if (!defined(picked)) return highlight.hide();
      highlight.show(picked, {
        color: Color.fromCssColorString(color),
      });
    },
    [viewer, highlight, color],
  );

  useEffect(() => {
    if (!viewer) return;
    viewer.camera.setView({
      destination: Cartesian3.fromDegrees(
        -74.01881302800248,
        40.69114333714821,
        753,
      ),
      orientation: HeadingPitchRoll.fromDegrees(
        21.27879878293835,
        -21.34390550872462,
        0.0716951918898415,
      ),
      endTransform: Matrix4.IDENTITY,
    });

    tilesetPromise
      .then((tileset) => {
        if (viewer.scene.primitives.contains(tileset)) {
          tileset.show = true;
          return;
        }

        viewer.scene.primitives.add(tileset);
      })
      .catch((error: any) => {
        console.log('🚀 ~ Cesium3DTileset.fromIonAssetId ~ error:', error);
      });

    viewer.screenSpaceEventHandler.setInputAction(
      onMouseMove,
      ScreenSpaceEventType.MOUSE_MOVE,
    );

    return () => {
      viewer?.screenSpaceEventHandler.removeInputAction(
        ScreenSpaceEventType.MOUSE_MOVE,
      );
      tilesetPromise
        .then((tileset) => {
          tileset.show = false;
        })
        .catch((error: any) => {
          console.log('🚀 ~ Cesium3DTileset.fromIonAssetId ~ error:', error);
        });
    };
  }, [viewer, highlight, onMouseMove, tilesetPromise]);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <ColorSelector color={color} setColor={setColor} />
      </div>
    </div>
  );
}
