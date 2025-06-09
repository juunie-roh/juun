'use client';

import EntityToggler from '@/components/cesium/entity-toggler';
import useViewerStore from '@/stores/slices/viewer';

export default function CollectionDemo() {
  const { viewer } = useViewerStore();
  return (
    <div className="size-full">
      <EntityToggler />
    </div>
  );
}
