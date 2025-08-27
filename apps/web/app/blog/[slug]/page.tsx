import { ScrollProgressBar } from "@juun/ui/scroll-progress-bar";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Fragment } from "react";

import { TableOfContents } from "../_components/table-of-contents";
import { getPosts } from "../_utils/post";

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = getPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

// Generate metadata for each slug
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  // Ensure params to be resolved
  const { slug } = await params;
  // Get all posts
  const posts = getPosts();
  // Find the specific post by slug
  const post = posts.find((post) => post.slug === slug);
  // If post not found, return basic metadata
  if (!post) {
    return {
      title: "Project Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  // Return metadata based on the post's metadata
  return {
    title: post.metadata.title,
    description:
      post.metadata.description || `Blog post: ${post.metadata.title}`,
    keywords: post.metadata.tags,
    openGraph: {
      type: "article",
      title: post.metadata.title,
      description:
        post.metadata.description || `Blog post: ${post.metadata.title}`,
      images: post.metadata.image,
      siteName: post.metadata.title,
      url: `https://juun.vercel.app/blog/${slug}`,
    },
  };
}

export default async function BlogItemPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // Ensure params to be resolved
  const { slug } = await params;
  // Get all posts
  const posts = getPosts();

  // Find the specific post by slug
  const post = posts.find((post) => post.slug === slug);

  // If post not found, show 404
  if (!post) {
    notFound();
  }

  // Dynamically import the post component
  const PostComponent = await import(`../_data/${slug}.tsx`)
    .then((module) => module.default)
    .catch(() => null);

  if (!PostComponent) {
    notFound();
  }

  return (
    <Fragment>
      <ScrollProgressBar />
      <div className="xl:hidden">
        <TableOfContents
          className="fixed right-5 top-20 z-40 mb-6 mt-2"
          contentSelector=".prose"
          headingSelector="h2, h3"
        />
      </div>

      <aside className="hidden xl:block" />
      <article className="xl:w-3xl mx-auto w-full max-w-3xl px-2 pb-20 pt-4 md:px-8">
        <PostComponent />
      </article>
      <aside className="hidden xl:block">
        <TableOfContents
          className="sticky left-0 top-1/4 max-w-64"
          contentSelector=".prose"
          headingSelector="h2, h3"
        />
      </aside>
    </Fragment>
  );
}
