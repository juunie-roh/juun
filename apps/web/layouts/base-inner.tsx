import React from "react";

export default function BaseInnerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="size-full px-4 py-8">{children}</div>;
}
