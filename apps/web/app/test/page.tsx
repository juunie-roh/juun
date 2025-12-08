import { Separator } from "@juun/ui/separator";

export default function TestHero() {
  return (
    <section role="banner" className="bg-primary">
      <div className="relative isolate grid grid-cols-responsive">
        {/* top right box */}
        <aside className="absolute z-1 col-span-5 -col-start-5 h-[30vh] w-full bg-accent px-3 py-4">
          first box
        </aside>
        <Separator className="absolute top-20 -left-[50vw] w-[200vw]! bg-muted-foreground lg:top-[30vh]" />

        <div className="absolute top-20 col-span-7 col-start-2 flex flex-col lg:top-[30vh] lg:col-start-3 lg:-translate-y-1/2">
          <div className="w-full font-(family-name:--font-attila-sans-sharp-trial) text-base leading-6 text-wrap text-background md:text-lg lg:text-2xl">
            Technology-Agnostic
          </div>
          <div className="w-full font-(family-name:--font-attila-sans-sharp-trial) text-base leading-6 text-wrap text-background md:text-lg lg:text-2xl">
            Architectural Playground
          </div>
        </div>

        <div className="col-span-10 col-start-2 h-full border-x border-muted-foreground lg:col-start-3">
          <div className="relative flex size-full h-[calc(100vh-var(--spacing-header)-1px)] border-collapse flex-col justify-center text-background">
            <div className="relative">
              <Separator className="absolute -top-[17px] -left-[50vw] w-[200vw]! bg-muted-foreground lg:-top-[2.6vw]" />
              <h1 className="origin-left scale-250 font-stabil-grotesk text-3xl leading-3.5 font-bold tracking-tight lg:scale-400 lg:text-[min(2.75vw-6px,1.375vw+15px)]">
                Juun
              </h1>
              <Separator className="absolute -bottom-[23px] -left-[50vw] w-[200vw]! bg-muted-foreground lg:-bottom-[3.2vw]" />
            </div>
          </div>
        </div>

        <Separator className="absolute bottom-20 -left-[50vw] w-[200vw]! bg-muted-foreground lg:bottom-[30vh]" />
        {/* bottom right box */}
        <aside className="absolute bottom-0 z-1 col-span-3 col-start-9 h-[30vh] w-full bg-accent px-3 py-4 lg:col-start-10">
          second box
        </aside>
      </div>
    </section>
  );
}
