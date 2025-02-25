'use client';

import { Home, Menu, MessageCircle, Settings } from 'lucide-react';

import { Wheel } from './Wheel';

function FourWheel() {
  return (
    <Wheel
      type="four"
      icons={[Home, Menu, MessageCircle, Settings]}
      titles={['Home', 'Menu', 'Message', 'Settings']}
      variant="outline"
    />
  );
}

export default FourWheel;
