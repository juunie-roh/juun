"use client";

import { Sunlight } from "@juun-roh/cesium-utils/experimental";
import * as Cesium from "cesium";
import { ChevronDown, MousePointer2, MousePointer2Off } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
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
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Toggle } from "@/components/ui/toggle";

import { useViewer } from "../../../_contexts";

// Constants
const NY_COORDINATES = {
  longitude: -74.01881302800248,
  latitude: 40.69114333714821,
  height: 753,
} as const;

const NY_ORIENTATION = {
  heading: 21.27879878293835,
  pitch: -21.34390550872462,
  roll: 0.0716951918898415,
} as const;

const NY_TILESET_ID = 75343;
const DEFAULT_TIME = "12:00:00";
const INDICATOR_SIZE = 10;

// Time conversion utilities
const timeToDecimal = (time: string): number => {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  return hours + minutes / 60;
};

const decimalToTime = (decimal: number): string => {
  const hours = Math.floor(decimal);
  const minutes = Math.round((decimal - hours) * 60);
  return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00`;
};

const parseTimeToJulianDate = (date: Date, time: string): Cesium.JulianDate => {
  const [hours = 0, minutes = 0] = time.split(":").map(Number);
  const currentDate = Cesium.JulianDate.fromDate(date);
  const julianDate = Cesium.JulianDate.toGregorianDate(currentDate);
  const newTime = new Cesium.GregorianDate(
    julianDate.year,
    julianDate.month,
    julianDate.day,
    hours,
    minutes,
    0,
  );
  return Cesium.JulianDate.fromGregorianDate(newTime);
};

// Component: Options Form
interface OptionsFormProps {
  options: Sunlight.AnalyzeOptions;
  onSubmit: (options: Sunlight.AnalyzeOptions) => void;
}

function OptionsForm({ options, onSubmit }: OptionsFormProps) {
  const form = useForm<Sunlight.AnalyzeOptions>({
    defaultValues: options,
  });

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="analyze options">
        <AccordionTrigger>Analyze Options</AccordionTrigger>
        <AccordionContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit((data) => {
                toast.success(
                  `Options set as { errorBoundary: ${data.errorBoundary}, debugShowRays: ${data.debugShowRays}, debugShowPoints: ${data.debugShowPoints} }`,
                  { id: "set-analyze-option" },
                );
                onSubmit(data);
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
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// Component: Date Picker
interface DatePickerProps {
  date?: Date;
  timeZone?: string;
  onDateChange: (date?: Date) => void;
}

function DatePicker({ date, timeZone, onDateChange }: DatePickerProps) {
  const [open, setOpen] = React.useState(false);

  return (
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
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            captionLayout="dropdown"
            timeZone={timeZone}
            onSelect={(selectedDate) => {
              onDateChange(selectedDate);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}

// Component: Time Picker
interface TimePickerProps {
  time: string;
  onTimeChange: (time: string) => void;
}

function TimePicker({ time, onTimeChange }: TimePickerProps) {
  const timeDecimal = timeToDecimal(time);

  return (
    <div className="flex w-full flex-col gap-3">
      <Label htmlFor="time-picker" className="px-1">
        Time
      </Label>
      <div className="flex gap-2">
        <Input
          type="time"
          id="time-picker"
          step={1}
          value={time}
          onChange={(e) => onTimeChange(e.target.value)}
          className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
        />
        <Slider
          min={0}
          max={23.5}
          step={0.5}
          value={[timeDecimal]}
          onValueChange={([value]) => {
            if (value !== undefined) {
              onTimeChange(decimalToTime(value));
            }
          }}
        />
      </div>
    </div>
  );
}

// Main Component
export default function SunlightAnalysis() {
  const { viewer } = useViewer();

  // State
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState(DEFAULT_TIME);
  const [timeZone, setTimeZone] = React.useState<string>();
  const [position, setPosition] = React.useState<Cesium.Cartesian3>();
  const [isPicking, setIsPicking] = React.useState(false);
  const [options, setOptions] = React.useState<Sunlight.AnalyzeOptions>({
    errorBoundary: 10,
    debugShowRays: true,
    debugShowPoints: true,
  });

  // Refs
  const sunlightRef = React.useRef<Sunlight | null>(null);
  const indicatorRef = React.useRef<Cesium.Entity | null>(null);

  // Initialize timezone
  React.useEffect(() => {
    setTimeZone(Intl.DateTimeFormat().resolvedOptions().timeZone);
  }, []);

  // Tileset management
  const handleTileset = React.useEffectEvent(async (show: boolean) => {
    if (!viewer) return;
    try {
      const tileset =
        await Cesium.Cesium3DTileset.fromIonAssetId(NY_TILESET_ID);
      if (!viewer.scene.primitives.contains(tileset)) {
        viewer.scene.primitives.add(tileset);
      }
      tileset.show = show;
    } catch (e) {
      console.error(`Error creating tileset: ${e}`);
    }
  });

  // Initial viewer setup
  React.useEffect(() => {
    if (!viewer) return;

    sunlightRef.current = new Sunlight(viewer);

    viewer.scene.setTerrain(
      Cesium.Terrain.fromWorldTerrain({ requestVertexNormals: true }),
    );
    viewer.shadows = true;

    viewer.camera.setView({
      destination: Cesium.Cartesian3.fromDegrees(
        NY_COORDINATES.longitude,
        NY_COORDINATES.latitude,
        NY_COORDINATES.height,
      ),
      orientation: Cesium.HeadingPitchRoll.fromDegrees(
        NY_ORIENTATION.heading,
        NY_ORIENTATION.pitch,
        NY_ORIENTATION.roll,
      ),
      endTransform: Cesium.Matrix4.IDENTITY,
    });

    handleTileset(true);

    return () => {
      if (!viewer) return;
      handleTileset(false);
    };
  }, [viewer]);

  // Event handlers
  const onMouseMove =
    React.useEffectEvent<Cesium.ScreenSpaceEventHandler.MotionEventCallback>(
      (event) => {
        const pickedPosition = viewer?.scene.pickPosition(event.endPosition);
        if (pickedPosition && indicatorRef.current) {
          indicatorRef.current.position = new Cesium.ConstantPositionProperty(
            pickedPosition,
          );
          indicatorRef.current.show = true;
        }
      },
    );

  const onLeftClick =
    React.useEffectEvent<Cesium.ScreenSpaceEventHandler.PositionedEventCallback>(
      async (event) => {
        if (!viewer) return;

        const pickedPosition = viewer.scene.pickPosition(event.position);

        if (pickedPosition && sunlightRef.current) {
          setPosition(pickedPosition);
          try {
            sunlightRef.current.setTargetPoint(
              pickedPosition,
              true,
              options.errorBoundary,
            );
          } catch (error) {
            toast.error(
              `Analysis failed: ${error instanceof Error ? error.message : "Unknown error"}`,
            );
          }
        }
      },
    );

  // Picking mode
  React.useEffect(() => {
    if (!viewer || !isPicking) return;

    toast.info("Picking Enabled");

    indicatorRef.current = viewer.entities.add({
      position: new Cesium.Cartesian3(),
      point: {
        pixelSize: INDICATOR_SIZE,
        color: Cesium.Color.WHITE,
        heightReference: Cesium.HeightReference.NONE,
      },
      show: false,
    });

    viewer.screenSpaceEventHandler.setInputAction(
      onMouseMove,
      Cesium.ScreenSpaceEventType.MOUSE_MOVE,
    );
    viewer.screenSpaceEventHandler.setInputAction(
      onLeftClick,
      Cesium.ScreenSpaceEventType.LEFT_CLICK,
    );

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
  }, [viewer, isPicking]);

  // Update viewer clock time
  React.useEffect(() => {
    if (!viewer || !date || !time) return;
    viewer.clock.currentTime = parseTimeToJulianDate(date, time);
  }, [viewer, date, time]);

  // Analyze sunlight
  const analyze = async () => {
    if (!viewer || !sunlightRef.current || !position) return;
    const result = await sunlightRef.current.analyze(
      position,
      viewer.clock.currentTime,
      options,
    );
    toast.info(`Sunlight reached: ${result.result} at ${result.timestamp}`);
  };

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

      <OptionsForm options={options} onSubmit={setOptions} />

      <DatePicker date={date} timeZone={timeZone} onDateChange={setDate} />

      <TimePicker time={time} onTimeChange={setTime} />

      <Button
        disabled={!viewer || !sunlightRef.current || !position}
        onClick={analyze}
      >
        Analyze
      </Button>
    </div>
  );
}
