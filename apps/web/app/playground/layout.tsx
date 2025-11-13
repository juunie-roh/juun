import { Metadata } from "next";

import BaseLayout from "@/layouts/base";

export const metadata: Metadata = {
  title: "Playground",
  description: "Experimented or experimenting technologies",
};

export default function PlaygroundLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <BaseLayout>
      <main className="space-y-12">{children}</main>
    </BaseLayout>
  );
}
