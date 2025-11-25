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
import React from "react";

import { TimelineItem } from "@/app/timeline/_data";
import { formatDateSafe } from "@/utils/date";

import TimelineTags from "./tag";

export default function TimelineDialog({
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
      <DialogContent className="flex h-full max-h-[75vh] max-w-4xl flex-col rounded-none">
        <div className="relative flex shrink-0 gap-2">
          <aside className="-mt-6.5 h-[calc(100%+(--spacing(6.5)))] w-30 shrink-0 bg-primary p-2 pt-6.5 text-background">
            <div className="flex w-full flex-col items-end gap-2">
              <span className="block font-stabil-grotesk text-5xl font-bold tracking-tight underline underline-offset-8">
                {item.id.toString().padStart(3, "0")}
              </span>
              <time dateTime={item.date} className="font-victor-serif">
                {formatDateSafe(item.date)}
              </time>
            </div>
          </aside>
          <DialogHeader className="text-left">
            <DialogTitle className="me-4 font-stabil-grotesk text-2xl font-bold tracking-tight">
              {item.title}
            </DialogTitle>
            <DialogDescription>{item.description}</DialogDescription>
            <TimelineTags tags={item.tags}>
              {item.article && <Badge>Article</Badge>}
              {item.playground && <Badge>Playground</Badge>}
            </TimelineTags>
          </DialogHeader>
        </div>
        <ScrollArea className="h-full min-h-0 flex-wrap">{children}</ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
