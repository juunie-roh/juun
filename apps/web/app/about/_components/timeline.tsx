import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@juun/ui/item";
import { cn } from "@juun/ui/lib/utils";
import { ReactNode } from "react";

import { formatDateSafe } from "@/utils/date";

type TimelineItem = {
  id: string;
  date: string;
  title: string;
  description: ReactNode;
  category: string;
  tags?: string[];
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <section className="relative w-full">
      <h2 className="p-4 text-3xl font-bold tracking-tight">
        Project Timeline
      </h2>
      <ol>
        {items.map((item, index) => (
          <li
            key={item.id}
            className={cn(
              "bg-accent-foreground relative flex flex-row-reverse",
              index % 2 === 0 && "flex-row",
            )}
          >
            <div className="w-1/3 p-4">
              <div
                className={cn(
                  "sticky top-[calc(var(--header-height)+var(--spacing)*4)] flex flex-col items-start",
                  index % 2 === 0 && "items-end",
                )}
              >
                <h3 className="text-background font-(family-name:--font-stabil-grotesk-trial) text-[11vw] font-bold tracking-tighter underline underline-offset-[1.8vw]">
                  {item.id}
                </h3>
                <div
                  className={cn(
                    "font-(family-name:--font-victor-serif-trial) text-muted text-left text-sm md:text-lg",
                    index % 2 === 0 && "text-right",
                  )}
                >
                  <p>{item.category}</p>
                  <p>{formatDateSafe(item.date, true)}</p>
                </div>
              </div>
            </div>
            <Item
              className={cn(
                "bg-background rounded-4xl mb-4 w-2/3",
                index % 2 === 0 && "rounded-r-none",
                index % 2 === 1 && "rounded-l-none",
                index === 0 && "rounded-t-none",
                index === items.length - 1 && "mb-0 rounded-b-none",
              )}
            >
              <ItemHeader>
                <ItemTitle className="font-(family-name:--font-stabil-grotesk-trial) text-2xl font-bold tracking-tight">
                  {item.title}
                </ItemTitle>
              </ItemHeader>
              <ItemContent>
                <div
                  data-slot="item-description"
                  className="prose prose-zinc max-w-none"
                >
                  {item.description}
                </div>
              </ItemContent>
              {item.tags && item.tags.length > 0 && (
                <ItemFooter>
                  <div className="flex w-full flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </ItemFooter>
              )}
            </Item>
          </li>
        ))}
      </ol>
    </section>
  );
}

export type { TimelineItem };
