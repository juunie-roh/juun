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

import { useCesiumUtils } from "../../_contexts/cesium-utils";
import { getFeatures, isValidApi } from "../../_data";

export default function ApiFeatureList() {
  const { feature, setFeature } = useCesiumUtils();
  const pathname = usePathname();

  // Get current API from URL
  const api = pathname.split("/").pop();

  const features = useMemo(() => {
    if (api && isValidApi(api)) {
      return getFeatures(api);
    }
    return undefined;
  }, [api]);

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
