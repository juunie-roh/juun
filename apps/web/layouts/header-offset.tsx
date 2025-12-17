import React from "react";

export default function HeaderOffsetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="size-full pt-header">{children}</div>;
}
