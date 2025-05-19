import {
  Button,
  cn,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@pkg/ui';
import { useMediaQuery } from '@pkg/ui/hooks';
import { ChevronDown } from 'lucide-react';
import { useState } from 'react';

import { API_FEATURE_OPTIONS } from '@/constants/cesium.constants';
import { ApiFeatureOption } from '@/types/cesium.types';

function StatusList({
  setOpen,
  setOption,
}: {
  setOpen: (open: boolean) => void;
  setOption: (option: ApiFeatureOption | undefined) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Select API ..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {API_FEATURE_OPTIONS.map((option) => (
            <CommandItem
              key={option.feat}
              value={option.feat}
              className="hover:cursor-pointer"
              onSelect={(value) => {
                setOption(
                  API_FEATURE_OPTIONS.find((opt) => opt.feat === value),
                );
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
  option: ApiFeatureOption | undefined;
  setOption: (status: ApiFeatureOption | undefined) => void;
  /** The trigger button class */
  className?: string;
}
export default function ApiCombobox({
  option,
  setOption,
  className,
}: ApiComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  if (isLargeScreen) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            className={cn('w-full justify-between px-4', className)}
          >
            {option ? option.label : 'Select API'}
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-96" align="start">
          <StatusList setOpen={setOpen} setOption={setOption} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          variant="outline"
          className={cn('w-full justify-between px-4', className)}
        >
          {option ? option.label : 'Select API'}
          <ChevronDown />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-1/2">
        <div className="p-2">
          <DrawerTitle className="sr-only">Cesium Utils API</DrawerTitle>
          <StatusList setOpen={setOpen} setOption={setOption} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
