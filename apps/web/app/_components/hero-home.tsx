export default function HeroHome() {
  return (
    <section
      role="banner"
      className="font-(family-name:--font-stabil-grotesk-trial) select-none"
    >
      <div className="bg-primary relative aspect-[32/9] max-h-96 w-full px-4">
        <div className="relative mx-auto size-full max-w-7xl overflow-hidden">
          <h1 className="text-background absolute bottom-0 right-0 translate-y-1/2 text-[20vw] tracking-tighter">
            Juun
          </h1>
          <div className="max-w-1/2 absolute bottom-4 left-0">
            <p className="font-(family-name:--font-victor-serif-trial) text-background text-sm italic md:text-xl lg:text-2xl">
              Technology-Agnostic Developer's Architecture Playground
            </p>
          </div>
        </div>
      </div>
      <div className="bg-background relative w-full px-4">
        <div className="relative mx-auto size-full max-w-7xl overflow-hidden border-b">
          <p
            className="text-primary absolute right-0 top-0 -translate-y-1/2 text-[20vw] tracking-tighter"
            aria-hidden="true"
          >
            Juun
          </p>
          <div className="max-w-1/2 my-4 min-h-[10vw]">
            <p className="font-(family-name:--font-victor-serif-trial) text-muted-foreground text-sm italic md:text-xl lg:text-2xl">
              Where modern web development meets real-world solutions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
