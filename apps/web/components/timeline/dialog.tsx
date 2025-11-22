"use client";

import { Badge } from "@juun/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@juun/ui/dialog";
import { ScrollArea } from "@juun/ui/scroll-area";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

import { TimelineItem } from "@/app/timeline/_data";
import { useTimelineDialog } from "@/stores/slices/timeline-dialog";

export function TimelineDialog({
  item,
  children,
}: {
  item: Omit<TimelineItem, "detail">;
  children: React.ReactNode;
}) {
  const { isOpen, open, close } = useTimelineDialog();
  const router = useRouter();
  const pathname = usePathname();
  const initialPathname = React.useRef(pathname);

  // Open dialog on mount
  React.useEffect(() => {
    open();
  }, [open]);

  // Close dialog when route changes
  React.useEffect(() => {
    if (pathname !== initialPathname.current) {
      close();
    }
  }, [pathname, close]);

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) {
          close();
          router.back();
        }
      }}
    >
      <DialogContent className="flex h-full max-h-[80vh] max-w-4xl flex-col">
        <DialogHeader className="shrink-0 text-left">
          <DialogTitle className="mr-2 font-stabil-grotesk text-2xl font-bold tracking-tight">
            {item.title}
          </DialogTitle>
          <DialogDescription>{item.description}</DialogDescription>
          <div className="flex w-full flex-wrap gap-2">
            {item.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
        </DialogHeader>
        <ScrollArea className="h-full min-h-0 flex-wrap">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
