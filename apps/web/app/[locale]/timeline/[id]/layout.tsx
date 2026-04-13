import HeaderOffsetLayout from "@/layouts/header-offset";
import MaxWidthLayout from "@/layouts/max-width";

export default function TimelineDetailLayout({
  children,
}: LayoutProps<"/[locale]/timeline/[id]">) {
  return (
    <HeaderOffsetLayout>
      <MaxWidthLayout borderX>{children}</MaxWidthLayout>
    </HeaderOffsetLayout>
  );
}
