import { notFound } from "next/navigation";
import { getLocale } from "next-intl/server";

import cache from "@/lib/cache";
import md from "@/lib/server/md";
import { validateId } from "@/utils/validation";

import { BlogContent, BlogFooter, BlogHeader } from "./_components";

export default async function BlogItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = validateId((await params).id);
  if (!id) notFound();

  const locale = await getLocale();

  const post = await cache.post.select.byId(id, locale);
  if (!post) notFound();

  // Flatten translation fields for article components
  const metadata = {
    title: post.title,
    description: post.translation.description,
    updated_at: post.updated_at,
    tags: post.tags,
    image: post.image,
  };

  const parsed = await md.parse(post.translation.content);

  return (
    <article className="relative">
      <BlogHeader metadata={metadata} />
      <BlogContent>{md.render(parsed)}</BlogContent>
      <BlogFooter metadata={metadata} />
    </article>
  );
}
