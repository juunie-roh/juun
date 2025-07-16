import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Records of used technologies",
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <main className="min-h-screen px-4 py-8 md:px-8" tabIndex={-1}>
      {children}
    </main>
  );
}
