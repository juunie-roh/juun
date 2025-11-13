import { ScrollProgressBar } from "@juun/ui/scroll-progress-bar";

export default function BlogItemLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative">
      <ScrollProgressBar />
      <main>{children}</main>
    </div>
  );
}
