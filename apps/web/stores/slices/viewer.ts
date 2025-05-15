import type { Viewer } from 'cesium';
import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { logger } from '@/stores/middleware/logger';

// Custom wrapper for serializable logging
interface ViewerWrapper {
  id: string;
  name: string;
  containerId: string; // Use ID instead of Element for serialization
}

interface ViewerState {
  // Keep the map for internal use (not serialized for devtools)
  _map: Map<Element, Viewer>;
  // Add a serializable array for logging and visualization
  viewers: ViewerWrapper[];
  setViewer: (viewer: Viewer, name?: string) => void;
  removeViewer: (viewer: Viewer) => boolean;
  removeAll: () => void;
}

// Generate a unique ID for logging purposes
let nextId = 1;
const getNextId = () => `viewer-${nextId++}`;

// Create the store with middleware chain
const useViewerStore = create<ViewerState>()(
  devtools(
    logger(
      (set, get) => ({
        _map: new Map(),
        viewers: [],
        setViewer: (viewer, name = `Viewer ${nextId}`) => {
          const { _map, viewers } = get();
          const container = viewer.container;

          // Generate a single ID for this viewer
          const viewerId = getNextId();

          // Ensure the container has an ID
          if (!container.id) {
            container.id = `cesium-container-${viewerId.split('-')[1]}`; // Reuse the number part
          }
          const containerId = container.id;

          // Update the internal map
          _map.set(container, viewer);

          // Create viewer metadata for the state
          const viewerData: ViewerWrapper = {
            id: viewerId,
            name,
            containerId,
          };

          // Update the viewers array
          const existingIndex = viewers.findIndex(
            (v) => v.containerId === containerId,
          );

          if (existingIndex >= 0) {
            // Replace existing entry
            const newViewers = [...viewers];
            newViewers[existingIndex] = viewerData;
            set({ viewers: newViewers }, false, {
              type: 'viewers/update',
              name,
            });
          } else {
            // Add new entry
            set({ viewers: [...viewers, viewerData] }, false, {
              type: 'viewers/add',
              name,
            });
          }
        },
        removeViewer: (viewer) => {
          const { _map, viewers } = get();
          const container = viewer.container;
          const containerId = container.id;

          // Update the serializable array
          set(
            {
              viewers: viewers.filter((v) => v.containerId !== containerId),
            },
            false,
            { type: 'viewers/remove', containerId },
          );

          // Update the map
          return _map.delete(container);
        },
        removeAll: () => {
          set(
            {
              _map: new Map(),
              viewers: [],
            },
            false,
            { type: 'viewers/removeAll' },
          );
          nextId = 1;
        },
      }),
      'viewer-store',
    ),
    {
      name: 'Cesium Viewers Store',
      // We need to customize the serialization to avoid circular references
      serialize: {
        options: {
          // Do not attempt to serialize the _map - it contains circular refs
          replacer: (key: string, value: Map<Element, Viewer>) => {
            if (key === '_map') {
              return `Map(${value ? value.size : 0})`;
            }
            return value;
          },
        },
      },
    },
  ),
);

export default useViewerStore;
