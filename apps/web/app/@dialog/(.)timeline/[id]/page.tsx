import { notFound } from "next/navigation";

import { TIMELINE_ITEMS } from "@/app/timeline/_data";
import { TimelineDetailDialog } from "@/components/timeline/detail-dialog";
import md from "@/lib/md";

export default async function HomeTimelineDialog({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = TIMELINE_ITEMS.find((i) => i.id === parseInt(id));

  if (!item?.detail) notFound();

  const parsed = await md.parse(item.detail);

  return (
    <TimelineDetailDialog>
      <h2 className="text-2xl font-bold">{item.title}</h2>
      <p className="mb-4 text-sm text-muted-foreground">
        {item.category} • {item.date}
      </p>
      <div className="prose dark:prose-invert">{md.render(parsed)}</div>
    </TimelineDetailDialog>
  );
}

export async function generateStaticParams() {
  return TIMELINE_ITEMS.filter((item) => item.detail).map((item) => ({
    id: item.id.toString(),
  }));
}
