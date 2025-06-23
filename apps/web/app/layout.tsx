import '@config/tailwind/styles';

import { Toaster } from '@pkg/ui/sonner';
import { TooltipProvider } from '@pkg/ui/tooltip';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import { geistMono, geistSans, rix } from '@/assets/fonts';
import { Header } from '@/components/header';
import ThemeProvider from '@/components/theme/provider';

export const metadata: Metadata = {
  title: {
    template: 'Juun | %s',
    default: 'Juun',
  },
  description: 'NextJS Application with Tailwind CSS and shadcn/ui',
  applicationName: `Juun's App`,
  authors: [{ name: 'Juun', url: 'https://github.com/juunie-roh/juun' }],
  generator: 'Next.js',
  keywords: [
    'react',
    'server components',
    'ssr',
    'Juun',
    'monorepo',
    'turborepo',
    'tailwindcss',
    'shadcn/ui',
    'next',
  ],
  openGraph: {
    type: 'website',
    title: {
      template: 'Juun | %s',
      default: 'Juun',
    },
    description: 'NextJS Application with Tailwind CSS and shadcn/ui',
    siteName: `Juun's App`,
    images: ['/images/open-graph-template.png'],
    url: 'https://juun.vercel.app',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} ${rix.variable} font-sans antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <TooltipProvider>
            <Header />
            {children}
            <Toaster />
            <Analytics />
          </TooltipProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
