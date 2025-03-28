'use client';

import { Wheel } from '@pkg/ui';
import { Check, X } from 'lucide-react';

function ConfirmWheel() {
  return (
    <Wheel
      type="confirm"
      icons={[Check, X]}
      titles={['Confirm', 'Cancel']}
      variant="destructive"
    />
  );
}

export default ConfirmWheel;
