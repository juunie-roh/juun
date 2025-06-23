'use client';

import { Wheel } from '@pkg/ui/wheel';
import { Check, X } from 'lucide-react';

function ConfirmWheel() {
  return (
    <Wheel
      num={2}
      icons={[Check, X]}
      titles={['Confirm', 'Cancel']}
      variant="destructive"
    />
  );
}

export default ConfirmWheel;
