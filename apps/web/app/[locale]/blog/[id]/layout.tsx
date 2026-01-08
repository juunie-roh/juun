import { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { ScrollProgressBar } from "@/components/ui/scroll-progress-bar";
import { BASE_URL } from "@/constants";
import BaseInnerLayout from "@/layouts/base-inner";
import cache from "@/lib/cache";

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
  const locale = await getLocale();
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

  const { title, description, category, image, tags, created_at, updated_at } =
    post;
  const url = `${BASE_URL}/${locale}/blog/${id}`;

  // Return metadata based on the post's metadata
  return {
    alternates: { canonical: url },

    title,
    description: description || `Blog post: ${title}`,
    keywords: tags,
    authors: [{ name: "Juun", url: "https://juun.vercel.app" }],

    openGraph: {
      type: "article",
      title,
      description: description || `Blog post: ${title}`,
      images: image
        ? [
            {
              url: image.startsWith("http") ? image : `${BASE_URL}${image}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : undefined,
      siteName: "Juun's Playground",
      url,
      tags,

      publishedTime: created_at.toISOString(),
      modifiedTime: updated_at.toISOString(),
      authors: ["Juun Roh"],
      section: category,
    },

    twitter: {
      card: "summary_large_image",
      title,
      description: description || `Blog post: ${title}`,
      // creator: "@juun_roh", // if you have a handle
      images: image
        ? [image.startsWith("http") ? image : `${BASE_URL}${image}`]
        : undefined,
    },
  };
}

export default function BlogItemLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative">
      <BaseInnerLayout>
        <ScrollProgressBar />
        <main>{children}</main>
      </BaseInnerLayout>
    </div>
  );
}
