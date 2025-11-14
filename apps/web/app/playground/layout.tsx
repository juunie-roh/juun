import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Playground",
  description: "Experimented or experimenting technologies",
};

export default function PlaygroundLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <div>{children}</div>;
}
