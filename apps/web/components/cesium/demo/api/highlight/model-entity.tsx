"use client";

import { Highlight } from "@juun-roh/cesium-utils";
import { Checkbox } from "@pkg/ui/checkbox";
import { Label } from "@pkg/ui/label";
import { Slider } from "@pkg/ui/slider";
import * as Cesium from "cesium";
import { useEffect, useMemo, useState } from "react";

import useViewerStore from "@/stores/slices/viewer";

import ColorSelector from "./color-selector";

export default function ModelEntity() {
  const { viewer } = useViewerStore();
  const [color, setColor] = useState<string>(
    Cesium.Color.RED.toCssColorString(),
  );
  const [width, setWidth] = useState<number>(2);
  const [show, setShow] = useState<boolean>(false);

  const highlight = useMemo(
    () => (viewer ? Highlight.getInstance(viewer) : undefined),
    [viewer],
  );
  const entity = useMemo(() => {
    const position = Cesium.Cartesian3.fromDegrees(
      -123.0744619,
      44.0503706,
      5000,
    );
    const heading = Cesium.Math.toRadians(135);
    const pitch = 0;
    const roll = 0;
    const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll);
    const orientation = Cesium.Transforms.headingPitchRollQuaternion(
      position,
      hpr,
    );

    return new Cesium.Entity({
      name: "cesium air",
      position: position,
      orientation: orientation,
      model: {
        uri: "/models/Cesium_Air.glb",
        minimumPixelSize: 128,
        maximumScale: 20000,
      },
    });
  }, []);

  // Initial Model Set
  useEffect(() => {
    if (!viewer) return;

    viewer.entities.add(entity);
    viewer.trackedEntity = entity;

    return () => {
      viewer.entities.remove(entity);
    };
  }, [viewer, entity]);

  useEffect(() => {
    if (!viewer || !highlight) return;
    if (!show) return highlight.hide();
    highlight.show(entity, {
      color: Cesium.Color.fromCssColorString(color),
      width,
    });
  }, [show, viewer, highlight, color, entity, width]);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <ColorSelector color={color} setColor={setColor} />
        <div className="flex grow items-center gap-2">
          <Checkbox
            id="show"
            checked={show}
            onCheckedChange={(checked) => setShow(checked.valueOf() as boolean)}
          />
          <Label htmlFor="show">show</Label>
        </div>
      </div>
      <div className="flex w-full items-center gap-2">
        <Label htmlFor="width">width</Label>
        <Slider
          id="width"
          defaultValue={[2]}
          max={20}
          min={1}
          step={1}
          onValueChange={(v) => setWidth(v[0]!)}
          disabled={!highlight}
          className={highlight ? "opacity-100" : "opacity-30"}
        />
      </div>
    </div>
  );
}
