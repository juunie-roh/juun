import { ChevronLeft } from "lucide-react";
import { notFound } from "next/navigation";

import NavigationBackButton from "@/components/navigation/back";
import md from "@/lib/md";

import { TIMELINE_ITEMS } from "../_data";

export default async function TimelineDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const item = TIMELINE_ITEMS.find((i) => i.id === parseInt(id));

  if (!item) notFound();

  const parsed = await md.parse(item.detail);

  return (
    <article className="mx-auto max-w-4xl p-8">
      <NavigationBackButton>
        <ChevronLeft />
        Back
      </NavigationBackButton>

      <header className="mb-8">
        <h1 className="mb-2 text-4xl font-bold">{item.title}</h1>
        <p className="text-muted-foreground">
          {item.category} • {item.date}
        </p>
      </header>

      <div className="prose max-w-none dark:prose-invert">
        {md.render(parsed)}
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  return TIMELINE_ITEMS.filter((item) => item.detail).map((item) => ({
    id: item.id.toString(),
  }));
}
