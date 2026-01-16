import { Metadata } from "next";
import { getLocale } from "next-intl/server";

import { ScrollProgressBar } from "@/components/ui/scroll-progress-bar";
import BaseInnerLayout from "@/layouts/base-inner";
import cache from "@/lib/cache";
import {
  BASE_URL,
  getCanonicalUrl,
  getLanguageAlternates,
} from "@/utils/server/metadata";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const posts = await cache.post.select.all();
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
  const { id } = await params;

  const posts = await cache.post.select.all(locale);
  const post = posts.find((post) => post.id === Number(id));

  if (!post) {
    return {
      title: "Project Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const path = `/blog/${id}`;
  const { title, category, image, tags, created_at, updated_at } = post;
  const { description } = post.translation;
  const canonicalUrl = await getCanonicalUrl(path);

  return {
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(path),
    },

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
      url: canonicalUrl,
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
