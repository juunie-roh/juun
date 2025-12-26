"use client";

import { Sunlight } from "@juun-roh/cesium-utils/experimental";
import * as Cesium from "cesium";
import { ChevronDown, MousePointer2, MousePointer2Off } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";

import { useViewer } from "../../../_contexts";

export default function SunlightAnalysis() {
  const { viewer } = useViewer();
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<string>("12:00:00");
  const [timeZone, setTimeZone] = React.useState<string>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<Sunlight.AnalyzeOptions>({
    errorBoundary: 10,
    debugShowRays: true,
    debugShowPoints: true,
  });

  const form = useForm<Sunlight.AnalyzeOptions>({
    defaultValues: options,
  });

  const sunlightRef = React.useRef<Sunlight>(null);
  const tilesetPromise = React.useRef(
    Cesium.Cesium3DTileset.fromIonAssetId(75343),
  );
  const indicatorRef = React.useRef<Cesium.Entity>(null);

  React.useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  // Initial viewer setup
  React.useEffect(() => {
    if (!viewer) return;

    sunlightRef.current = new Sunlight(viewer);

    // set camera position to NY
    viewer.scene.setTerrain(
      Cesium.Terrain.fromWorldTerrain({ requestVertexNormals: true }),
    );
    viewer.shadows = true;
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
    // Load NY tileset
    const tileset = tilesetPromise.current;
    tileset
      .then((tile) => {
        if (viewer.scene.primitives.contains(tile)) {
          tile.show = true;
          return;
        }

        viewer.scene.primitives.add(tile);
      })
      .catch((error: any) => {
        console.log("🚀 ~ Cesium3DTileset.fromIonAssetId ~ error:", error);
      });

    return () => {
      // disable NY tileset
      tileset
        .then((tile) => {
          tile.show = false;
        })
        .catch((error: any) => {
          console.log("🚀 ~ Cesium3DTileset.fromIonAssetId ~ error:", error);
        });
    };
  }, [viewer, tilesetPromise]);

  const [isPicking, setIsPicking] = React.useState<boolean>(false);
  const onMouseMove =
    React.useEffectEvent<Cesium.ScreenSpaceEventHandler.MotionEventCallback>(
      (event) => {
        const position = viewer?.scene.pickPosition(event.endPosition);
        if (position && indicatorRef.current) {
          indicatorRef.current.position = new Cesium.ConstantPositionProperty(
            position,
          );
          indicatorRef.current.show = true;
        }
      },
    );

  // Combine date and time into a single Date object
  const getDateTime = () => {
    if (!date || !viewer) return null;

    const [hours = 0, minutes = 0, seconds = 0] = time.split(":").map(Number);
    const dateTime = new Date(date);
    dateTime.setHours(hours, minutes, seconds, 0);
    return dateTime;
  };

  const onLeftClick =
    React.useEffectEvent<Cesium.ScreenSpaceEventHandler.PositionedEventCallback>(
      (event) => {
        if (!viewer) return;

        const position = viewer.scene.pickPosition(event.position);
        const dateTime = getDateTime();
        toast.info(`Clicked at ${position}, time set to ${dateTime}`);
        if (position && sunlightRef.current && dateTime) {
          try {
            const result = sunlightRef.current.analyze(
              position,
              Cesium.JulianDate.fromDate(dateTime),
              options,
            );
            toast.info(`Sunlight: ${result.result} At: ${result.timestamp}`);
          } catch (error) {
            toast.error(
              `Analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            );
            console.error("Sunlight analysis error:", error);
            console.error("Scene mode at error:", viewer.scene.mode);
          }
        }
      },
    );

  React.useEffect(() => {
    if (!viewer || !isPicking) return;
    toast.info("Picking Enabled");
    // Create indicator entity when picking starts
    indicatorRef.current = viewer.entities.add({
      position: new Cesium.Cartesian3(),
      point: {
        pixelSize: options.errorBoundary,
        color: Cesium.Color.WHITE,
        heightReference: Cesium.HeightReference.NONE,
      },
      show: false,
    });

    // Register mouse move event
    viewer.screenSpaceEventHandler.setInputAction(
      onMouseMove,
      Cesium.ScreenSpaceEventType.MOUSE_MOVE,
    );
    viewer.screenSpaceEventHandler.setInputAction(
      onLeftClick,
      Cesium.ScreenSpaceEventType.LEFT_CLICK,
    );

    // Cleanup when picking stops or component unmounts
    return () => {
      if (indicatorRef.current) {
        viewer.entities.remove(indicatorRef.current);
        indicatorRef.current = null;
      }
      viewer.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.MOUSE_MOVE,
      );
      viewer.screenSpaceEventHandler.removeInputAction(
        Cesium.ScreenSpaceEventType.LEFT_CLICK,
      );
    };
  }, [viewer, isPicking, options.errorBoundary]);

  return (
    <div className="flex size-full flex-col gap-4">
      <Toggle
        variant="outline"
        size="lg"
        disabled={!viewer}
        pressed={isPicking}
        onPressedChange={setIsPicking}
      >
        {isPicking ? (
          <>
            <MousePointer2Off />
            Stop Picking
          </>
        ) : (
          <>
            <MousePointer2 />
            Start Picking
          </>
        )}
      </Toggle>
      {/* Analysis Options Form */}
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((data) => {
            toast.success(
              `Options set as { errorBoundary: ${data.errorBoundary}, debugShowRays: ${data.debugShowRays}, debugShowPoints: ${data.debugShowPoints} }`,
              { id: "set-analyze-option" },
            );
            setOptions(data);
          })}
          className="flex justify-between"
        >
          <div className="flex gap-2 lg:flex-col">
            <FormField
              control={form.control}
              name="errorBoundary"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Point Radius</FormLabel>
                  <FormControl>
                    <Input type="number" {...field} />
                  </FormControl>
                  <FormDescription>
                    Size of the point entity for error tolerance
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="debugShowRays"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Show Rays</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Whether to show sunlight paths
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="debugShowPoints"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Show Points</FormLabel>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormDescription>
                    Whether to show collision points
                  </FormDescription>
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="self-end">
            Apply
          </Button>
        </form>
      </Form>
      <div className="flex w-full gap-4">
        <div className="flex flex-col gap-3">
          <Label htmlFor="date-picker" className="px-1">
            Date
          </Label>
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                id="date-picker"
                className="w-32 justify-between font-normal"
              >
                {date ? date.toLocaleDateString() : "Select date"}
                <ChevronDown />
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="start"
            >
              <Calendar
                animate
                mode="single"
                selected={date}
                captionLayout="dropdown"
                timeZone={timeZone}
                onSelect={(date) => {
                  setDate(date);
                  setOpen(false);
                }}
              />
            </PopoverContent>
          </Popover>
        </div>
        <div className="flex flex-col gap-3">
          <Label htmlFor="time-picker" className="px-1">
            Time
          </Label>
          <Input
            type="time"
            id="time-picker"
            step={1}
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="appearance-none bg-background"
          />
        </div>
      </div>
    </div>
  );
}
