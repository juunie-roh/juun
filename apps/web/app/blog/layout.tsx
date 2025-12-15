import { Metadata } from "next";

import FullScreenLayout from "@/layouts/full-screen";
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
      <FullScreenLayout>
        <main className="mx-auto">{children}</main>
      </FullScreenLayout>
    </HeaderOffsetLayout>
  );
}
