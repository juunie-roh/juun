import { Marquee } from "@juun/ui/marquee";

import ConfirmWheel from "@/components/wheel/ConfirmWheel";
import FiveWheel from "@/components/wheel/FiveWheel";
import FourWheel from "@/components/wheel/FourWheel";

export default function Test() {
  return (
    <main className="relative w-full p-4">
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
      <div className="flex w-full flex-col items-center justify-center md:flex-row">
        <ConfirmWheel />
        <FourWheel />
        <FiveWheel />
      </div>
    </main>
  );
}
