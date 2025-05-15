import { Viewer } from 'cesium';
import { ViewerProps } from 'resium';

interface IViewerProps extends ViewerProps {
  /** Whether to show the credit container */
  bottomContainer?: boolean;
  /** Initial location of the camera */
  flyTo?: Parameters<Viewer['camera']['flyTo']>[0];
  /** Whether to show the timeline CesiumWidget */
  timeline?: boolean;
  /** Whether to show the animation CesiumWidget */
  animation?: boolean;
}

export type { IViewerProps };
