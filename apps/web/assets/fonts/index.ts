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

export const attilaSansSharpTrial = localFont({
  src: "AttilaSansSharpTrial-Medium.otf",
  variable: "--font-attila-sans-sharp-trial",
  weight: "500",
});

export const rix = localFont({
  src: [
    { path: "./RixL.ttf", weight: "300", style: "normal" },
    { path: "./RixM.ttf", weight: "500", style: "normal" },
    { path: "./RixB.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-rix",
  weight: "300 500 700",
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
      path: "./StabilGroteskTrial-Hairline.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "./StabilGroteskTrial-HairlineItalic.otf",
      weight: "100",
      style: "italic",
    },
    {
      path: "./StabilGroteskTrial-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./StabilGroteskTrial-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
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
});
