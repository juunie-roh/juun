import { Canvas as ThreeCanvas, type CanvasProps } from "@react-three/fiber";

export default function Canvas({ children, ...props }: CanvasProps) {
  return (
    <div className="size-full overflow-hidden rounded-md">
      <ThreeCanvas {...props}>{children}</ThreeCanvas>
    </div>
  );
}

export type { CanvasProps };
