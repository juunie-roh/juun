import { Separator } from "@juun/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@juun/ui/sidebar";
import { Metadata } from "next";

import CesiumUtilsBreadcrumb from "@/components/cesium/demo/breadcrumb";
import CesiumUtilsSidebar from "@/components/cesium/demo/sidebar";

export const metadata: Metadata = {
  title: "Cesium Utils",
  description:
    "A utility library for CesiumJS that simplifies working with Cesium instances.",
  keywords: ["Cesium", "CesiumJS", "npm", "library", "utility", "GIS", "3D"],
  openGraph: {
    type: "website",
    title: "Cesium Utils",
    description:
      "A utility library for CesiumJS that simplifies working with Cesium instances.",
    images: "https://cesium.com/logo-kit/cesium/Cesium_dark_color.svg",
    siteName: "Cesium Utils Demonstration",
    url: "https://juun.vercel.app/cesium-utils",
  },
};

export default function CesiumUtilsDemoLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <SidebarProvider className="h-[calc(100vh-var(--header-height))] min-h-0">
      <SidebarInset className="flex min-w-0 flex-col overflow-hidden">
        <header className="bg-background flex h-14 shrink-0 items-center gap-2 border-b">
          <div className="flex h-full flex-1 items-center justify-end gap-2 p-4">
            <CesiumUtilsBreadcrumb />
            <Separator orientation="vertical" />
            <SidebarTrigger />
          </div>
        </header>
        <div className="min-h-0 flex-1 p-4">{children}</div>
      </SidebarInset>
      <CesiumUtilsSidebar />
    </SidebarProvider>
  );
}
