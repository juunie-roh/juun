export const metadata = {
  title: "Portfolio",
  description: "What I have made",
};

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="min-h-[50vh] px-4 py-8 md:px-8">{children}</main>;
}
