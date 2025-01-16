'use client';

import Button from '@/components/ui/button';
import Dialog from '@/components/ui/dialog';

import BearCounter from './BearCounter';

const BearCounterModal = () => {
  return (
    <Dialog
      trigger={<Button variant="secondary">open</Button>}
      dialog-title="Bear Counter Modal"
      dialog-description="Modal created by shadcn dialog"
      close={<Button variant="secondary">close</Button>}
    >
      <BearCounter />
    </Dialog>
  );
};

export default BearCounterModal;
