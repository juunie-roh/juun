"use client";

import { Collection } from "@juun-roh/cesium-utils";
import {
  Cartesian3,
  Color,
  ColorMaterialProperty,
  Entity,
  HeightReference,
  Math as CMath,
} from "cesium";
import { Eye, EyeOff, Info, Trash } from "lucide-react";
import { useEffect, useEffectEvent, useMemo, useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Toggle } from "@/components/ui/toggle";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { useViewer } from "../../../_contexts";

type BuildingType = "residential" | "commercial" | "industrial";

interface BuildingStats {
  residential: number;
  commercial: number;
  industrial: number;
  total: number;
}

// Camera destination for viewing the city
const CITY_VIEW = {
  destination: Cartesian3.fromDegrees(126.9784, 37.5665, 5000), // Seoul, South Korea
  orientation: {
    heading: CMath.toRadians(0),
    pitch: CMath.toRadians(-45),
    roll: 0.0,
  },
  duration: 2,
};

export default function TagBasedControl() {
  const { viewer } = useViewer();
  const [stats, setStats] = useState<BuildingStats>({
    residential: 0,
    commercial: 0,
    industrial: 0,
    total: 0,
  });
  const [visibility, setVisibility] = useState<Record<BuildingType, boolean>>({
    residential: true,
    commercial: true,
    industrial: true,
  });

  // Initialize Collection
  const collection = useMemo(() => {
    if (!viewer) return undefined;
    return new Collection({
      collection: viewer.entities,
      tag: "city-buildings",
    });
  }, [viewer]);

  const updateStats = useEffectEvent(() => {
    if (!collection) return;

    setStats({
      residential: collection.get("residential").length,
      commercial: collection.get("commercial").length,
      industrial: collection.get("industrial").length,
      total: collection.values.length,
    });
  });

  // Setup event listeners
  useEffect(() => {
    if (!collection) return;

    collection.addEventListener("add", updateStats);
    collection.addEventListener("remove", updateStats);
    collection.addEventListener("clear", updateStats);

    return () => {
      collection.removeEventListener("add", updateStats);
      collection.removeEventListener("remove", updateStats);
      collection.removeEventListener("clear", updateStats);
    };
  }, [collection]);

  // Cleanup on unmount
  useEffect(() => {
    if (!viewer) return;
    viewer.camera.flyTo(CITY_VIEW);

    return () => {
      collection?.removeAll();
      collection?.destroy();
    };
  }, [viewer, collection]);

  const createBuilding = (
    type: BuildingType,
    lon: number,
    lat: number,
  ): Entity => {
    const configs = {
      residential: {
        color: Color.LIGHTGREEN.withAlpha(0.8),
        dimensions: new Cartesian3(40, 40, 80 + Math.random() * 100),
        shape: "box" as const,
      },
      commercial: {
        color: Color.LIGHTSKYBLUE.withAlpha(0.8),
        dimensions: new Cartesian3(60, 60, 120 + Math.random() * 150),
        shape: "box" as const,
      },
      industrial: {
        color: Color.LIGHTCORAL.withAlpha(0.8),
        dimensions: new Cartesian3(80, 80, 40 + Math.random() * 60),
        shape: "box" as const,
      },
    };

    const config = configs[type];

    return new Entity({
      position: Cartesian3.fromDegrees(lon, lat, 0),
      box: {
        dimensions: config.dimensions,
        material: new ColorMaterialProperty(config.color),
        outline: true,
        outlineColor: Color.WHITE,
        heightReference: HeightReference.CLAMP_TO_GROUND,
      },
      properties: {
        type,
        originalColor: new ColorMaterialProperty(config.color),
      },
    });
  };

  const addBuildings = (type: BuildingType, count: number) => {
    if (!collection) return;

    const buildings: Entity[] = [];
    const baseCoords = { lon: 126.9784, lat: 37.5665 };

    for (let i = 0; i < count; i++) {
      const offsetLon = (Math.random() - 0.5) * 0.02;
      const offsetLat = (Math.random() - 0.5) * 0.02;
      buildings.push(
        createBuilding(
          type,
          baseCoords.lon + offsetLon,
          baseCoords.lat + offsetLat,
        ),
      );
    }

    collection.add(buildings, type);
  };

  const toggleVisibility = (type: BuildingType) => {
    if (!collection) return;

    const newVisibility = !visibility[type];
    if (newVisibility) {
      collection.show(type);
    } else {
      collection.hide(type);
    }
    setVisibility((prev) => ({ ...prev, [type]: newVisibility }));
  };

  const toggleHighlight = (type: BuildingType) => {
    if (!collection) return;

    const highlightColors: Record<BuildingType, ColorMaterialProperty> = {
      residential: new ColorMaterialProperty(Color.LIME.withAlpha(0.9)),
      commercial: new ColorMaterialProperty(Color.CYAN.withAlpha(0.9)),
      industrial: new ColorMaterialProperty(Color.CRIMSON.withAlpha(0.9)),
    };

    collection.forEach((entity) => {
      if (entity.box) {
        const material = entity.box.material as ColorMaterialProperty;
        const original = entity.properties
          ?.originalColor as ColorMaterialProperty;
        entity.box.material = material.color
          ?.getValue()
          .equals(original.color?.getValue())
          ? highlightColors[type]
          : original;
      }
    }, type);
  };

  const removeByType = (type: BuildingType) => {
    if (!collection) return;
    collection.remove(type);
    setVisibility((prev) => ({ ...prev, [type]: true }));
  };

  const clearAll = () => {
    if (!collection) return;
    collection.removeAll();
    setVisibility({ residential: true, commercial: true, industrial: true });
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Add Buildings Section */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Add Buildings{" "}
          <Tooltip>
            <TooltipTrigger>
              <Info className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <code>
                collection.add(targetEntities, "residential" | "commercial" |
                "industrial")
              </code>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="grid grid-cols-3 gap-2">
          <Button
            onClick={() => addBuildings("residential", 5)}
            disabled={!collection}
            size="sm"
          >
            +5 Residential
          </Button>
          <Button
            onClick={() => addBuildings("commercial", 3)}
            disabled={!collection}
            size="sm"
          >
            +3 Commercial
          </Button>
          <Button
            onClick={() => addBuildings("industrial", 2)}
            disabled={!collection}
            size="sm"
          >
            +2 Industrial
          </Button>
        </div>
      </div>

      <Separator />

      {/* Stats Panel */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Building Statistics
          <Tooltip>
            <TooltipTrigger>
              <Info className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <code>
                collection.get("residential" | "commercial" |
                "industrial").length
              </code>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="flex items-center justify-between gap-2">
          <div className="flex items-center gap-1">
            <span>residential</span>
            <Badge>{stats.residential}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <span>commercial</span>
            <Badge>{stats.commercial}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <span>industrial</span>
            <Badge>{stats.industrial}</Badge>
          </div>
          <div className="flex items-center gap-1">
            <span>total</span>
            <Badge>{stats.total}</Badge>
          </div>
        </div>
      </div>

      <Separator />

      {/* Visibility Control Section */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Visibility Control
          <Tooltip>
            <TooltipTrigger>
              <Info className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <div>
                <code>
                  collection.show("residential" | "commercial" | "industrial")
                </code>
              </div>
              <div>
                <code>
                  collection.hide("residential" | "commercial" | "industrial")
                </code>
              </div>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="grid grid-cols-3 gap-2">
          <Toggle
            onClick={() => toggleVisibility("residential")}
            disabled={!collection || stats.residential === 0}
            size="sm"
            variant="outline"
          >
            {visibility.residential ? <Eye /> : <EyeOff />} Residential
          </Toggle>
          <Toggle
            onClick={() => toggleVisibility("commercial")}
            disabled={!collection || stats.commercial === 0}
            size="sm"
            variant="outline"
          >
            {visibility.commercial ? <Eye /> : <EyeOff />} Commercial
          </Toggle>
          <Toggle
            onClick={() => toggleVisibility("industrial")}
            disabled={!collection || stats.industrial === 0}
            size="sm"
            variant="outline"
          >
            {visibility.industrial ? <Eye /> : <EyeOff />} Industrial
          </Toggle>
        </div>
      </div>

      <Separator />

      {/* Property Control Section */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Property(material) Control
          <Tooltip>
            <TooltipTrigger>
              <Info className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <code>
                collection.forEach(callback, "residential" | "commercial" |
                "industrial")
              </code>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="grid grid-cols-3 gap-2">
          <Toggle
            onClick={() => toggleHighlight("residential")}
            disabled={!collection || stats.residential === 0}
            size="sm"
            variant="outline"
          >
            Residential
          </Toggle>
          <Toggle
            onClick={() => toggleHighlight("commercial")}
            disabled={!collection || stats.commercial === 0}
            size="sm"
            variant="outline"
          >
            Commercial
          </Toggle>
          <Toggle
            onClick={() => toggleHighlight("industrial")}
            disabled={!collection || stats.industrial === 0}
            size="sm"
            variant="outline"
          >
            Industrial
          </Toggle>
        </div>
      </div>

      <Separator />

      {/* Cleanup Section */}
      <div className="space-y-2">
        <Label className="text-sm font-semibold">
          Cleanup Operations
          <Tooltip>
            <TooltipTrigger>
              <Info className="size-4" />
            </TooltipTrigger>
            <TooltipContent>
              <code>
                collection.remove("residential" | "commercial" | "industrial")
              </code>
            </TooltipContent>
          </Tooltip>
        </Label>
        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => removeByType("residential")}
            disabled={!collection || stats.residential === 0}
            size="sm"
            variant="destructive"
          >
            <Trash /> Residential
          </Button>
          <Button
            onClick={() => removeByType("commercial")}
            disabled={!collection || stats.commercial === 0}
            size="sm"
            variant="destructive"
          >
            <Trash /> Commercial
          </Button>
          <Button
            onClick={() => removeByType("industrial")}
            disabled={!collection || stats.industrial === 0}
            size="sm"
            variant="destructive"
          >
            <Trash /> Industrial
          </Button>
          <Button
            onClick={clearAll}
            disabled={!collection || stats.total === 0}
            size="sm"
            variant="destructive"
          >
            <Trash /> Clear All
          </Button>
        </div>
      </div>
    </div>
  );
}
