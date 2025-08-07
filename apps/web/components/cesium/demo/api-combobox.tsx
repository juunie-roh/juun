"use client";

import { Button } from "@juun/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@juun/ui/command";
import { cn } from "@juun/ui/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@juun/ui/popover";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import useCesiumUtilsApiStore from "@/stores/slices/cesium-utils-api";

import type { Option } from "./api";

function StatusList({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { setOption } = useCesiumUtilsApiStore();
  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const { Cartesian3, Math: CesiumMath } = await import("cesium");
        setOptions([
          {
            api: "collection",
            label: "Collection",
            flyTo: {
              destination: new Cartesian3(
                -3964624.632297504,
                3356819.574895879,
                3696707.310427818,
              ),
              orientation: {
                heading: CesiumMath.toRadians(0),
                pitch: CesiumMath.toRadians(-50),
                roll: 0.0,
              },
            },
          },
          {
            api: "terrain",
            label: "Terrain",
            flyTo: {
              destination: new Cartesian3(
                -3046596.558550092,
                4065701.630895504,
                3854536.407434127,
              ),
              orientation: {
                heading: CesiumMath.toRadians(0),
                pitch: CesiumMath.toRadians(-45),
                roll: 0.0,
              },
            },
          },
          {
            api: "viewer",
            label: "Viewer",
          },
          {
            api: "highlight",
            label: "Highlight",
          },
        ]);
      } catch (error) {
        console.error("Failed to load APIs:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [open]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-muted-foreground text-sm">Loading APIs ...</div>
      </div>
    );
  }

  return (
    <Command>
      <CommandInput placeholder="Search ..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.api}
              value={option.api}
              className="hover:cursor-pointer"
              onSelect={(value) => {
                setOption(options.find((opt) => opt.api === value));
                setOpen(false);
              }}
            >
              {option.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}

export default function ApiCombobox() {
  const { option } = useCesiumUtilsApiStore();
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-between p-4")}>
          {option ? option.label : "Select ..."}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="start">
        <StatusList open={open} setOpen={setOpen} />
      </PopoverContent>
    </Popover>
  );
}
