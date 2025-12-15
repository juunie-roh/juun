import { Metadata } from "next";

import BaseInnerLayout from "@/layouts/base-inner";
import FullScreenLayout from "@/layouts/full-screen";
import PaddingTopHeaderLayout from "@/layouts/padding-top-header";

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
    <PaddingTopHeaderLayout>
      <FullScreenLayout fix-height>
        <BaseInnerLayout>{children}</BaseInnerLayout>
      </FullScreenLayout>
    </PaddingTopHeaderLayout>
  );
}
