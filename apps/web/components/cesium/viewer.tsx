import { Viewer as CViewer } from 'cesium';
import { forwardRef } from 'react';
import { CesiumComponentRef, Viewer as RViewer, ViewerProps } from 'resium';

const Viewer = forwardRef<CesiumComponentRef<CViewer>, ViewerProps>(
  ({ ...props }, ref) => {
    return (
      <RViewer
        ref={ref}
        baseLayerPicker={false}
        fullscreenButton={false}
        geocoder={false}
        infoBox={false}
        navigationHelpButton={false}
        scene3DOnly={true}
        selectionIndicator={false}
        homeButton={false}
        className="size-full"
        {...props}
      />
    );
  },
);

export default Viewer;
