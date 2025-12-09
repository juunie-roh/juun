import { Button } from "@juun/ui/button";
import { ChevronLeft } from "lucide-react";
import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

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
      <Button asChild>
        <Link href="/">
          <ChevronLeft />
          Return
        </Link>
      </Button>

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

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const item = TIMELINE_ITEMS.find((item) => item.id === parseInt(id));

  if (!item) return {} satisfies Metadata;

  return {
    title: item.title,
    description: item.description,
    keywords: item.tags,
    openGraph: {
      type: "article",
      title: item.title,
      description: item.description,
      siteName: `Juun - Timeline Detail`,
      images: ["/images/juun.png"],
      url: `https://juun.vercel.app/timeline/${item.id}`,
    },
  } satisfies Metadata;
}
