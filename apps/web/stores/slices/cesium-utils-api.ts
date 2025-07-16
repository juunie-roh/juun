import { create } from "zustand";
import { devtools } from "zustand/middleware";

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
  devtools(
    logger(
      (set, _get) => ({
        apiOption: undefined,
        setApiOption: (apiOption) =>
          set({ apiOption }, false, { type: "cesium-utils-api-option/set" }),
        removeApiOption: () =>
          set({ apiOption: undefined }, false, {
            type: "cesium-utils-api-option/remove",
          }),

        feature: undefined,
        setFeature: (feature) =>
          set({ feature }, false, "cesium-utils-api-feature/set"),
        removeFeature: () =>
          set({ feature: undefined }, false, "cesium-utils-api-feature/remove"),

        clear: () =>
          set(
            { apiOption: undefined, feature: undefined },
            false,
            "cesium-utils-api/clear",
          ),
      }),
      "cesium-utils-api-store",
    ),
    { name: "Cesium Utils API Store" },
  ),
);

export default useCesiumUtilsApiStore;
