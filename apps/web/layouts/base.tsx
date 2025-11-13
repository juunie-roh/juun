import React from "react";

export default function BaseLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-[calc(100vh-var(--spacing-header))] px-4 py-8">
      {children}
    </div>
  );
}
