import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@pkg/ui/accordion";
import { Skeleton } from "@pkg/ui/skeleton";
import { Suspense } from "react";

import { Feature } from "../types";

export interface FeatureAccordionProps {
  features: Feature[];
  defaultValue?: string;
}

export default function FeatureAccordion({
  features,
  defaultValue = "description",
}: FeatureAccordionProps) {
  const defaultItem = features.find((feat) => feat.value === defaultValue);
  if (!defaultItem) {
    throw new Error(
      `The feature list must include item having 'value' as ${defaultValue}`,
    );
  }

  const rest = features.filter((feat) => feat !== defaultItem);

  return (
    <Accordion
      type="single"
      collapsible
      className="size-full"
      defaultValue={defaultValue}
    >
      {/* List the default item first */}
      <AccordionItem value={defaultItem.value}>
        <AccordionTrigger>{defaultItem.label}</AccordionTrigger>
        <AccordionContent>
          <Suspense fallback={<Skeleton className="h-10 w-full" />}>
            {defaultItem.node}
          </Suspense>
        </AccordionContent>
      </AccordionItem>
      {rest.map((feat) => (
        <AccordionItem key={feat.value} value={feat.value}>
          <AccordionTrigger>{feat.label}</AccordionTrigger>
          <AccordionContent>
            <Suspense fallback={<Skeleton className="h-10 w-full" />}>
              {feat.node}
            </Suspense>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
