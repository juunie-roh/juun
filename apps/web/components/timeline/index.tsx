import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemHeader,
  ItemTitle,
} from "@/components/ui/item";
import { Separator } from "@/components/ui/separator";
import { Link } from "@/i18n/navigation";
import type { Timeline as TimelineItem } from "@/lib/cache";
import { formatDate } from "@/utils/date";
import { capitalize } from "@/utils/string";

import TimelineTags from "./tag";

interface TimelineProps {
  items: Omit<TimelineItem, "detail">[];
}

export default function Timeline({ items }: TimelineProps) {
  return (
    <ol>
      {items.map((item) => (
        <li key={`timeline-${item.id}`} className="relative flex h-full gap-0">
          <div className="relative flex w-1/5 min-w-36 shrink-0 flex-col items-end justify-between gap-2 border-r p-2 pl-0 text-muted-foreground">
            <div className="text-right font-victor-serif text-sm text-muted-foreground">
              <span className="relative mb-2 block text-xl font-semibold">
                {capitalize(item.category)}
                <Separator
                  className="absolute -bottom-0.75 left-0 w-[105%]!"
                  orientation="horizontal"
                />
                <div
                  role="none"
                  className="absolute top-6 -right-2 size-1.5 translate-x-1/2 translate-y-1/2 rounded-full bg-primary ring ring-muted-foreground ring-offset-1"
                />
              </span>
              <time dateTime={item.created_at.toLocaleDateString()}>
                {formatDate(item.created_at)}
              </time>
            </div>
            <Button variant="link" size="sm" className="h-fit" asChild>
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
              <TimelineTags tags={item.tags}>
                {item.article && <Badge>Article</Badge>}
                {item.playground && <Badge>Playground</Badge>}
              </TimelineTags>
            </ItemHeader>

            <ItemContent>
              <ItemDescription className="line-clamp-none text-sm text-wrap">
                {item.description}
              </ItemDescription>
            </ItemContent>

            {(item.article || item.playground) && (
              <ItemFooter className="justify-start">
                Related:
                {item.article && (
                  <Link
                    href={item.article}
                    prefetch
                    className="hover:underline"
                  >
                    Article
                  </Link>
                )}
                {item.playground && (
                  <Link
                    href={item.playground}
                    prefetch
                    className="hover:underline"
                  >
                    Playground
                  </Link>
                )}
              </ItemFooter>
            )}
          </Item>
        </li>
      ))}
    </ol>
  );
}
