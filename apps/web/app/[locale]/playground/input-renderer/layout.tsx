import { Metadata } from "next";

import BaseInnerLayout from "@/layouts/base-inner";
import FullScreenLayout from "@/layouts/full-screen";
import HeaderOffsetLayout from "@/layouts/header-offset";

export const metadata: Metadata = {
  title: "Markdown Input Renderer",
  description:
    "Input renderer demonstration with custom content management system. Turns markdown input text into react component in real-time.",
  keywords: ["Markdown", "CMS", "Rendering", "Showcase"],
  openGraph: {
    type: "website",
    title: "Markdown Input Renderer",
    description:
      "Input renderer demonstration with custom content management system. Turns markdown input text into react component in real-time.",
    images: "/images/markdown-icon.png",
    siteName: "Markdown Input Renderer",
    url: "https://juun.vercel.app/playground/input-renderer",
  },
};

export default function InputRendererLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <HeaderOffsetLayout>
      <FullScreenLayout>
        <BaseInnerLayout>{children}</BaseInnerLayout>
      </FullScreenLayout>
    </HeaderOffsetLayout>
  );
}
