import '@juun/config/tailwind/styles';

import { SpeedInsights } from '@vercel/speed-insights/next';
import type { Metadata } from 'next';

import { geistMono, geistSans } from '@/assets/fonts';
import { Header } from '@/components/header';
import ThemeProvider from '@/components/theme/provider';

export const metadata: Metadata = {
  title: {
    template: 'Juun | %s',
    default: 'Juun',
  },
  description: 'NextJS Application with Tailwind CSS and shadcn/ui',
  applicationName: `Juun's App`,
  authors: [{ name: 'Juun', url: '' }],
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
    images: ['/images/lisbon/pig.png'],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
