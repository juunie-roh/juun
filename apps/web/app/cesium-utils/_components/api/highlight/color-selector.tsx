import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@juun/ui/select";
import { Color } from "cesium";
import { SetStateAction } from "react";

interface ColorSelectorProps {
  color: ReturnType<Color["toCssColorString"]>;
  setColor: (value: SetStateAction<string>) => void;
}

export default function ColorSelector({
  color = Color.RED.toCssColorString(),
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
          <SelectLabel>Color</SelectLabel>
          <SelectItem value={Color.RED.toCssColorString()}>RED</SelectItem>
          <SelectItem value={Color.BLUE.toCssColorString()}>BLUE</SelectItem>
          <SelectItem value={Color.LIME.toCssColorString()}>LIME</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
