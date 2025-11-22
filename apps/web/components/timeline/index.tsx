import { Badge } from "@juun/ui/badge";
import { Button } from "@juun/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
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
          <div className="relative flex w-1/5 min-w-36 shrink-0 flex-col items-end justify-between gap-2 border-r p-2 pl-0 text-muted-foreground">
            <div className="text-right font-victor-serif text-sm text-muted-foreground">
              <span className="relative mb-2 block text-xl font-semibold">
                {item.category}
                <div
                  role="none"
                  className="absolute top-6 -right-2 size-1.5 translate-x-1/2 translate-y-1/2 rounded-full bg-primary ring ring-muted-foreground ring-offset-1"
                />
              </span>
              <time dateTime={item.date}>{formatDateSafe(item.date)}</time>
            </div>
            <Button variant="link" size="sm" asChild>
              <Link href={`/timeline/${item.id}`} prefetch>
                Details
              </Link>
            </Button>
          </div>
          <Item className="mb-auto w-full gap-2 bg-background p-2">
            <ItemHeader className="flex-col items-start justify-start gap-2">
              <ItemTitle className="text-xl font-bold tracking-tight">
                {item.title}
              </ItemTitle>
              <div className="flex w-full flex-wrap gap-1.5">
                {item.tags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </ItemHeader>

            <ItemContent>
              <ItemDescription className="line-clamp-none text-sm text-wrap">
                {item.description}
              </ItemDescription>
            </ItemContent>
          </Item>
        </li>
      ))}
    </ol>
  );
}
