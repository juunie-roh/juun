import { create } from "zustand";

import { ApiOption, Feature } from "@/components/cesium/types";
import { logger } from "@/stores/middleware/logger";

interface CesiumUtilsApiState {
  apiOption?: ApiOption;
  setApiOption: (apiOption?: ApiOption) => void;
  removeApiOption: () => void;

  feature?: Feature;
  setFeature: (feature?: Feature) => void;
  removeFeature: () => void;

  clear: () => void;
}

const useCesiumUtilsApiStore = create<CesiumUtilsApiState>()(
  logger(
    (set, _get) => ({
      apiOption: undefined,
      setApiOption: (apiOption) => set({ apiOption }),
      removeApiOption: () => set({ apiOption: undefined }),

      feature: undefined,
      setFeature: (feature) => set({ feature }),
      removeFeature: () => set({ feature: undefined }),

      clear: () => set({ apiOption: undefined, feature: undefined }),
    }),
    "cesium-utils-api-store",
  ),
);

export default useCesiumUtilsApiStore;
