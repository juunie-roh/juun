import type { Metadata } from "next";
import { notFound } from "next/navigation";

import cache from "@/lib/cache";
import md from "@/lib/md";

import BlogContent from "../_components/article/content";
import BlogFooter from "../_components/article/footer";
import BlogHeader from "../_components/article/header";

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await cache.post.get.all();
  return posts.map((post) => ({
    id: post.id.toString(),
  }));
}

// Generate metadata for each slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  // Ensure params to be resolved
  const { id } = await params;
  // Get all posts
  const posts = await cache.post.get.all();
  // Find the specific post by slug
  const post = posts.find((post) => post.id === Number(id));
  // If post not found, return basic metadata
  if (!post) {
    return {
      title: "Project Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  // Return metadata based on the post's metadata
  return {
    title: post.title,
    description: post.description || `Blog post: ${post.title}`,
    keywords: post.tags,
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description || `Blog post: ${post.title}`,
      images: post.image,
      siteName: post.title,
      url: `https://juun.vercel.app/blog/${id}`,
    },
  };
}

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
    cache.post.Metadata,
    "id" | "category" | "word_count" | "created_at"
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
