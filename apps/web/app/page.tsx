import Image from 'next/image';

import { BuildingLibrary, CityPlan, InfoCircleOutlined } from '@/assets/svgs';
// import BearCounter from '@/components/features/BearCounter';
// import BearCounterModal from '@/components/features/BearCounterModal';
// import ConfirmWheel from '@/components/wheel/ConfirmWheel';
// import FiveWheel from '@/components/wheel/FiveWheel';
// import FourWheel from '@/components/wheel/FourWheel';

export default function Home() {
  return (
    <div className="grid min-h-screen grid-rows-[20px_1fr_20px] place-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <main className="row-start-2 flex flex-col items-center gap-8 sm:items-start">
        <div className="flex items-center gap-2">
          <InfoCircleOutlined />
          <CityPlan
            viewBox="0 0 40 40"
            strokeWidth={0}
            fill="currentColor"
            className="size-[40px]"
          />
          <BuildingLibrary
            viewBox="0 0 40 40"
            fill="currentColor"
            strokeWidth={0}
            className="size-[40px]"
          />
        </div>
        <Image
          className="dark:invert"
          src="/images/lisbon/pig.png"
          alt="pig"
          width={180}
          height={38}
          priority
        />
        <ol className="list-inside list-decimal text-center font-[family-name:var(--font-geist-mono)] text-sm sm:text-left">
          <li className="mb-2">
            Get started by editing{' '}
            <code className="rounded bg-black/[.05] px-1 py-0.5 font-semibold dark:bg-white/[.06]">
              src/app/page.tsx
            </code>
            .
          </li>
          <li>Save and see your changes instantly.</li>
        </ol>
        {/* <BearCounter />
        <div className="flex w-full items-center justify-center">
          <BearCounterModal />
        </div> */}
        {/* <div className="flex w-full flex-col items-center justify-center md:flex-row">
          <ConfirmWheel />
          <FourWheel />
          <FiveWheel />
        </div> */}
      </main>
    </div>
  );
}
