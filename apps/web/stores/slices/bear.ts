import { create } from 'zustand';

import { logger } from '@/stores/middleware/logger';

interface BearState {
  bears: number;
  increase: (by: number) => void;
  decrease: (by: number) => void;
}

export const useBearStore = create<BearState>()(
  logger(
    (set) => ({
      bears: 0,
      increase: (by) => set((state) => ({ bears: state.bears + by })),
      decrease: (by) => set((state) => ({ bears: state.bears - by })),
    }),
    'bear-store',
  ),
);
