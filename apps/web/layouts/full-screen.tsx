import React from "react";

export default function FullScreenLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="relative h-[calc(100vh-var(--spacing-header))] w-full">
      {children}
    </div>
  );
}
