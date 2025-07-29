"use client";

import { Button } from "@juun/ui/button";
import { Checkbox } from "@juun/ui/checkbox";
import { Label } from "@juun/ui/label";
import { Separator } from "@juun/ui/separator";
import { Slider } from "@juun/ui/slider";
import { Highlight } from "@juun-roh/cesium-utils";
import * as Cesium from "cesium";
import { useEffect, useMemo, useState } from "react";

import useViewerStore from "@/stores/slices/viewer";

import ColorSelector from "./color-selector";

export default function PolygonHighlight() {
  const { viewer } = useViewerStore();
  const [isShowing, setIsShowing] = useState<boolean>(false);
  const [outline, setOutline] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(2);
  const [color, setColor] = useState<string>(
    Cesium.Color.RED.toCssColorString(),
  );

  const highlight = useMemo(
    () => (viewer ? Highlight.getInstance(viewer) : undefined),
    [viewer],
  );

  const e = useMemo(
    () =>
      new Cesium.Entity({
        polygon: {
          hierarchy: [
            new Cesium.Cartesian3(
              -2358138.847340281,
              -3744072.459541374,
              4581158.5714175375,
            ),
            new Cesium.Cartesian3(
              -2357231.4925370603,
              -3745103.7886602185,
              4580702.9757762635,
            ),
            new Cesium.Cartesian3(
              -2355912.902205431,
              -3744249.029778454,
              4582402.154378103,
            ),
            new Cesium.Cartesian3(
              -2357208.0209552636,
              -3743553.4420488174,
              4581961.863286629,
            ),
          ],
          material: Cesium.Color.YELLOW.withAlpha(0.5),
        },
      }),
    [],
  );

  useEffect(() => {
    if (!viewer) return;
    viewer.entities.add(e);

    viewer.zoomTo(e);

    return () => {
      viewer.entities.remove(e);
    };
  }, [viewer, e]);

  useEffect(() => {
    if (!highlight) return;
    if (!isShowing) return highlight.hide();
    highlight.show(e, {
      color: Cesium.Color.fromCssColorString(color),
      outline,
      width,
    });
  }, [highlight, e, isShowing, color, outline, width]);

  return (
    <div className="flex flex-col gap-2 p-2">
      <div className="flex gap-2">
        <ColorSelector color={color} setColor={setColor} />
        <Button
          className="grow"
          disabled={!highlight}
          onClick={() => setIsShowing(!isShowing)}
        >
          {isShowing ? "hide" : "show"} highlight
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
