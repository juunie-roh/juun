export default function BlogItemLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="relative grid min-h-screen w-full grid-cols-1 xl:grid-cols-[1fr_min-content_1fr]">
      {children}
    </div>
  );
}
