'use client';

import {
  HybridTerrainProvider,
  TerrainArea,
  TerrainVisualizer,
} from '@juun-roh/cesium-utils';
import { Button } from '@pkg/ui/button';
import { EllipsoidTerrainProvider, Terrain } from 'cesium';
import { useEffect, useState } from 'react';

import useViewerStore from '@/stores/slices/viewer';

export default function TerrainDemo() {
  const { viewer } = useViewerStore();
  const [visualizer, setVisualizer] = useState<TerrainVisualizer | undefined>();
  const [isShowing, setIsShowing] = useState<boolean | undefined>(false);

  useEffect(() => {
    if (!viewer) return;

    const setupTerrain = () => {
      try {
        const terrain = Terrain.fromWorldTerrain({
          requestVertexNormals: true,
        });

        terrain.readyEvent.addEventListener((provider) => {
          const tileRanges = new Map();
          tileRanges.set(13, {
            start: { x: 13963, y: 2389 },
            end: { x: 13967, y: 2393 },
          });

          const area = new TerrainArea({
            terrainProvider: provider,
            tileRanges,
          });

          const hybrid = new HybridTerrainProvider({
            terrainAreas: [area],
            terrainProvider: new EllipsoidTerrainProvider(),
          });

          viewer.terrainProvider = hybrid;
          setVisualizer(
            new TerrainVisualizer(viewer, { terrainProvider: hybrid }),
          );
        });
      } catch (error) {
        console.error('Error setting up terrain:', error);
      }
    };

    const timeoutId = setTimeout(setupTerrain, 1);

    return () => clearTimeout(timeoutId);
  }, [viewer]);

  return (
    <div className="size-full">
      <Button
        className="w-full"
        disabled={!visualizer}
        onClick={() => {
          if (visualizer?.visible) {
            visualizer.hide();
          } else {
            visualizer?.show(13);
          }

          setIsShowing(visualizer?.visible);
        }}
      >
        {isShowing ? 'Hide' : 'Show'} Terrain Tiles
      </Button>
    </div>
  );
}
