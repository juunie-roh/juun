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
import { useRouter } from "next/navigation";

import { TimelineItem } from "@/app/timeline/_data";

export function TimelineDetailDialog({
  item,
  children,
}: {
  item: Omit<TimelineItem, "detail">;
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
      <DialogContent className="flex h-full max-h-[80vh] max-w-4xl flex-col">
        <DialogHeader className="shrink-0">
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
        <ScrollArea className="h-full min-h-0">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
