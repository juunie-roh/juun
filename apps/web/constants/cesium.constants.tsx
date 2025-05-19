import { Cartesian3, Math as CMath } from 'cesium';

import { ApiFeatureOption } from '@/types/cesium.types';

export const API_FEATURE_OPTIONS: ApiFeatureOption[] = [
  {
    feat: 'collection',
    label: 'Collection',
    flyTo: {
      destination: new Cartesian3(
        -3964624.632297504,
        3356819.574895879,
        3696707.310427818,
      ),
      orientation: {
        heading: CMath.toRadians(0),
        pitch: CMath.toRadians(-50),
        roll: 0.0,
      },
    },
  },
  {
    feat: 'terrain',
    label: 'Terrain',
  },
  {
    feat: 'viewer',
    label: 'Viewer',
  },
  {
    feat: 'highlight',
    label: 'Highlight',
  },
];
