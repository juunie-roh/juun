import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { BlogPostLayout } from '@/components/blog/post-layout';

import { getPosts } from '../blog.utils';

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
      title: 'Project Not Found',
      description: 'The requested portfolio project could not be found.',
    };
  }

  // Return metadata based on the post's metadata
  return {
    title: post.metadata.title,
    description:
      post.metadata.description || `Portfolio project: ${post.metadata.title}`,
    keywords: post.metadata.tags,
    openGraph: {
      type: 'article',
      title: post.metadata.title,
      description:
        post.metadata.description ||
        `Portfolio project: ${post.metadata.title}`,
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
  const PostComponent = await import(`../posts/${slug}.tsx`)
    .then((module) => module.default)
    .catch(() => {
      // If import fails, we'll return null and handle it in the JSX
      return null;
    });

  if (!PostComponent) {
    notFound();
  }

  return (
    <BlogPostLayout>
      <article className="mx-auto max-w-3xl">
        <PostComponent />
      </article>
    </BlogPostLayout>
  );
}
