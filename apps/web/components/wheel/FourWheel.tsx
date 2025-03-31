'use client';

import { Wheel } from '@pkg/ui';
import { Home, Menu, MessageCircle, Settings } from 'lucide-react';

function FourWheel() {
  return (
    <Wheel
      num={4}
      icons={[Home, Menu, MessageCircle, Settings]}
      titles={['Home', 'Menu', 'Message', 'Settings']}
      variant="outline"
    />
  );
}

export default FourWheel;
