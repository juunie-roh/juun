import { ScrollProgressBar } from "@juun/ui/scroll-progress-bar";

export default function BlogItemLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="relative">
      <ScrollProgressBar />
      {children}
    </main>
  );
}
