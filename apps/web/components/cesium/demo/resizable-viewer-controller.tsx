'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@pkg/ui';
import { useMediaQuery } from '@pkg/ui/hooks';
import { useState } from 'react';

import Viewer from '@/components/cesium/viewer';

import ApiCombobox, { Status } from './api-combobox';

export default function ResizableViewerController() {
  const [status, setStatus] = useState<Status | undefined>(undefined);
  // State to track viewport size
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

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
          <ApiCombobox status={status} setStatus={setStatus} />
          {renderDemo()}
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
