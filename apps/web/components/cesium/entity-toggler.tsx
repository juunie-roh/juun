'use client';

import { Collection } from '@juun-roh/cesium-utils';
import { Button } from '@pkg/ui';
import { Cartesian3, Color, Entity, HeightReference } from 'cesium';
import { useCallback, useMemo, useState } from 'react';

import useViewerStore from '@/stores/slices/viewer';

export default function EntityToggler() {
  const [on, setOn] = useState(false);
  const viewer = useViewerStore((state) => state.viewer);
  const entities = useMemo(() => {
    if (!viewer) return;
    const c = new Collection({ collection: viewer.entities, tag: 'toggler' });
    c.addEventListener('add', () => setOn(true));
    c.addEventListener('remove', () => setOn(false));
    return c;
  }, [viewer]);

  const entity = useMemo(
    () =>
      new Entity({
        position: Cartesian3.fromDegrees(139.7454, 35.6586, 250),
        box: {
          dimensions: new Cartesian3(50.0, 50.0, 333.0),
          material: Color.RED.withAlpha(0.8),
          outline: true,
          outlineColor: Color.WHITE,
          heightReference: HeightReference.CLAMP_TO_GROUND,
        },
      }),
    [],
  );

  const onClick = useCallback(() => {
    if (!entities) return;
    if (!on) {
      entities.add(entity);
    } else {
      entities.remove(entity);
    }
  }, [entities, on, entity]);

  return (
    <Button
      onClick={onClick}
      className="w-full"
      disabled={!viewer || !entities || !entity}
    >
      {on ? 'Remove' : 'Add'} Entity
    </Button>
  );
}
