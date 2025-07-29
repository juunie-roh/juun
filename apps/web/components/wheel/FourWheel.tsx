"use client";

import { Wheel, WheelContent } from "@juun/ui/wheel";
import { Home, Menu, MessageCircle, Settings } from "lucide-react";

function FourWheel() {
  return (
    <Wheel variant="outline">
      <WheelContent title="Home">
        <Home />
      </WheelContent>
      <WheelContent title="Menu">
        <Menu />
      </WheelContent>
      <WheelContent title="Message">
        <MessageCircle />
      </WheelContent>
      <WheelContent title="Settings">
        <Settings />
      </WheelContent>
    </Wheel>
  );
}

export default FourWheel;
