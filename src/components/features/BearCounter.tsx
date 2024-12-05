'use client';

import { SvgMinus, SvgPlus } from '@/assets/svgs';
import Button from '@/components/shared/Button';
import { useBearStore } from '@/stores/slices/bear';

const BearCounter = () => {
  const { bears, increase, decrease } = useBearStore();

  return (
    <div className="flex items-center justify-center">
      <button className="btn btn-circle" onClick={() => increase(1)} style={{ fontSize: 0 }}>
        increase
        <SvgPlus />
      </button>
      <Button variant="ghost" shape="wide">
        {bears}
      </Button>
      <button className="btn btn-circle" onClick={() => decrease(1)} style={{ fontSize: 0 }}>
        decrease
        <SvgMinus />
      </button>
    </div>
  );
};

export default BearCounter;
