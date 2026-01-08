import type { Post } from "@juun/db/post";
import { notFound } from "next/navigation";

import cache from "@/lib/cache";
import md from "@/lib/server/md";

import BlogContent from "../_components/article/content";
import BlogFooter from "../_components/article/footer";
import BlogHeader from "../_components/article/header";

export default async function BlogItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Ensure params to be resolved
  const { id } = await params;
  // Get all posts
  const post = await cache.post.get.byId(Number(id));
  // If post not found, show 404
  if (!post) notFound();

  const metadata: Omit<
    Post,
    "id" | "content" | "category" | "word_count" | "created_at"
  > = {
    title: post.title,
    description: post.description,
    updated_at: post.updated_at,
    tags: post.tags,
    image: post.image,
  };

  const parsed = await md.parse(post.content);

  return (
    <article className="relative">
      <BlogHeader metadata={metadata} />
      <BlogContent>{md.render(parsed)}</BlogContent>
      <BlogFooter metadata={metadata} />
    </article>
  );
}
