import { Noto_Sans_KR } from "next/font/google";
import localFont from "next/font/local";

export const geistSans = localFont({
  src: "GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "variable",
  display: "swap",
});

export const geistMono = localFont({
  src: "GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "variable",
  display: "swap",
});

export const notoSansKR = Noto_Sans_KR({
  weight: "variable",
  variable: "--font-noto-sans-kr",
  subsets: ["latin"], // Korean loaded dynamically via unicode-range
  display: "swap",
});

export const attilaSansSharpTrial = localFont({
  src: "AttilaSansSharpTrial-Medium.otf",
  variable: "--font-attila-sans-sharp-trial",
  weight: "500",
});

export const victorNarrowTrial = localFont({
  src: "VictorNarrowTrial-Medium.otf",
  weight: "500",
  style: "normal",
  variable: "--font-victor-narrow-trial",
});

export const victorSerifTrial = localFont({
  src: [
    {
      path: "VictorSerifTrial-40Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "VictorSerifTrial-45RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  weight: "400",
  style: "normal italic",
  variable: "--font-victor-serif-trial",
});

export const stabilGroteskTrial = localFont({
  src: [
    {
      path: "./StabilGroteskTrial-Medium.otf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./StabilGroteskTrial-MediumItalic.otf",
      weight: "500",
      style: "italic",
    },
    {
      path: "./StabilGroteskTrial-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./StabilGroteskTrial-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-stabil-grotesk-trial",
  weight: "100 400 500 700",
  style: "normal italic",
  display: "block",
});
