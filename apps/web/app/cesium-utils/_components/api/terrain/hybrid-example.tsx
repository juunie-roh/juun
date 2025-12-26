"use client";

import { HybridTerrainProvider } from "@juun-roh/cesium-utils";
import { TerrainVisualizer } from "@juun-roh/cesium-utils/dev";
import type { TerrainRegion } from "@juun-roh/cesium-utils/terrain";
import { EllipsoidTerrainProvider, Terrain } from "cesium";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { useViewer } from "../../../_contexts";

export default function HybridExample() {
  const { viewer } = useViewer();
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
        });
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
