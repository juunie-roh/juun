export const metadata = {
  title: 'Portfolio',
  description: 'What I have made',
};

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen px-8 py-20 lg:pt-24">
      {/* <h2 className="mb-8 text-2xl font-bold tracking-tighter">Portfolio</h2> */}
      {children}
    </main>
  );
}
