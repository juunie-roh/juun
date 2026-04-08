import "@config/tailwind/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import {
  attilaSansSharpTrial,
  geistMono,
  geistSans,
  notoSansKR,
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
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} ${stabilGroteskTrial.variable} ${victorNarrowTrial.variable} ${victorSerifTrial.variable} ${attilaSansSharpTrial.variable} font-sans antialiased`}
    >
      <body>
        <ThemeProvider>
          <Suspense fallback={null}>
            <NextIntlClientProvider locale={locale} messages={messages}>
              <TooltipProvider>
                <Header />
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
