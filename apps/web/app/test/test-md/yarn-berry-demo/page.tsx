import { readFile } from "fs/promises";
import { join } from "path";

import BlogContent from "@/app/blog/_components/content";
import BlogFooter from "@/app/blog/_components/footer";
import BlogHeader from "@/app/blog/_components/header";
import { BlogMetadata } from "@/app/blog/_utils/post";
import { MarkdownRenderer } from "@/components/md/renderer";
import md from "@/lib/md";

export default async function YarnBerryMarkdownDemo() {
  const markdownPath = join(process.cwd(), "app/test/test-md/yarn-berry.md");
  const markdownSource = await readFile(markdownPath, "utf-8");

  const { html, data } = await md.parse(markdownSource);

  return (
    <main className="relative">
      <BlogHeader metadata={data as BlogMetadata} />
      <BlogContent>
        <MarkdownRenderer html={html} />
      </BlogContent>
      <BlogFooter metadata={data as BlogMetadata} />
    </main>
  );
}
