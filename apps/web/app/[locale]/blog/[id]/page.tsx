import type { Metadata } from "next";
import { notFound } from "next/navigation";

import cache from "@/lib/cache";
import md from "@/lib/server/md";
import {
  BASE_URL,
  getCanonicalUrl,
  getLanguageAlternates,
} from "@/utils/server/metadata";
import { validateParams } from "@/utils/server/validate";

import { BlogContent, BlogFooter, BlogHeader } from "./_components";

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
}: PageProps<"/[locale]/blog/[id]">): Promise<Metadata> {
  const validated = await validateParams(params);
  if (!validated) return {};

  const { id, locale } = validated;

  const post = await cache.post.select.byId(id, locale);

  if (!post) {
    return {
      title: "Article Not Found",
      description: "The requested blog post could not be found.",
    };
  }

  const path = `/blog/${id}`;
  const { title, category, image, tags, created_at, updated_at } = post;
  const { description } = post.translation;
  const canonicalUrl = getCanonicalUrl(locale, path);

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

export default async function BlogItemPage({
  params,
}: PageProps<"/[locale]/blog/[id]">) {
  const validated = await validateParams(params);
  if (!validated) return notFound();

  const { id, locale } = validated;

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
