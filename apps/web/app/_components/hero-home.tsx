export default function HeroHome() {
  return (
    <section
      role="banner"
      className="font-(family-name:--font-stabil-grotesk-trial) select-none"
    >
      <div className="relative aspect-[32/9] max-h-96 w-full bg-primary px-4">
        <div className="relative mx-auto size-full max-w-7xl overflow-hidden">
          <h1 className="absolute right-0 bottom-0 translate-y-1/2 text-[20vw] tracking-tighter text-background">
            Juun
          </h1>
          <div className="absolute bottom-4 left-0 max-w-1/2">
            <p className="font-(family-name:--font-victor-serif-trial) text-sm text-background italic md:text-xl lg:text-2xl">
              Technology-Agnostic Developer's Architecture Playground
            </p>
          </div>
        </div>
      </div>
      <div className="relative w-full bg-background px-4">
        <div className="relative mx-auto size-full max-w-7xl overflow-hidden border-b">
          <p
            className="absolute top-0 right-0 -translate-y-1/2 text-[20vw] tracking-tighter text-primary"
            aria-hidden="true"
          >
            Juun
          </p>
          <div className="my-4 min-h-[10vw] max-w-1/2">
            <p className="font-(family-name:--font-victor-serif-trial) text-sm text-muted-foreground italic md:text-xl lg:text-2xl">
              Where modern web development meets real-world solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
