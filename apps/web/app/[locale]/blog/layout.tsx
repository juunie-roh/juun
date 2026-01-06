import { Metadata } from "next";

import HeaderOffsetLayout from "@/layouts/header-offset";

export const metadata: Metadata = {
  title: "Blog",
  description: "Records of experiments, learnings, achievements, analyses",
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HeaderOffsetLayout>
      <main className="mx-auto">{children}</main>
    </HeaderOffsetLayout>
  );
}
