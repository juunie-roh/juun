import { create } from "zustand";

import type { Feature } from "@/components/cesium/demo/api";
import { logger } from "@/stores/middleware/logger";

interface CesiumUtilsFeatureState {
  feature?: Feature;
  setFeature: (feature?: Feature) => void;
  removeFeature: () => void;
}

const useCesiumUtilsFeatureStore = create<CesiumUtilsFeatureState>()(
  logger(
    (set, _get) => ({
      feature: undefined,
      setFeature: (feature) => set({ feature }),
      removeFeature: () => set({ feature: undefined }),
    }),
    "cesium-utils-feature-store",
  ),
);

export default useCesiumUtilsFeatureStore;
