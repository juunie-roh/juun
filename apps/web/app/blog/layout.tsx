import { Metadata } from "next";

import FullScreenLayout from "@/layouts/full-screen";
import PaddingTopHeaderLayout from "@/layouts/padding-top-header";

export const metadata: Metadata = {
  title: "Blog",
  description: "Records of experiments, learnings, achievements, analyses",
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <PaddingTopHeaderLayout>
      <FullScreenLayout>
        <main className="mx-auto">{children}</main>
      </FullScreenLayout>
    </PaddingTopHeaderLayout>
  );
}
