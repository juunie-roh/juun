import { Feature } from "@/components/cesium/types";

import FeatureAccordion from "../../feature-accordion";
import CollectionDescription from "./description";

const features: Feature[] = [
  {
    value: "description",
    label: "Description",
    node: <CollectionDescription />,
  },
];

export default function CollectionDemo() {
  return <FeatureAccordion features={features} />;
}
