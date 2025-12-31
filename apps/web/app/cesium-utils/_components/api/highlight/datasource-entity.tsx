"use client";

import { Highlight } from "@juun-roh/cesium-utils";
import {
  Cartesian3,
  Color,
  defined,
  GeoJsonDataSource,
  Matrix4,
  ScreenSpaceEventHandler,
  ScreenSpaceEventType,
} from "cesium";
import { useEffect, useEffectEvent, useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";

import { useViewer } from "../../../_contexts";
import ColorSelector from "./color-selector";

export default function DataSourceEntity() {
  const { viewer } = useViewer();
  const [isPicking, setIsPicking] = useState<boolean>(false);
  const [outline, setOutline] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(2);
  const [color, setColor] = useState<string>(Color.RED.toCssColorString());

  const highlightRef = useRef<Highlight>(null);

  useEffect(() => {
    if (!viewer) return;

    highlightRef.current = Highlight.getInstance(viewer);
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

  const onMouseMove = useEffectEvent(
    (movement: ScreenSpaceEventHandler.MotionEvent) => {
      if (!viewer || !highlightRef.current || !isPicking) return;
      const picked = viewer.scene.pick(movement.endPosition);
      if (!defined(picked)) return highlightRef.current.hide();
      highlightRef.current.show(picked, {
        outline,
        width,
        color: Color.fromCssColorString(color),
      });
    },
  );

  useEffect(() => {
    if (isPicking) {
      viewer?.screenSpaceEventHandler.setInputAction(
        onMouseMove,
        ScreenSpaceEventType.MOUSE_MOVE,
      );
    }

    return () => {
      highlightRef.current?.hide();
      viewer?.screenSpaceEventHandler.removeInputAction(
        ScreenSpaceEventType.MOUSE_MOVE,
      );
    };
  }, [viewer, isPicking]);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <ColorSelector color={color} setColor={setColor} />
        <Button
          className="grow"
          disabled={!highlightRef}
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
