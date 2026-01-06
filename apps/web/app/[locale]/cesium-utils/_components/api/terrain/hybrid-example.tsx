"use client";

import { HybridTerrainProvider } from "@juun-roh/cesium-utils";
import { TerrainVisualizer } from "@juun-roh/cesium-utils/dev";
import type { TerrainRegion } from "@juun-roh/cesium-utils/terrain";
import {
  EllipsoidTerrainProvider,
  Terrain,
  type TerrainProvider,
} from "cesium";
import React from "react";

import { Button } from "@/components/ui/button";

import { useViewer } from "../../../_contexts";

export default function HybridExample() {
  const { viewer } = useViewer();
  const [visualizer, setVisualizer] = React.useState<
    TerrainVisualizer | undefined
  >();
  const [isShowing, setIsShowing] = React.useState<boolean | undefined>(false);

  React.useEffect(() => {
    if (!viewer) return;

    const setupTerrain = async () => {
      // Guard against viewer being destroyed during timeout
      if (!viewer || viewer.isDestroyed()) return;

      try {
        const terrain = Terrain.fromWorldTerrain({
          requestVertexNormals: true,
        });

        // Wait for terrain to be ready
        const provider = await new Promise<TerrainProvider>((resolve) => {
          terrain.readyEvent.addEventListener(() => resolve(terrain.provider));
        });

        // Guard after async operation - viewer may be destroyed while waiting
        if (!viewer || viewer.isDestroyed()) return;

        // Region 1: Level 13 world terrain covering area A
        const region: TerrainRegion = {
          provider,
          tiles: new Map().set(13, { x: [13963, 13967], y: [2389, 2393] }),
        };

        // Region 2: Level 13 world terrain covering area B
        const region2: TerrainRegion = {
          provider,
          tiles: new Map().set(13, { x: [13956, 13959], y: 2392 }),
        };

        // Region 3: Level 14 ellipsoid terrain (higher zoom override)
        const region3: TerrainRegion = {
          provider: new EllipsoidTerrainProvider(),
          tiles: new Map().set(14, { x: [27930, 27931], y: [4784, 4785] }),
        };

        const hybrid = new HybridTerrainProvider({
          regions: [region, region2, region3],
          defaultProvider: new EllipsoidTerrainProvider(),
        });

        viewer.terrainProvider = hybrid;
        setVisualizer(
          new TerrainVisualizer(viewer, { terrainProvider: hybrid }),
        );
      } catch (error) {
        console.error("Error setting up terrain:", error);
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
            visualizer?.show();
          }

          setIsShowing(visualizer?.visible);
        }}
      >
        {isShowing ? "Hide" : "Show"} Terrain Tiles
      </Button>
    </div>
  );
}
