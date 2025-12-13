import "@config/tailwind/globals.css";

import { Toaster } from "@juun/ui/sonner";
import { TooltipProvider } from "@juun/ui/tooltip";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";

import {
  antonio,
  attilaSansSharpTrial,
  geistMono,
  geistSans,
  rix,
  stabilGroteskTrial,
  victorNarrowTrial,
  victorSerifTrial,
} from "@/assets/fonts";
import Header from "@/components/header";

import ThemeProvider from "./_contexts/theme-provider";

export const metadata: Metadata = {
  title: {
    template: "Juun | %s",
    default: "Juun",
  },
  description:
    "Technology-agnostic developer's architecture playground where modern web development meets real-world solutions",
  applicationName: `Juun's Playground`,
  authors: [{ name: "Juun", url: "https://github.com/juunie-roh/juun" }],
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
  openGraph: {
    type: "website",
    title: {
      template: "Juun | %s",
      default: "Juun",
    },
    description:
      "Technology-agnostic developer's architecture playground where modern web development meets real-world solutions",
    siteName: `Juun's Playground`,
    images: ["/images/juun.png"],
    url: "https://juun.vercel.app",
  },
};

export default function RootLayout({
  children,
  dialog,
}: Readonly<{
  children: React.ReactNode;
  dialog: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta
          name="google-site-verification"
          content="DSWX9T0ryTPX662pi_ffZ-CXOJglx8olV7olIsOHfBg"
        />
      </head>
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${antonio.variable} ${rix.variable} ${stabilGroteskTrial.variable} ${victorNarrowTrial.variable} ${victorSerifTrial.variable} ${attilaSansSharpTrial.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <NextIntlClientProvider>
            <TooltipProvider>
              <Header />
              {children}
              {dialog}
              <Toaster />
              <Analytics />
            </TooltipProvider>
          </NextIntlClientProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
