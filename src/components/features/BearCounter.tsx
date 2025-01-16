'use client';

import { Minus, Plus } from '@/components/icons';
import Button from '@/components/ui/button';
import { useBearStore } from '@/stores/slices/bear';

const BearCounter = () => {
  const { bears, increase, decrease } = useBearStore();

  return (
    <div className="w-full flex items-center justify-center">
      <Button shape="circle" aria-label="increase" onClick={() => increase(1)}>
        <Plus />
      </Button>
      <div className="w-full flex justify-center items-center">{bears}</div>
      <Button shape="circle" aria-label="decrease" onClick={() => decrease(1)}>
        <Minus />
      </Button>
    </div>
  );
};

export default BearCounter;
