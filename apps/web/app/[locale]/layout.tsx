import "@config/tailwind/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { Suspense } from "react";

import {
  geistMono,
  geistSans,
  notoSansKR,
  stabilGroteskTrial,
  victorSerifTrial,
} from "@/assets/fonts";
import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProvider from "@/contexts/theme-provider";
import { routing } from "@/i18n/routing";
import { validateParams } from "@/utils/server/validate";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function RootLayout({
  children,
  dialog,
  params,
}: LayoutProps<"/[locale]">) {
  const validated = await validateParams(params);
  if (!validated) return notFound();

  const { locale } = validated;
  // Enable static rendering
  setRequestLocale(locale);
  const messages = await getMessages({ locale });

  return (
    <html
      lang={locale}
      className={`${geistSans.variable} ${geistMono.variable} ${stabilGroteskTrial.variable} ${victorSerifTrial.variable} ${locale === "ko" ? notoSansKR.variable : ""} font-sans antialiased`}
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
