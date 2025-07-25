import "@config/tailwind/globals.css";

import type { Metadata } from "next";

import { geistMono, geistSans, rix } from "@/assets/fonts";

export const metadata: Metadata = {
  title: "Juun | Cesium Utils Demo",
  description: "NextJS Application with Tailwind CSS and shadcn/ui",
  applicationName: `Juun's App`,
  authors: [{ name: "Juun", url: "https://github.com/juunie-roh" }],
  generator: "Next.js",
  keywords: [
    "react",
    "server components",
    "ssr",
    "Juun",
    "monorepo",
    "turborepo",
    "tailwindcss",
    "shadcn/ui",
    "next",
  ],
  // openGraph: {
  //   type: "website",
  //   title: {
  //     template: "Juun | %s",
  //     default: "Juun",
  //   },
  //   description: "NextJS Application with Tailwind CSS and shadcn/ui",
  //   siteName: `Juun's App`,
  //   images: ["/images/open-graph-template.png"],
  //   url: "https://juun.vercel.app",
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isMultiZone =
    process.env.NODE_ENV === "production" &&
    process.env.MULTI_ZONE_ENABLED === "true";

  if (isMultiZone) return <>{children}</>;

  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${rix.variable} font-sans antialiased [--header-height:calc(--spacing(18))]`}
      >
        {children}
      </body>
    </html>
  );
}
