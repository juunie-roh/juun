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
  description: 'NextJS Boilerplate with Tailwind CSS and shadcn/ui',
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
