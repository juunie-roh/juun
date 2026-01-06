import "@config/tailwind/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

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
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProvider from "@/contexts/theme-provider";
import { routing } from "@/i18n/routing";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  title: {
    template: "Juun | %s",
    default: "Juun",
  },
  description: "Technology-agnostic architectural playground",
  applicationName: `Juun's Playground`,
  authors: [{ name: "Juun", url: "https://github.com/juunie-roh/juun" }],
  generator: "Next.js",
  keywords: [
    "react",
    "server components",
    "ssr",
    "Juun",
    "playground",
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
    description: "Technology-agnostic architectural playground",
    siteName: "Juun",
    images: ["/images/juun.png"],
    url: "https://juun.vercel.app",
  },
};

export default async function RootLayout({
  children,
  dialog,
  params,
}: Readonly<{
  children: React.ReactNode;
  dialog: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }
  // Enable static rendering
  setRequestLocale(locale);

  return (
    <html lang={locale}>
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
          <Suspense fallback={null}>
            <NextIntlClientProvider>
              <TooltipProvider>
                <Suspense fallback={null}>
                  <Header />
                </Suspense>
                {children}
                {dialog}
                <Toaster />
                <Analytics />
              </TooltipProvider>
            </NextIntlClientProvider>
          </Suspense>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
