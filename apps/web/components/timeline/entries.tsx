"use client";

import { ChevronsDown } from "lucide-react";
import { useState } from "react";

import TimelineEntry, { type TimelineEntryItem } from "./entry";

const BATCH_SIZE = 5;

export default function EntriesList({ items }: { items: TimelineEntryItem[] }) {
  const [visibleCount, setVisibleCount] = useState(BATCH_SIZE);

  const hasMore = visibleCount < items.length;

  return (
    <>
      <ol className="divide-y">
        {items.slice(0, visibleCount).map((item) => (
          <TimelineEntry key={item.id} item={item} />
        ))}
      </ol>
      {hasMore && (
        <li className="list-none">
          <button
            onClick={() =>
              setVisibleCount((prev) =>
                Math.min(prev + BATCH_SIZE, items.length),
              )
            }
            className="flex w-full flex-col items-center justify-center gap-1 border-t px-4 py-8 text-muted-foreground transition-colors hover:bg-muted/40 hover:text-foreground md:px-6 md:py-10"
          >
            <ChevronsDown className="size-10 scale-x-200" />
            <span className="text-2xl tracking-tighter">More</span>
          </button>
        </li>
      )}
    </>
  );
}
