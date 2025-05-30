'use client';

import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@pkg/ui';
import { useMediaQuery } from '@pkg/ui/hooks';
import { useState } from 'react';

import Viewer from '@/components/cesium/viewer';
import { ApiFeatureOption } from '@/types/cesium.types';

import ApiCombobox from './api-combobox';
import { FeatureDemo } from './feature';

export default function ResizableViewerController() {
  const [option, setOption] = useState<ApiFeatureOption | undefined>(undefined);
  // State to track viewport size
  const isLargeScreen = useMediaQuery('(min-width: 1024px)');

  return (
    <ResizablePanelGroup
      direction={isLargeScreen ? 'horizontal' : 'vertical'}
      className="size-full overflow-hidden rounded-lg border"
    >
      <ResizablePanel defaultSize={70} minSize={40}>
        <div className="size-full">
          <Viewer
            key={option?.feat || 'default'} // refresh the viewer
            bottomContainer={false}
            animation={false}
            timeline={false}
            flyTo={option?.flyTo} // extendable viewer option
          />
        </div>
      </ResizablePanel>

      <ResizableHandle withHandle />

      <ResizablePanel defaultSize={30} minSize={20}>
        <div className="relative flex size-full flex-col gap-2 p-2">
          <ApiCombobox option={option} setOption={setOption} />
          <FeatureDemo feat={option?.feat} />
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
