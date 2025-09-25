import { Metadata } from "next";
import { Fragment } from "react";

export const metadata: Metadata = {
  title: "About",
  description:
    "Technology-agnostic developer's architecture playground where modern web development meets real-world solutions",
  openGraph: {
    type: "website",
    title: "About",
    description:
      "Technology-agnostic developer's architecture playground where modern web development meets real-world solutions",
    siteName: `Juun - About`,
    images: ["/images/open-graph-template.png"],
    url: "https://juun.vercel.app/about",
  },
};

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <header className="font-(family-name:--font-stabil-grotesk-trial) select-none">
        <div className="bg-primary relative aspect-[32/9] max-h-96 w-full px-4">
          <div className="relative mx-auto size-full max-w-7xl overflow-hidden">
            <h1 className="text-background absolute bottom-0 left-0 shrink-0 text-[12vw] tracking-tighter">
              About
            </h1>
            <div className="font-(family-name:--font-victor-serif-trial) text-muted-foreground absolute right-0 top-4 text-right text-sm italic md:text-xl lg:text-3xl">
              <p>Technology-Agnostic Developer's</p>
              <p>Architecture Playground</p>
            </div>
            <p
              className="text-background absolute bottom-0 right-0 translate-y-1/2 text-[20vw] tracking-tighter"
              aria-label="About Juun"
            >
              Juun
            </p>
          </div>
        </div>
        <div className="bg-background relative w-full px-4">
          <div className="relative mx-auto size-full max-w-7xl overflow-hidden">
            <p
              className="text-primary absolute right-0 top-0 -translate-y-1/2 text-[20vw] tracking-tighter"
              aria-hidden="true"
            >
              Juun
            </p>
            <h2 className="font-(family-name:--font-victor-serif-trial) text-muted-foreground max-w-1/2 mt-4 min-h-[10vw] text-sm md:text-xl lg:text-3xl">
              Where modern web development meets real-world solutions
            </h2>
          </div>
        </div>
      </header>
      <main className="max-w-7xl px-4">{children}</main>
    </Fragment>
  );
}
