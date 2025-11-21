import { Badge } from "@juun/ui/badge";
import { Button } from "@juun/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@juun/ui/item";
import Link from "next/link";

import { TimelineItem } from "@/app/timeline/_data";
import { formatDateSafe } from "@/utils/date";

interface TimelineProps {
  items: Omit<TimelineItem, "detail">[];
  order?: "asc" | "desc";
}

export default function Timeline({ items, order = "desc" }: TimelineProps) {
  const sortedItems = [...items].sort((a, b) =>
    order === "desc"
      ? new Date(b.date).getTime() - new Date(a.date).getTime()
      : new Date(a.date).getTime() - new Date(b.date).getTime(),
  );

  return (
    <ol>
      {sortedItems.map((item) => (
        <li key={`timeline-${item.id}`} className="relative flex h-full gap-0">
          <div className="relative w-1/5 min-w-32 shrink-0 border-r p-2 pl-0 text-right text-muted-foreground">
            <div className="text-right font-victor-serif text-sm text-muted-foreground">
              <span className="relative block text-xl font-semibold">
                {item.category}
                <div
                  role="none"
                  className="absolute top-2 -right-2 size-1.5 translate-x-1/2 translate-y-1/2 rounded-full bg-muted-foreground ring ring-border ring-offset-1"
                />
              </span>
              <time dateTime={item.date}>{formatDateSafe(item.date)}</time>
            </div>
          </div>
          <Item className="w-full gap-2 bg-background p-2">
            <ItemHeader className="flex-col items-start justify-start">
              <ItemTitle className="font-stabil-grotesk text-xl font-bold tracking-tight">
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
              <ItemDescription className="line-clamp-none text-sm">
                {item.description}
              </ItemDescription>
            </ItemContent>

            <ItemFooter>
              <ItemActions>
                <Button variant="outline" size="sm" asChild>
                  <Link href={`/timeline/${item.id}`}>Details</Link>
                </Button>
              </ItemActions>
            </ItemFooter>
          </Item>
        </li>
      ))}
    </ol>
  );
}
