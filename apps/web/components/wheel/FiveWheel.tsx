"use client";

import { Wheel, WheelContent } from "@juun/ui/wheel";
import { Copy, Delete, Info, Move, RotateCw } from "lucide-react";

function FiveWheel() {
  return (
    <Wheel variant="primary">
      <WheelContent title="Move">
        <Move />
      </WheelContent>
      <WheelContent title="Delete">
        <Delete />
      </WheelContent>
      <WheelContent title="Copy">
        <Copy />
      </WheelContent>
      <WheelContent title="Info">
        <Info />
      </WheelContent>
      <WheelContent title="Rotate">
        <RotateCw />
      </WheelContent>
    </Wheel>
  );
}

export default FiveWheel;
