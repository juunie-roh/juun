import { ApiOption } from "@/components/cesium/types";

export const loadApiOptions = async (): Promise<ApiOption[]> => {
  const Cesium = await import("cesium");
  return [
    {
      feat: "collection",
      label: "Collection",
      flyTo: {
        destination: new Cesium.Cartesian3(
          -3964624.632297504,
          3356819.574895879,
          3696707.310427818,
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-50),
          roll: 0.0,
        },
      },
    },
    {
      feat: "terrain",
      label: "Terrain",
      flyTo: {
        destination: new Cesium.Cartesian3(
          -3046596.558550092,
          4065701.630895504,
          3854536.407434127,
        ),
        orientation: {
          heading: Cesium.Math.toRadians(0),
          pitch: Cesium.Math.toRadians(-45),
          roll: 0.0,
        },
      },
    },
    {
      feat: "viewer",
      label: "Viewer",
    },
    {
      feat: "highlight",
      label: "Highlight",
    },
  ];
};
