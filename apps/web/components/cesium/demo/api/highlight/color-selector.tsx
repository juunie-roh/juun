import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@pkg/ui/select";
import Cesium from "cesium";
import { SetStateAction } from "react";

interface ColorSelectorProps {
  color: ReturnType<Cesium.Color["toCssColorString"]>;
  setColor: (value: SetStateAction<string>) => void;
}

export default function ColorSelector({
  color = Cesium.Color.RED.toCssColorString(),
  setColor: setColorAction,
}: ColorSelectorProps) {
  return (
    <Select
      onValueChange={(value) => setColorAction(value)}
      defaultValue={color}
    >
      <SelectTrigger className="w-36">
        <SelectValue placeholder="Select a color" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value={Cesium.Color.RED.toCssColorString()}>
            RED
          </SelectItem>
          <SelectItem value={Cesium.Color.BLUE.toCssColorString()}>
            BLUE
          </SelectItem>
          <SelectItem value={Cesium.Color.LIME.toCssColorString()}>
            LIME
          </SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
