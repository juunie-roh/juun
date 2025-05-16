'use client';

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
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from '@pkg/ui';
import { ChevronDown } from 'lucide-react';
import { useEffect, useState } from 'react';

import Viewer from '@/components/cesium/viewer';

type ApiFeature = 'collection' | 'terrain' | 'viewer' | 'highlight';
type Status = { value: ApiFeature; label: string };

const statuses: Status[] = [
  {
    value: 'collection',
    label: 'Collection',
  },
  {
    value: 'terrain',
    label: 'Terrain',
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
  setStatus: (status: Status | null) => void;
}) {
  return (
    <Command>
      <CommandInput
        placeholder="Search API ..."
        className="text-xl md:text-sm"
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {statuses.map((status) => (
            <CommandItem
              key={status.value}
              value={status.value}
              className="text-lg hover:cursor-pointer md:text-sm"
              onSelect={(value) => {
                setStatus(
                  statuses.find((priority) => priority.value === value) || null,
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

export default function ResizableViewerController() {
  // State for combobox
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState<Status | null>(null);
  // State to track viewport size
  const [isLargeScreen, setIsLargeScreen] = useState(false);

  // Effect to update layout direction based on window size
  useEffect(() => {
    // Check initial screen size
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 1024); // 1024px is the lg breakpoint
    };

    // Set initial value
    checkScreenSize();

    // Add resize listener
    window.addEventListener('resize', checkScreenSize);

    // Clean up
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const renderDemo = () => {
    switch (status?.value) {
      case 'collection':
        return (
          <div className="flex size-full items-center justify-center p-4 text-muted-foreground">
            Collection Demo
          </div>
        );
      case 'terrain':
        return (
          <div className="flex size-full items-center justify-center p-4 text-muted-foreground">
            Terrain Demo
          </div>
        );
      case 'viewer':
        return (
          <div className="flex size-full items-center justify-center p-4 text-muted-foreground">
            Viewer Demo
          </div>
        );
      case 'highlight':
        return (
          <div className="flex size-full items-center justify-center p-4 text-muted-foreground">
            Highlight Demo
          </div>
        );
      default:
        return (
          <div className="flex size-full items-center justify-center p-4 text-muted-foreground">
            Select an API feature to demonstrate
          </div>
        );
    }
  };

  return (
    <ResizablePanelGroup
      direction={isLargeScreen ? 'horizontal' : 'vertical'}
      className="size-full overflow-hidden rounded-lg border"
    >
      <ResizablePanel defaultSize={70} minSize={40}>
        <div className="size-full">
          <Viewer bottomContainer={false} animation={false} timeline={false} />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="relative flex size-full flex-col gap-2 p-2">
          {isLargeScreen ? (
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between px-4"
                >
                  {status ? status.label : 'Select API'}
                  <ChevronDown />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px]" align="start">
                <StatusList setOpen={setOpen} setStatus={setStatus} />
              </PopoverContent>
            </Popover>
          ) : (
            <Drawer open={open} onOpenChange={setOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full justify-between px-4"
                >
                  {status ? status.label : 'Select API'}
                  <ChevronDown />
                </Button>
              </DrawerTrigger>
              <DrawerContent className="h-3/5">
                <div className="p-2">
                  <DrawerTitle className="sr-only">Cesium Utils</DrawerTitle>
                  <StatusList setOpen={setOpen} setStatus={setStatus} />
                </div>
              </DrawerContent>
            </Drawer>
          )}
          {renderDemo()}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
