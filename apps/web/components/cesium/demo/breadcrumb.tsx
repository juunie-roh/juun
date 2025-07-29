// components/cesium/demo/breadcrumb.tsx
"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@juun/ui/breadcrumb";
import { cn } from "@juun/ui/lib/utils";
import { Fragment } from "react";

import useCesiumUtilsApiStore from "@/stores/slices/cesium-utils-api";

interface CesiumUtilsBreadcrumbProps {
  className?: string;
}

export default function CesiumUtilsBreadcrumb({
  className,
}: CesiumUtilsBreadcrumbProps) {
  const { option, feature, clear } = useCesiumUtilsApiStore();

  const segments = [];

  // Build segments in reverse order (most specific first)

  // Add feature segment if selected (most specific)
  if (feature) {
    segments.push({
      type: "feature" as const,
      label: feature.label,
      isLast: true,
    });
  }

  // Add API segment if selected
  if (option) {
    segments.push({
      type: "api" as const,
      label: option.label,
      isLast: !feature,
    });
  }

  // Always show the root (least specific)
  segments.push({
    type: "root" as const,
    label: "Cesium Utils",
    isLast: !option && !feature,
  });

  return (
    <Breadcrumb className={cn("select-none", className)}>
      <BreadcrumbList>
        {segments.map((segment, index) => {
          const isLast = segment.isLast;
          const showSeparator = index < segments.length - 1;

          return (
            <Fragment key={`${segment.type}-${index}`}>
              <BreadcrumbItem>
                {isLast ? (
                  <BreadcrumbPage className="flex items-center gap-2">
                    <span>{segment.label}</span>
                  </BreadcrumbPage>
                ) : segment.type === "root" ? (
                  <BreadcrumbLink
                    className="flex cursor-pointer items-center gap-2 hover:underline"
                    onClick={clear}
                  >
                    <span>{segment.label}</span>
                  </BreadcrumbLink>
                ) : (
                  <span className="flex items-center gap-2">
                    <span>{segment.label}</span>
                  </span>
                )}
              </BreadcrumbItem>
              {showSeparator && <BreadcrumbSeparator className="rotate-180" />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}
