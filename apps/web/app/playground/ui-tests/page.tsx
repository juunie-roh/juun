import { Marquee } from "@juun/ui/marquee";

import ConfirmWheel from "@/components/wheel/ConfirmWheel";
import FiveWheel from "@/components/wheel/FiveWheel";
import FourWheel from "@/components/wheel/FourWheel";

export default function UITestPage() {
  return (
    <main className="relative w-full">
      <h2 className="px-4 py-8 text-3xl font-bold tracking-tighter">
        Infinite Scroll Animation Component
      </h2>
      <Marquee>
        <span className="mx-4 text-4xl">Marquee Item 1</span>
        <span className="mx-4 text-4xl">Marquee Item 2</span>
        <span className="mx-4 text-4xl">Marquee Item 3</span>
        <span className="mx-4 text-4xl">Marquee Item 4</span>
        <span className="mx-4 text-4xl">Marquee Item 5</span>
      </Marquee>
      <Marquee direction="right">
        <span className="mx-4 text-4xl">Marquee Item 1</span>
        <span className="mx-4 text-4xl">Marquee Item 2</span>
        <span className="mx-4 text-4xl">Marquee Item 3</span>
        <span className="mx-4 text-4xl">Marquee Item 4</span>
        <span className="mx-4 text-4xl">Marquee Item 5</span>
      </Marquee>
      <h2 className="px-4 py-8 text-3xl font-bold tracking-tighter">
        Wheel Interface for 3D Scene Interaction
      </h2>
      <div className="flex w-full flex-col items-center justify-center md:flex-row">
        <ConfirmWheel />
        <FourWheel />
        <FiveWheel />
      </div>
    </main>
  );
}
