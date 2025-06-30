export const metadata = {
  title: "Portfolio",
  description: "What I have made",
};

export default function PortfolioLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <main className="min-h-[50vh] p-8">{children}</main>;
}
