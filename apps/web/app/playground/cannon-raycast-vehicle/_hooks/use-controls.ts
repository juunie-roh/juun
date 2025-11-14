import type { RefObject } from "react";
import { useEffect, useRef } from "react";

type KeyCode = keyof typeof keyControlMap;
type GameControl = (typeof keyControlMap)[KeyCode];

const keyControlMap = {
  " ": "brake",
  ArrowDown: "backward",
  ArrowLeft: "left",
  ArrowRight: "right",
  ArrowUp: "forward",
  a: "left",
  d: "right",
  r: "reset",
  s: "backward",
  w: "forward",
} as const;
const keyCodes = Object.keys(keyControlMap) as KeyCode[];

export const useControls = () => {
  const controls = useRef<Record<GameControl, boolean>>({
    backward: false,
    brake: false,
    forward: false,
    left: false,
    reset: false,
    right: false,
  });

  useKeyControls(controls, keyControlMap);

  return controls;
};

const isKeyCode = (v: unknown): v is KeyCode => keyCodes.includes(v as KeyCode);

const useKeyControls = (
  { current }: RefObject<Record<GameControl, boolean>>,
  map: Record<KeyCode, GameControl>,
) => {
  useEffect(() => {
    const handleKeyDown = ({ key }: KeyboardEvent) => {
      if (!isKeyCode(key)) return;

      current[map[key]] = true;
    };
    window.addEventListener("keydown", handleKeyDown);

    const handleKeyUp = ({ key }: KeyboardEvent) => {
      if (!isKeyCode(key)) return;

      current[map[key]] = false;
    };
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [current, map]);
};
