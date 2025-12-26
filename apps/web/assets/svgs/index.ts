import { createIcon } from "@/lib/utils";

import SvgBuildingLibrary from "./building-library.svg";
import SvgCityPlan from "./city-plan.svg";
import SvgInfoCircleOutlined from "./info-circle-outlined.svg";

export const InfoCircleOutlined = createIcon(
  "InfoCircleOutlined",
  SvgInfoCircleOutlined,
);

export const CityPlan = createIcon("CityPlan", SvgCityPlan);

export const BuildingLibrary = createIcon(
  "BuildingLibrary",
  SvgBuildingLibrary,
);
