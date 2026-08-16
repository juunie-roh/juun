import type { Metadata } from "next";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { requireAdminSession } from "@/lib/server/session";

import SignOut from "./_components/sign-out";

export const metadata = {
  title: "Admin",
  robots: { index: false, follow: false },
} satisfies Metadata;

/**
 * The real authorization check.
 *
 * `proxy.ts` only sees whether a session cookie exists, which a forged cookie
 * satisfies. This validates the session against the database and re-applies
 * the allowlist. Every admin page and mutation must do the same.
 */
async function AdminContent() {
  const session = await requireAdminSession();

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <p className="text-sm text-muted-foreground">Signed in as</p>
        <p className="font-medium">{session.user.email}</p>
      </div>
      <SignOut />
    </div>
  );
}

export default function AdminPage() {
  return (
    <main className="mx-auto max-w-2xl px-4 py-12">
      <h1 className="mb-8 text-2xl font-semibold tracking-tight">Admin</h1>
      <Suspense fallback={<Skeleton className="h-24 w-full" />}>
        <AdminContent />
      </Suspense>
    </main>
  );
}
