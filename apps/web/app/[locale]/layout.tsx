import "@config/tailwind/globals.css";

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import type { Metadata } from "next";
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
import { BASE_URL } from "@/utils/server/metadata";
import { validateParams } from "@/utils/server/validate";

/**
 * Resolves every relative OG/Twitter image path in the tree below this layout.
 *
 * Without `metadataBase` Next falls back to `VERCEL_URL`, which is the
 * per-deployment host (`juun-abc123.vercel.app`) rather than the canonical
 * domain - so preview URLs end up baked into production social tags. Setting
 * it here rather than per-page means new routes inherit it by default.
 */
export const metadata = {
  metadataBase: new URL(BASE_URL),
} satisfies Metadata;

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
      className={`${geistSans.variable} ${geistMono.variable} ${stabilGroteskTrial.variable} ${victorSerifTrial.variable} ${notoSansKR.variable} font-sans antialiased`}
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
