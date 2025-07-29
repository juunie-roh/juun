"use client";

import { Wheel, WheelContent } from "@juun/ui/wheel";
import { Check, X } from "lucide-react";

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
