import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "Technology-agnostic developer's architecture playground where modern web development meets real-world solutions",
  openGraph: {
    type: "website",
    title: "About",
    description:
      "Technology-agnostic developer's architecture playground where modern web development meets real-world solutions",
    siteName: `Juun - About`,
    images: ["/images/open-graph-template.png"],
    url: "https://juun.vercel.app/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main>{children}</main>;
}
