import { Metadata } from "next";

import BaseInnerLayout from "@/layouts/base-inner";
import FullScreenLayout from "@/layouts/full-screen";
import HeaderOffsetLayout from "@/layouts/header-offset";

export const metadata: Metadata = {
  title: "Three Cannon Raycast Vehicle Example",
  description: "Three js Vehicle Demonstration with Cannon physics applied",
  keywords: ["Next.js", "Three.js", "3D", "Cannon"],
  openGraph: {
    type: "website",
    title: "Three Cannon Raycast Vehicle Example",
    description: "Three js Vehicle Demonstration with Cannon physics applied",
    images: "/images/cannon-raycast-vehicle.png",
    siteName: "Three Cannon Raycast Vehicle Example",
    url: "https://juun.vercel.app/playground/cannon-raycast-vehicle",
  },
};

export default function CannonRaycastVehicleLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HeaderOffsetLayout>
      <FullScreenLayout fixHeight>
        <BaseInnerLayout>{children}</BaseInnerLayout>
      </FullScreenLayout>
    </HeaderOffsetLayout>
  );
}
