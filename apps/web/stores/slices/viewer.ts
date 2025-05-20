import type { Viewer } from 'cesium';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { logger } from '@/stores/middleware/logger';

interface ViewerState {
  viewer: Viewer | undefined;
  setViewer: (viewer: Viewer, name?: string) => void;
  removeViewer: () => void;
  isFlying: boolean | undefined;
  setIsFlying: (isFlying: boolean) => void;
}

// Create the store with middleware chain
const useViewerStore = create<ViewerState>()(
  devtools(
    logger(
      (set, _get) => ({
        viewer: undefined,
        setViewer: (viewer) => set({ viewer }, false, { type: 'viewer/set' }),
        removeViewer: () =>
          set({ viewer: undefined }, false, { type: 'viewer/remove' }),
        isFlying: undefined,
        setIsFlying: (isFlying) =>
          set({ isFlying }, false, { type: 'viewer/isFlying' }),
      }),
      'viewer-store',
    ),
    { name: 'Cesium Viewer Store' },
  ),
);

export default useViewerStore;
