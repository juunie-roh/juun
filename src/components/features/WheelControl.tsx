'use client';

import Button from '@/components/ui/button';
import { useWheelStore } from '@/stores/slices/wheel';

const WheelControl = () => {
  const { active, activate, show } = useWheelStore();
  return (
    <div className="flex w-full gap-2">
      <Button
        className="w-[105px]"
        onClick={() => {
          if (active) show(false);
          activate(!active);
        }}
      >
        {active ? 'Deactivate' : 'Activate'}
      </Button>
    </div>
  );
};

export default WheelControl;
