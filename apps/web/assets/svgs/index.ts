import { createIcon } from "@juun/ui/lib/utils";

import SvgBuildingLibrary from "./building-library.svg";
import SvgCityPlan from "./city-plan.svg";
import SvgInfoCircleOutlined from "./info-circle-outlined.svg";

export const InfoCircleOutlined: ReturnType<typeof createIcon> = createIcon(
  "InfoCircleOutlined",
  SvgInfoCircleOutlined,
);

export const CityPlan: ReturnType<typeof createIcon> = createIcon(
  "CityPlan",
  SvgCityPlan,
);

export const BuildingLibrary: ReturnType<typeof createIcon> = createIcon(
  "BuildingLibrary",
  SvgBuildingLibrary,
);
