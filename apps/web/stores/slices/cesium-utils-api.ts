import { create } from "zustand";

import type { Feature, Option } from "@/components/cesium/demo/api";
import { logger } from "@/stores/middleware/logger";

interface CesiumUtilsApiState {
  option?: Option;
  setOption: (apiOption?: Option) => void;
  removeOption: () => void;

  feature?: Feature;
  setFeature: (feature?: Feature) => void;
  removeFeature: () => void;

  clear: () => void;
}

const useCesiumUtilsApiStore = create<CesiumUtilsApiState>()(
  logger(
    (set, _get) => ({
      option: undefined,
      setOption: (apiOption) => set({ option: apiOption }),
      removeOption: () => set({ option: undefined }),

      feature: undefined,
      setFeature: (feature) => set({ feature }),
      removeFeature: () => set({ feature: undefined }),

      clear: () => set({ option: undefined, feature: undefined }),
    }),
    "cesium-utils-api-store",
  ),
);

export default useCesiumUtilsApiStore;
