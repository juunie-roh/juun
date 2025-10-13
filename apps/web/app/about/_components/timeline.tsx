import {
  Item,
  ItemContent,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@juun/ui/item";
import { cn } from "@juun/ui/lib/utils";
import { Calendar } from "lucide-react";
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
            <div className="w-1/3 px-2 py-4">
              <h3
                className={cn(
                  "text-background font-(family-name:--font-stabil-grotesk-trial) sticky top-[calc(var(--header-height)+var(--spacing)*4)] text-left text-[11vw] font-bold tracking-tighter",
                  index % 2 === 0 && "text-right",
                )}
              >
                {item.id}
              </h3>
            </div>
            <Item className="bg-background w-2/3 rounded-none p-4">
              <ItemHeader className="justify-start">
                <Calendar size={16} className="inline" />
                {formatDateSafe(item.date, true)}
              </ItemHeader>
              <ItemContent>
                <ItemTitle className="font-(family-name:--font-stabil-grotesk-trial) text-2xl font-bold tracking-tight">
                  {item.title}
                </ItemTitle>
                <div data-slot="item-description" className="prose prose-zinc">
                  {item.description}
                </div>
              </ItemContent>
              <ItemFooter className="flex-col items-start">
                <span className="text-lg font-semibold tracking-tight">
                  {item.category}
                </span>
                {item.tags && item.tags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.tags.map((tag) => (
                      <span
                        key={tag}
                        className="bg-secondary text-secondary-foreground rounded-md px-2 py-1 text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </ItemFooter>
            </Item>
          </li>
        ))}
      </ol>
    </section>
  );
}

export type { TimelineItem };
