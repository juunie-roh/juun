"use client";

import { Check, X } from "lucide-react";

import { Wheel, WheelContent } from "@/components/ui/wheel";

function ConfirmWheel() {
  return (
    <Wheel variant="destructive">
      <WheelContent title="Confirm">
        <Check />
      </WheelContent>
      <WheelContent title="Cancel">
        <X />
      </WheelContent>
    </Wheel>
  );
}

export default ConfirmWheel;
