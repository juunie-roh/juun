import { AspectRatio } from '@pkg/ui/aspect-ratio';
import { Canvas as ThreeCanvas, type CanvasProps } from '@react-three/fiber';

export default function Canvas({ children, ...props }: CanvasProps) {
  return (
    <AspectRatio
      ratio={16 / 9}
      className="size-full overflow-hidden rounded-md"
    >
      <ThreeCanvas {...props}>{children}</ThreeCanvas>
    </AspectRatio>
  );
}

export type { CanvasProps };
