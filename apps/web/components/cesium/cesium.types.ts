import { Viewer } from 'cesium';
import { ViewerProps } from 'resium';

interface IViewerProps extends ViewerProps {
  /** Whether to show the credit container. @default true */
  bottomContainer?: boolean;
  /** Initial location of the camera */
  flyTo?: Parameters<Viewer['camera']['flyTo']>[0];
  /** Whether to show the timeline CesiumWidget. @default true */
  timeline?: boolean;
  /** Whether to show the animation CesiumWidget. @default true */
  animation?: boolean;
}

export type { IViewerProps };
