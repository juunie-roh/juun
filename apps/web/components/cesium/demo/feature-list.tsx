"use client";

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@pkg/ui/sidebar";
import { useEffect, useMemo } from "react";

import useCesiumUtilsApiStore from "@/stores/slices/cesium-utils-api";

import { getApiFeatures } from "./api/utils";

export default function FeatureList() {
  const { option, feature, setFeature, clear } = useCesiumUtilsApiStore();

  const features = useMemo(
    () => (option ? getApiFeatures(option.api) : undefined),
    [option],
  );

  // Set initial active item as description (first item of features)
  useEffect(() => {
    if (!features) return;
    setFeature(features[0]);

    return () => clear();
  }, [features, setFeature, clear]);

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
