import { ViewerProvider } from "../_contexts";

export default function CesiumApiLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <ViewerProvider>{children}</ViewerProvider>;
}
