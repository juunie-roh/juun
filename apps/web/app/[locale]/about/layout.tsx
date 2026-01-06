import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description: "About this learning laboratory playground",
  openGraph: {
    type: "website",
    title: "About",
    description: "About this learning laboratory playground",
    siteName: `Juun - About`,
    images: ["/images/juun.png"],
    url: "https://juun.vercel.app/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main>{children}</main>;
}
