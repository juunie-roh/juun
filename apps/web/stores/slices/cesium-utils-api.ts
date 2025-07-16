import { create } from "zustand";

import { ApiOption, Feature } from "@/components/cesium/types";
import { logger } from "@/stores/middleware/logger";

interface CesiumUtilsApiState {
  option?: ApiOption;
  setOption: (apiOption?: ApiOption) => void;
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
