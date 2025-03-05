'use client';

import {
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from '@juun/ui';

import BearCounter from './BearCounter';

const BearCounterModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">open</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bear Counter Modal</DialogTitle>
            <DialogDescription>
              Modal created by shadcn dialog
            </DialogDescription>
          </DialogHeader>

          <BearCounter />

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="secondary">close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </DialogPortal>
    </Dialog>
  );
};

export default BearCounterModal;
