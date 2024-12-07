'use client';

import { SvgMinus, SvgPlus } from '@/assets/svgs';
import Button from '@/components/shared/action/Button';
import { useBearStore } from '@/stores/slices/bear';

const BearCounter = () => {
  const { bears, increase, decrease } = useBearStore();

  return (
    <div className="flex items-center justify-center">
      <Button shape="circle" aria-label="increase" onClick={() => increase(1)}>
        <SvgPlus />
      </Button>
      <Button variant="ghost" shape="wide">
        {bears}
      </Button>
      <Button shape="circle" aria-label="decrease" onClick={() => decrease(1)}>
        <SvgMinus />
      </Button>
    </div>
  );
};

export default BearCounter;
