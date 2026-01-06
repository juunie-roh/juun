"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter } from "@/i18n/navigation";
import { cn } from "@/lib/utils";

import { API_LABELS, getApiOptions } from "../../_data";

const API_OPTIONS = getApiOptions();

function ApiCommand({
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  const router = useRouter();

  return (
    <Command>
      <CommandInput placeholder="Search ..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {API_OPTIONS.map((option) => (
            <CommandItem
              key={option.api}
              value={option.api}
              className="hover:cursor-pointer"
              onSelect={(value) => {
                router.push(`/cesium-utils/${value}`);
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
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean>(false);

  // Get current API from URL
  const api = pathname.split("/").pop();
  const currentApiLabel =
    api && API_LABELS[api] ? API_LABELS[api] : "Select ...";

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className={cn("w-full justify-between p-4")}>
          {currentApiLabel}
          <ChevronDown />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-96 p-0" align="start">
        <ApiCommand open={open} setOpen={setOpen} />
      </PopoverContent>
    </Popover>
  );
}
