import { create } from "zustand";

import { logger } from "../middleware/logger";

interface TimelineDialogState {
  isOpen: boolean;
  open: () => void;
  close: () => void;
}

export const useTimelineDialog = create<TimelineDialogState>()(
  logger(
    (set) => ({
      isOpen: false,
      open: () => set({ isOpen: true }),
      close: () => set({ isOpen: false }),
    }),
    "timeline-dialog",
  ),
);
