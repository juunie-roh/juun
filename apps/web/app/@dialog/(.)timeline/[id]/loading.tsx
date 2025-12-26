"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";

export default function TimelineDialogLoading() {
  const router = useRouter();

  return (
    <Dialog
      defaultOpen
      onOpenChange={(open) => {
        if (!open) router.back();
      }}
    >
      <DialogContent className="flex h-full max-h-[75vh] max-w-4xl flex-col rounded-none">
        <div className="relative flex shrink-0 gap-2">
          <aside className="-mt-6.5 h-[calc(100%+(--spacing(6.5)))] w-30 shrink-0 bg-primary p-2 pt-6.5 text-background">
            <div className="flex w-full flex-col items-end gap-2">
              <span className="block font-stabil-grotesk text-5xl font-bold tracking-tight underline underline-offset-8">
                000
              </span>
              <Skeleton className="h-3.5 w-18 bg-background/20" />
            </div>
          </aside>
          <DialogHeader className="text-left">
            <DialogTitle>
              <Skeleton className="h-8 w-3/4" />
            </DialogTitle>
            <div>
              <Skeleton className="h-5 w-full" />
              <Skeleton className="mt-2 h-5 w-2/3" />
            </div>
            <div className="flex gap-2 pt-2">
              <Skeleton className="h-6 w-16" />
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-16" />
            </div>
          </DialogHeader>
        </div>
        <ScrollArea className="h-full min-h-0 flex-wrap">
          <div className="space-y-3 p-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <Skeleton className="h-4 w-full" />
            <div className="py-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <Skeleton className="h-4 w-full" />
            <div className="py-2" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
