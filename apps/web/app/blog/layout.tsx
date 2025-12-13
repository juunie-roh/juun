import { Metadata } from "next";

import BaseLayout from "@/layouts/base";
import FullScreenLayout from "@/layouts/full-screen";

export const metadata: Metadata = {
  title: "Blog",
  description: "Records of experiments, learnings, achievements, analyses",
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <BaseLayout>
      <FullScreenLayout>
        <main className="mx-auto">{children}</main>
      </FullScreenLayout>
    </BaseLayout>
  );
}
