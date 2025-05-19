import { Viewer } from 'cesium';
import { ViewerProps as RViewerProps } from 'resium';

export interface ViewerProps extends Omit<RViewerProps, 'className'> {
  /** Whether to show the credit container. @default true */
  bottomContainer?: boolean;
  /** Initial location of the camera */
  flyTo?: Parameters<Viewer['camera']['flyTo']>[0];
  /** Whether to show the timeline CesiumWidget. @default true */
  timeline?: boolean;
  /** Whether to show the animation CesiumWidget. @default true */
  animation?: boolean;
}

export type ApiFeature = 'collection' | 'terrain' | 'viewer' | 'highlight';
export interface ApiFeatureOption {
  /** The feature of Api to show */
  feat: ApiFeature;
  /** Display name for the UI */
  label: string;
  /** Initial camera location to be set */
  flyTo?: Parameters<Viewer['camera']['flyTo']>[0];
}
