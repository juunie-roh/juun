import { Metadata } from "next";

import BaseLayout from "@/layouts/base";

export const metadata: Metadata = {
  title: "Blog",
  description: "Records of experiments, learnings, achievements, analyses",
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <BaseLayout>
      <main className="mx-auto">{children}</main>
    </BaseLayout>
  );
}
