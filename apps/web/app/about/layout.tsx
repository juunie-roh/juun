import { Fragment } from "react";

export default function AboutLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <Fragment>
      <div className="bg-primary relative aspect-[32/9] max-h-96 w-full px-4">
        <div className="relative mx-auto size-full max-w-7xl overflow-hidden">
          <p className="text-background absolute bottom-0 left-0 shrink-0 text-[12vw] tracking-tight">
            About
          </p>
          <p
            className={`text-background absolute right-0 top-4 text-lg italic`}
          >
            Technology-Agnostic Developer
          </p>
          <p className="text-background absolute bottom-0 right-0 translate-y-1/2 text-[20vw] tracking-tight">
            Juun
          </p>
        </div>
      </div>
      <div className="bg-background relative aspect-[32/9] max-h-80 w-full px-4">
        <div className="relative mx-auto size-full max-w-7xl overflow-hidden">
          <p className="text-primary absolute right-0 top-0 -translate-y-1/2 text-[20vw] tracking-tight">
            Juun
          </p>
          <p className="text-muted-foreground max-w-1/2 md:text-xl">
            A modern Next.js monorepo template with complete UI system, state
            management, and developer tooling.
          </p>
        </div>
      </div>
      <div className="px-2">{children}</div>
    </Fragment>
  );
}
