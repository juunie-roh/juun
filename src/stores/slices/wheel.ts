import { create } from 'zustand';

import { logger } from '@/stores/middleware/logger';

export type WheelType = 'four' | 'five' | 'confirm';

interface WheelState {
  type: WheelType;
  active: boolean;
  isShowing: boolean;
  x: number;
  y: number;
  selected: number | null;

  changeTo: (type: WheelType) => void;
  activate: (active: boolean) => void;
  show: (isShowing: boolean) => void;
  position: ({ x, y }: { x: number; y: number }) => void;
  select: (menu: number | null) => void;
}

export const useWheelStore = create<WheelState>()(
  logger(
    (set) => ({
      type: 'confirm',
      active: false,
      isShowing: false,
      x: 0,
      y: 0,
      selected: null,

      changeTo: (type) => set(() => ({ type })),
      activate: (active) => set(() => ({ active })),
      show: (isShowing) => set(() => ({ isShowing })),
      position: ({ x, y }) => set(() => ({ x, y })),
      select: (menu) => set(() => ({ selected: menu })),
    }),
    'wheel-store',
  ),
);
