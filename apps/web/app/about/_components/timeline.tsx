import { Badge } from "@juun/ui/badge";
import { Button } from "@juun/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@juun/ui/collapsible";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@juun/ui/item";
import { cn } from "@juun/ui/lib/utils";
import { ChevronRight } from "lucide-react";

import md from "@/lib/md";
import { formatDateSafe } from "@/utils/date";

type TimelineItem = {
  date: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  detail?: string;
};

export default function Timeline({ items }: { items: TimelineItem[] }) {
  // sort items by oldest date
  const sortedItems = [...items].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <section className="relative w-full">
      <h2 className="p-4 text-3xl font-bold tracking-tight">
        Project Timeline
      </h2>
      <ol>
        {sortedItems.map(async (item, index) => (
          <li
            key={`timeline-${index}`}
            className={cn(
              "relative flex flex-row-reverse bg-accent-foreground",
              index % 2 === 0 && "flex-row",
            )}
          >
            <div className="w-1/3 p-4">
              <div
                className={cn(
                  "sticky top-[calc(var(--spacing-header)+--spacing(4))] flex flex-col items-start",
                  index % 2 === 0 && "items-end",
                )}
              >
                <h3 className="font-stabil-grotesk text-[11vw] font-bold tracking-tighter text-background underline underline-offset-[1.8vw]">
                  {String(index + 1).padStart(3, "0")}
                </h3>
                <div
                  className={cn(
                    "text-left font-victor-serif text-sm text-muted md:text-base lg:text-lg",
                    index % 2 === 0 && "text-right",
                  )}
                >
                  <p>{item.category}</p>
                  <p>{formatDateSafe(item.date)}</p>
                </div>
              </div>
            </div>
            <Item
              className={cn(
                "mb-4 w-2/3 rounded-4xl bg-background",
                index % 2 === 0 && "rounded-r-none",
                index % 2 === 1 && "rounded-l-none",
                index === 0 && "rounded-t-none",
                index === items.length - 1 && "mb-0 rounded-b-none",
              )}
            >
              <ItemHeader className="flex-col items-start justify-start">
                <ItemTitle className="font-stabil-grotesk text-2xl font-bold tracking-tight">
                  {item.title}
                </ItemTitle>

                <div className="flex w-full flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </ItemHeader>
              <ItemContent>
                <ItemDescription className="line-clamp-none text-wrap md:text-base">
                  {item.description}
                </ItemDescription>
              </ItemContent>
              {item.detail && (
                <ItemFooter className="w-full">
                  <ItemActions className="w-full">
                    <Collapsible className="w-full">
                      <CollapsibleTrigger asChild>
                        <Button
                          variant="link"
                          className="[&[data-state=open]>svg]:rotate-90"
                        >
                          <ChevronRight className="transition-transform" />
                          Details
                        </Button>
                      </CollapsibleTrigger>
                      <CollapsibleContent className="data-[state=closed]:animate-collapsible-up data-[state=open]:animate-collapsible-down">
                        {md.render(await md.parse(item.detail))}
                      </CollapsibleContent>
                    </Collapsible>
                  </ItemActions>
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
