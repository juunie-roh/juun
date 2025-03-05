export const metadata = {
  title: 'Blog',
  description: 'Records of used technologies',
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen p-8">
      {/* <h2 className="mb-8 text-2xl font-bold tracking-tighter">Portfolio</h2> */}
      {children}
    </main>
  );
}
