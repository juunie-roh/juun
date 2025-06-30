import localFont from "next/font/local";

export const geistSans = localFont({
  src: "GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const geistMono = localFont({
  src: "GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const antonio = localFont({
  src: "AntonioVF.ttf",
  variable: "--font-antonio",
  weight: "100 400 700",
});

export const rix = localFont({
  src: [
    {
      path: "./RixL.ttf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./RixM.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "./RixB.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-rix",
  weight: "300 500 700",
});
