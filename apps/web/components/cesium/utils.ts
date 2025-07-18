import { ApiOption } from "@/components/cesium/types";

export const loadApiOptions = async (): Promise<ApiOption[]> => {
  const { Cartesian3, Math: CesiumMath } = await import("cesium");
  return [
    {
      api: "collection",
      label: "Collection",
      flyTo: {
        destination: new Cartesian3(
          -3964624.632297504,
          3356819.574895879,
          3696707.310427818,
        ),
        orientation: {
          heading: CesiumMath.toRadians(0),
          pitch: CesiumMath.toRadians(-50),
          roll: 0.0,
        },
      },
    },
    {
      api: "terrain",
      label: "Terrain",
      flyTo: {
        destination: new Cartesian3(
          -3046596.558550092,
          4065701.630895504,
          3854536.407434127,
        ),
        orientation: {
          heading: CesiumMath.toRadians(0),
          pitch: CesiumMath.toRadians(-45),
          roll: 0.0,
        },
      },
    },
    {
      api: "viewer",
      label: "Viewer",
    },
    {
      api: "highlight",
      label: "Highlight",
    },
  ];
};
