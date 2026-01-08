import "@config/tailwind/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
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
import {
  BASE_URL,
  getCanonicalUrl,
  getLanguageAlternates,
} from "@/utils/server/metadata";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("metadata./");
  const canonicalUrl = await getCanonicalUrl();
  const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),
    alternates: {
      canonical: canonicalUrl,
      languages: getLanguageAlternates(),
    },

    title: { template: t("title.template"), default: t("title.default") },
    description: t("description"),
    applicationName: t("applicationName"),
    authors: [{ name: "Juun", url: "https://github.com/juunie-roh/juun" }],
    // generator: "Next.js",
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
      title: { template: t("title.template"), default: t("title.default") },
      description: t("description"),
      siteName: t("openGraph.siteName"),
      images: [`${BASE_URL}/images/juun.png`],
      url: canonicalUrl,
    },

    twitter: {
      card: "summary_large_image",
      title: { template: t("title.template"), default: t("title.default") },
      description: t("description"),
      // creator: "@juun_roh", // if you have a Twitter handle
      images: [`${BASE_URL}/images/juun.png`],
    },

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    icons: {
      icon: "/favicon.ico",
      // shortcut: "/favicon-16x16.png",
      // apple: "/apple-touch-icon.png",
    },

    verification: {
      google: "DSWX9T0ryTPX662pi_ffZ-CXOJglx8olV7olIsOHfBg",
    },
  };

  return metadata;
}

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
