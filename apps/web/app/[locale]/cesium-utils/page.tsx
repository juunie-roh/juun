import { ResizableViewerController } from "./_components";
import { ViewerProvider } from "./_contexts";

export default function CesiumUtilsDemo() {
  return (
    <ViewerProvider>
      <ResizableViewerController showDefaultDemo={true} />
    </ViewerProvider>
  );
}
