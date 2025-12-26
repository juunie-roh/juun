"use client";

import { Home, Menu, MessageCircle, Settings } from "lucide-react";

import { Wheel, WheelContent } from "@/components/ui/wheel";

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
