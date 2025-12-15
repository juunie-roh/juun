import React from "react";

export default function HeaderOffsetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="pt-header">{children}</div>;
}
