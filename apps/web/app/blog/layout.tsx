export const metadata = {
  title: 'Blog',
  description: 'Records of used technologies',
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen p-8" tabIndex={-1}>
      {children}
    </main>
  );
}
