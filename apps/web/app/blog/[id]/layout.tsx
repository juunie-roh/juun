import { ScrollProgressBar } from "@juun/ui/scroll-progress-bar";

import BaseInnerLayout from "@/layouts/base-inner";

export default function BlogItemLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative">
      <BaseInnerLayout>
        <ScrollProgressBar />
        <main>{children}</main>
      </BaseInnerLayout>
    </div>
  );
}
