import { Button } from "@pkg/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@pkg/ui/command";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@pkg/ui/drawer";
import { useMediaQuery } from "@pkg/ui/hooks/use-media-query";
import { cn } from "@pkg/ui/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@pkg/ui/popover";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

import type { ApiOption } from "@/components/cesium/types";

function StatusList({
  open,
  setOpen,
  setOption,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  setOption: (option: ApiOption | undefined) => void;
}) {
  const [options, setOptions] = useState<ApiOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOptions = async () => {
      try {
        const { loadApiOptions } = await import("@/components/cesium/utils");
        setOptions(await loadApiOptions());
      } catch (error) {
        console.error("Failed to load API options:", error);
      } finally {
        setLoading(false);
      }
    };

    loadOptions();
  }, [open]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <div className="text-muted-foreground text-sm">Loading options...</div>
      </div>
    );
  }

  return (
    <Command>
      <CommandInput placeholder="Search API ..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {options.map((option) => (
            <CommandItem
              key={option.feat}
              value={option.feat}
              className="hover:cursor-pointer"
              onSelect={(value) => {
                setOption(options.find((opt) => opt.feat === value));
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
interface ApiComboboxProps {
  option: ApiOption | undefined;
  setOption: (status: ApiOption | undefined) => void;
  /** The trigger button class */
  className?: string;
}
export default function ApiCombobox({
  option,
  setOption,
  className,
}: ApiComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const isLargeScreen = useMediaQuery("min-width: 1024px");

  if (isLargeScreen) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn("w-full justify-between p-4", className)}
          >
            {option ? option.label : "Select API"}
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96 p-0" align="start">
          <StatusList open={open} setOpen={setOpen} setOption={setOption} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn("w-full justify-between px-4", className)}
        >
          {option ? option.label : "Select API"}
          <ChevronDown />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-1/2">
        <div className="p-2">
          <DrawerTitle className="sr-only">Cesium Utils API</DrawerTitle>
          <StatusList open={open} setOpen={setOpen} setOption={setOption} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
