"use client";

import { Button } from "@pkg/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@pkg/ui/command";
import { cn } from "@pkg/ui/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@pkg/ui/popover";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import type { ApiOption } from "@/components/cesium/types";
import useCesiumUtilsApiStore from "@/stores/slices/cesium-utils-api";

function StatusList({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const { setOption } = useCesiumUtilsApiStore();
  const [options, setOptions] = useState<ApiOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const { loadApiOptions } = await import("@/components/cesium/utils");
        setOptions(await loadApiOptions());
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
