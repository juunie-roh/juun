import { readFile } from "fs/promises";
import { join } from "path";

import { BlogHeader } from "@/app/blog/_components/header";
import { BlogMetadata } from "@/app/blog/_utils/post";
import { MarkdownRenderer } from "@/components/md/renderer";
import md from "@/lib/md";

export default async function YarnBerryMarkdownDemo() {
  const markdownPath = join(process.cwd(), "app/test/test-md/yarn-berry.md");
  const markdownSource = await readFile(markdownPath, "utf-8");

  const { html, data } = await md.parse(markdownSource);

  return (
    <article className="xl:w-3xl mx-auto w-full max-w-3xl px-2 pb-20 pt-4 md:px-8">
      <BlogHeader metadata={data as BlogMetadata} />
      <MarkdownRenderer html={html} />
    </article>
  );
}
