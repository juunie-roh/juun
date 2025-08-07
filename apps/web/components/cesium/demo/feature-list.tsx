"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@juun/ui/sidebar";
import { useEffect, useMemo } from "react";

import useCesiumUtilsApiStore from "@/stores/slices/cesium-utils-api";

import { getFeatures } from "./api";

export default function FeatureList() {
  const { option, feature, setFeature } = useCesiumUtilsApiStore();

  const features = useMemo(
    () => (option ? getFeatures(option.api) : undefined),
    [option],
  );

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
