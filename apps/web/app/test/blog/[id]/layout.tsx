export default function BlogItemLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="relative">{children}</main>;
}
