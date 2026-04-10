import { ScrollProgressBar } from "@/components/ui/scroll-progress-bar";
import BaseInnerLayout from "@/layouts/base-inner";

export default function BlogItemLayout({
  children,
}: LayoutProps<"/[locale]/blog/[id]">) {
  return (
    <div className="relative">
      <BaseInnerLayout>
        <ScrollProgressBar />
        {children}
      </BaseInnerLayout>
    </div>
  );
}
