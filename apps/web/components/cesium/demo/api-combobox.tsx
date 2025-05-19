import {
  Button,
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

type ApiFeature = 'collection' | 'terrain' | 'viewer' | 'highlight';
export type Status = { value: ApiFeature; label: string };

const statuses: Status[] = [
  {
    value: 'collection',
    label: 'Collection',
  },
  {
    value: 'terrain',
    label: 'Hybrid Terrain Provider',
  },
  {
    value: 'viewer',
    label: 'Viewer',
  },
  {
    value: 'highlight',
    label: 'Highlight',
  },
];

function StatusList({
  setOpen,
  setStatus,
}: {
  setOpen: (open: boolean) => void;
  setStatus: (status: Status | undefined) => void;
}) {
  return (
    <Command>
      <CommandInput placeholder="Select API ..." />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              className="hover:cursor-pointer"
              onSelect={(value) => {
                setStatus(
                  statuses.find((priority) => priority.value === value),
                );
                setOpen(false);
              }}
            >
              {status.label}
            </CommandItem>
          ))}
        </CommandGroup>
      </CommandList>
    </Command>
  );
}
interface ApiComboboxProps {
  status: Status | undefined;
  setStatus: (status: Status | undefined) => void;
}
export default function ApiCombobox({ status, setStatus }: ApiComboboxProps) {
  const [open, setOpen] = useState<boolean>(false);
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  if (isLargeScreen) {
    return (
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button variant="outline" className="w-full justify-between px-4">
            {status ? status.label : 'Select API'}
            <ChevronDown />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px]" align="start">
          <StatusList setOpen={setOpen} setStatus={setStatus} />
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full justify-between px-4">
          {status ? status.label : 'Select API'}
          <ChevronDown />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="h-1/2">
        <div className="p-2">
          <DrawerTitle className="sr-only">Cesium Utils API</DrawerTitle>
          <StatusList setOpen={setOpen} setStatus={setStatus} />
        </div>
      </DrawerContent>
    </Drawer>
  );
}
