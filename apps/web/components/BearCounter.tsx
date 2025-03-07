'use client';

import { Button } from '@juun/ui';
import { Minus, Plus } from 'lucide-react';

import { useBearStore } from '@/stores/slices/bear';

const BearCounter = () => {
  const { bears, increase, decrease } = useBearStore();

  return (
    <div className="flex w-full items-center justify-between">
      <Button
        size="icon"
        aria-label="increase"
        className="rounded-full"
        onClick={() => increase(1)}
      >
        <Plus />
      </Button>
      <div className="text-center">{bears}</div>
      <Button
        size="icon"
        aria-label="decrease"
        className="rounded-full"
        onClick={() => decrease(1)}
      >
        <Minus />
      </Button>
    </div>
  );
};

export default BearCounter;
