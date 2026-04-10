import type { TimelineWithoutContent } from "@juun/db/timeline";
import { ArrowUpRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Link } from "@/i18n/navigation";

export type TimelineEntryItem = TimelineWithoutContent & {
  formattedDate: string;
};

export default function TimelineEntry({ item }: { item: TimelineEntryItem }) {
  return (
    <li className="group relative">
      <div className="grid grid-cols-[auto_1fr_auto] items-start gap-4 px-4 py-8 transition-colors group-hover:bg-muted/40 md:gap-10 md:px-6 md:py-10">
        {/* Left: index + date */}
        <div className="flex w-20 flex-col items-start gap-1 md:w-28">
          <span className="font-victor-serif text-4xl leading-none font-semibold md:text-5xl">
            #{item.id.toString().padStart(3, "0")}
          </span>
          <time
            dateTime={new Date(item.created_at).toISOString()}
            className="font-mono text-xs text-muted-foreground md:text-sm"
          >
            {item.formattedDate}
          </time>
        </div>

        {/* Center: category, title, description, tags */}
        <div className="flex min-w-0 flex-col gap-3">
          <span className="font-mono text-xs font-medium tracking-widest text-muted-foreground uppercase">
            {item.category}
          </span>
          <h2 className="font-stabil-grotesk text-2xl leading-tight font-bold tracking-tight md:text-3xl">
            <Link
              href={`/timeline/${item.id}`}
              prefetch
              className="transition-colors before:absolute before:inset-0 hover:text-primary"
            >
              {item.title}
            </Link>
          </h2>
          <p className="line-clamp-2 text-sm text-muted-foreground md:text-base">
            {item.translation.description}
          </p>
          {(item.tags.length > 0 || item.article || item.playground) && (
            <div className="mt-1 flex flex-wrap items-center gap-2">
              {item.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {item.article && (
                <Link
                  href={item.article}
                  prefetch
                  className="relative z-1 inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:underline"
                >
                  Article
                  <ArrowUpRight className="size-3" />
                </Link>
              )}
              {item.playground && (
                <Link
                  href={item.playground}
                  prefetch
                  className="relative z-1 inline-flex items-center gap-0.5 text-xs font-medium text-primary hover:underline"
                >
                  Playground
                  <ArrowUpRight className="size-3" />
                </Link>
              )}
            </div>
          )}
        </div>

        {/* Right: arrow */}
        <ArrowUpRight
          aria-hidden="true"
          className="mt-2 size-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-foreground md:size-6"
        />
      </div>
    </li>
  );
}
