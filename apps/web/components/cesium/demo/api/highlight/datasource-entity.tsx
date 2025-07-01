"use client";

import { Highlight } from "@juun-roh/cesium-utils";
import { Button } from "@pkg/ui/button";
import { Checkbox } from "@pkg/ui/checkbox";
import { Label } from "@pkg/ui/label";
import { Separator } from "@pkg/ui/separator";
import { Slider } from "@pkg/ui/slider";
import {
  Cartesian3,
  Color,
  defined,
  GeoJsonDataSource,
  Matrix4,
  ScreenSpaceEventType,
} from "cesium";
import { useCallback, useEffect, useMemo, useState } from "react";

import useViewerStore from "@/stores/slices/viewer";

import ColorSelector from "./color-selector";

export default function DataSourceEntity() {
  const { viewer } = useViewerStore();
  const [isPicking, setIsPicking] = useState<boolean>(false);
  const [outline, setOutline] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(2);
  const [color, setColor] = useState<string>(Color.RED.toCssColorString());

  const highlight = useMemo(
    () => (viewer ? Highlight.getInstance(viewer) : undefined),
    [viewer],
  );

  const onMouseMove = useCallback(
    (movement: any) => {
      if (!viewer || !highlight || !isPicking) return;
      const picked = viewer.scene.pick(movement.endPosition);
      if (!defined(picked)) return highlight.hide();
      highlight.show(picked, {
        outline,
        width,
        color: Color.fromCssColorString(color),
      });
    },
    [isPicking, viewer, highlight, outline, width, color],
  );

  useEffect(() => {
    if (!viewer) return;
    // Set GeoJsonDataSource to the viewer on mount
    viewer.dataSources.add(
      GeoJsonDataSource.load("/data/ne_10m_us_states.topojson"),
    );
    // Set camera
    viewer.camera.lookAt(
      Cartesian3.fromDegrees(-98.0, 40.0),
      new Cartesian3(0.0, -4790000.0, 3930000.0),
    );
    viewer.camera.lookAtTransform(Matrix4.IDENTITY);

    return () => {
      // Remove data source from the viewer on unmount
      viewer.dataSources.removeAll();
    };
  }, [viewer]);

  useEffect(() => {
    if (isPicking) {
      viewer?.screenSpaceEventHandler.setInputAction(
        onMouseMove,
        ScreenSpaceEventType.MOUSE_MOVE,
      );
    }

    return () => {
      viewer?.screenSpaceEventHandler.removeInputAction(
        ScreenSpaceEventType.MOUSE_MOVE,
      );
    };
  }, [viewer, isPicking, onMouseMove]);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <ColorSelector color={color} setColor={setColor} />
        <Button
          className="grow"
          disabled={!highlight}
          onClick={() => setIsPicking(!isPicking)}
        >
          Mouse Event {isPicking ? "off" : "on"}
        </Button>
      </div>
      <div className="flex w-full items-center gap-2">
        <div className="flex items-center gap-2">
          <Label htmlFor="outline">outline</Label>
          <Checkbox
            id="outline"
            checked={outline}
            onCheckedChange={(checked) => {
              return checked ? setOutline(true) : setOutline(false);
            }}
          />
        </div>
        <Separator orientation="vertical" className="h-5" />
        <div className="flex w-full items-center gap-2">
          <Label htmlFor="width">width</Label>
          <Slider
            id="width"
            defaultValue={[2]}
            max={20}
            min={1}
            step={1}
            onValueChange={(v) => setWidth(v[0]!)}
            disabled={!outline}
            className={outline ? "opacity-100" : "opacity-30"}
          />
        </div>
      </div>
    </div>
  );
}
