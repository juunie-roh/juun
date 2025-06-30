"use client";

import { Wheel } from "@pkg/ui/wheel";
import { Copy, Delete, Info, Move, RotateCw } from "lucide-react";

function FiveWheel() {
  return (
    <Wheel
      num={5}
      icons={[Move, Delete, Copy, Info, RotateCw]}
      titles={["Move", "Delete", "Copy", "Info", "Rotate"]}
    />
  );
}

export default FiveWheel;
