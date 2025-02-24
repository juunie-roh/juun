'use client';

import { Copy, Delete, Info, Move, Rotate3D } from 'lucide-react';

import { Wheel } from './Wheel';

function FiveWheel() {
  return (
    <Wheel
      type="five"
      icons={[Move, Delete, Copy, Info, Rotate3D]}
      titles={['Move', 'Delete', 'Copy', 'Info', 'Rotate']}
    />
  );
}

export default FiveWheel;
