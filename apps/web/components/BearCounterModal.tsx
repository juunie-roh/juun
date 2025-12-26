"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import BearCounter from "./BearCounter";

const BearCounterModal = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="secondary">open</Button>
      </DialogTrigger>
      <DialogPortal>
        <DialogContent className="font-sans">
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
