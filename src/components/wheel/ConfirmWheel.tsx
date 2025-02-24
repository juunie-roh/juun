'use client';

import { Check, X } from 'lucide-react';

import { Wheel } from './Wheel';

function ConfirmWheel() {
  return (
    <Wheel type="confirm" icons={[Check, X]} titles={['Confirm', 'Cancel']} />
  );
}

export default ConfirmWheel;
