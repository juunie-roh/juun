import React from "react";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pt-header">{children}</div>;
}
