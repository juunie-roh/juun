import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Blog",
  description: "Records of used technologies",
};

export default function BlogLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="min-h-screen py-8" tabIndex={-1}>
      {children}
    </div>
  );
}
