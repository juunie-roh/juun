"use client";

import { Button } from "@juun/ui/button";
import { Calendar } from "@juun/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@juun/ui/form";
import { Input } from "@juun/ui/input";
import { Label } from "@juun/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@juun/ui/popover";
import { toast } from "@juun/ui/sonner";
import { Switch } from "@juun/ui/switch";
import { Sunlight } from "@juun-roh/cesium-utils/experimental";
import { ChevronDown } from "lucide-react";
import React from "react";
import { useForm } from "react-hook-form";

import { useViewer } from "../../../_contexts";

export default function SunlightAnalysis() {
  const { viewer } = useViewer();
  const [date, setDate] = React.useState<Date>();
  const [open, setOpen] = React.useState<boolean>(false);
  const [options, setOptions] = React.useState<Sunlight.AnalyzeOptions>({
    errorBoundary: 10,
    debugShowRays: true,
    debugShowPoints: true,
  });

  const form = useForm<Sunlight.AnalyzeOptions>({
    defaultValues: options,
  });

  const sunlight = viewer ? new Sunlight(viewer) : undefined;

  return (
    <div className="flex size-full flex-col gap-4">
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
                mode="single"
                selected={date}
                captionLayout="dropdown"
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
            defaultValue={"10:30:00"}
            className="appearance-none bg-background [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
          />
        </div>
      </div>
    </div>
  );
}
