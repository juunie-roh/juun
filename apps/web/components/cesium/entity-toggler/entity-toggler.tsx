'use client';

import { Collection } from '@juun-roh/cesium-utils';
import { Button } from '@pkg/ui/button';
import {
  Cartesian3,
  Color,
  Entity,
  HeightReference,
  Math as CMath,
} from 'cesium';
import { useCallback, useMemo, useState } from 'react';

import useViewerStore from '@/stores/slices/viewer';

const DEST = {
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
  duration: 2,
};

const ENTITY = new Entity({
  position: Cartesian3.fromDegrees(139.7454, 35.6586, 250),
  id: 'Test Entity',
  box: {
    dimensions: new Cartesian3(50.0, 50.0, 333.0),
    material: Color.RED.withAlpha(0.8),
    outline: true,
    outlineColor: Color.WHITE,
    heightReference: HeightReference.CLAMP_TO_GROUND,
  },
});

export default function EntityToggler() {
  const [on, setOn] = useState(false);
  const { viewer, isFlying } = useViewerStore();
  const entities = useMemo(() => {
    if (!viewer) return;
    const c = new Collection({ collection: viewer.entities, tag: 'toggler' });
    c.addEventListener('add', () => {
      setOn(true);
      console.log('🚀 ~ entities ~ add:', c.values);
    });
    c.addEventListener('remove', () => {
      setOn(false);
      console.log('🚀 ~ entities ~ remove:', c.values);
    });
    return c;
  }, [viewer]);

  const onClick = useCallback(() => {
    if (!entities || !viewer) return;
    if (!on) {
      entities.add(ENTITY);
    } else {
      entities.remove(ENTITY);
    }
  }, [entities, on, viewer]);

  return (
    <div className="flex flex-col gap-2">
      <Button
        onClick={() => viewer?.camera.flyTo(DEST)}
        className="w-full"
        disabled={!viewer || !entities || isFlying}
      >
        Fly To Destination
      </Button>
      <Button
        onClick={onClick}
        className="w-full"
        disabled={!viewer || !entities || isFlying}
      >
        {on ? 'Remove' : 'Add'} Entity
      </Button>
    </div>
  );
}
