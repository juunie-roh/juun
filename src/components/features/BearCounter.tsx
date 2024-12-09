'use client';

import { Minus, Plus } from '@/assets/svgs';
import Button from '@/components/shared/action/Button';
import { useBearStore } from '@/stores/slices/bear';

const BearCounter = () => {
  const { bears, increase, decrease } = useBearStore();

  return (
    <div className="flex items-center justify-center">
      <Button shape="circle" aria-label="increase" onClick={() => increase(1)}>
        <Plus />
      </Button>
      <Button variant="ghost" shape="wide">
        {bears}
      </Button>
      <Button shape="circle" aria-label="decrease" onClick={() => decrease(1)}>
        <Minus />
      </Button>
    </div>
  );
};

export default BearCounter;
