'use client';

import { Wheel } from '@pkg/ui';
import { Copy, Delete, Info, Move, RotateCw } from 'lucide-react';

function FiveWheel() {
  return (
    <Wheel
      type="five"
      icons={[Move, Delete, Copy, Info, RotateCw]}
      titles={['Move', 'Delete', 'Copy', 'Info', 'Rotate']}
    />
  );
}

export default FiveWheel;
