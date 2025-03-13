import localFont from 'next/font/local';

export const geistSans = localFont({
  src: 'GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

export const geistMono = localFont({
  src: 'GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const antonio = localFont({
  src: 'AntonioVF.ttf',
  variable: '--font-antonio',
  weight: '100 400 700',
});

export const rixBold = localFont({
  src: 'RixB.ttf',
  variable: '--font-rix-bold',
  weight: '700',
});

export const rixMedium = localFont({
  src: 'RixM.ttf',
  variable: '--font-rix-medium',
  weight: '500',
});

export const rixLight = localFont({
  src: 'RixL.ttf',
  variable: '--font-rix-light',
  weight: '300',
});
