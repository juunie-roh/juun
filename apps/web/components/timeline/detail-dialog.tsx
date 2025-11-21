"use client";

import { Dialog, DialogContent } from "@juun/ui/dialog";
import { useRouter } from "next/navigation";

export function TimelineDetailDialog({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent className="max-h-[80vh] max-w-4xl overflow-y-auto">
        {children}
      </DialogContent>
    </Dialog>
  );
}
