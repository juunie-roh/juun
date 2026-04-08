"use client";

import dynamic from "next/dynamic";
import type { ComponentProps } from "react";

const LazyCannonVehicle = dynamic(
  () => import("./cannon-vehicle").then((m) => m.default),
  { ssr: false },
);

export default function CannonVehicle({
  ...props
}: ComponentProps<typeof LazyCannonVehicle>) {
  return <LazyCannonVehicle {...props} />;
}
