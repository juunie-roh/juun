"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@juun/ui/sidebar";
import { usePathname } from "next/navigation";
import { useEffect, useMemo } from "react";

import useCesiumUtilsFeatureStore from "@/stores/slices/cesium-utils-feature";

import { getFeatures } from "./api";

export default function FeatureList() {
  const { feature, setFeature } = useCesiumUtilsFeatureStore();
  const pathname = usePathname();

  // Get current API from URL
  const currentApi = pathname.split("/").pop();

  const features = useMemo(() => {
    if (
      currentApi &&
      ["terrain", "collection", "highlight", "viewer", "sunlight"].includes(
        currentApi,
      )
    ) {
      return getFeatures(
        currentApi as
          | "terrain"
          | "collection"
          | "highlight"
          | "viewer"
          | "sunlight",
      );
    }
    return undefined;
  }, [currentApi]);

  // Set initial active item as description (first item of features)
  useEffect(() => {
    if (!features) return;
    setFeature(features[0]);
  }, [features, setFeature]);

  if (!features) return null;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Features</SidebarGroupLabel>
      <SidebarGroupContent>
        <SidebarMenu>
          {features.map((feat) => (
            <SidebarMenuItem key={feat.value}>
              <SidebarMenuButton
                onClick={() => setFeature(feat)}
                tooltip={feat.label}
                isActive={feature === feat}
              >
                {feat.label}
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
}
