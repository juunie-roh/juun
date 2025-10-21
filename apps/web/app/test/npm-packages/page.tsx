import { notFound } from "next/navigation";

import BlogContent from "@/app/blog/_components/content";
import BlogFooter from "@/app/blog/_components/footer";
import BlogHeader from "@/app/blog/_components/header";
import { BlogMetadata } from "@/app/blog/_utils/post";
import cache from "@/lib/cache";
import md from "@/lib/md";

export default async function NpmMdDemo() {
  const result = await cache.post.get.bySlug("npm-packages");
  if (result === null) return notFound();

  const metadata: BlogMetadata = {
    title: result.title,
    description: result.description,
    date: result.created_at,
    tags: result.tags,
    image: result.image,
  };

  const parsed = await md.parse(result.content);

  return (
    <main className="relative">
      <BlogHeader metadata={metadata} />
      <BlogContent>{md.render(parsed)}</BlogContent>
      <BlogFooter metadata={metadata} />
    </main>
  );
}
