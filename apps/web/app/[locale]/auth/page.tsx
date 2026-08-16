import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";

import { Skeleton } from "@/components/ui/skeleton";
import { getAdminSession } from "@/lib/server/session";

import SignIn from "./_components/sign-in";

export const metadata = {
  title: "Sign in",
  // Never index the sign-in page.
  robots: { index: false, follow: false },
} satisfies Metadata;

interface SignInPageProps {
  searchParams: Promise<{ redirect?: string }>;
}

/**
 * Reads `searchParams` and the session, both of which are runtime data.
 *
 * `cacheComponents` is enabled, so this has to sit inside a Suspense boundary:
 * awaiting request data directly in the page would make the whole route
 * un-cacheable and block navigation on a server round-trip.
 */
async function SignInAction({ searchParams }: SignInPageProps) {
  const { redirect: requested } = await searchParams;

  // Only allow same-origin relative paths. Without this an attacker could send
  // `/auth?redirect=https://evil.example` and use the post-login redirect as
  // an open redirect off the back of a trusted domain.
  const callbackURL =
    requested?.startsWith("/") && !requested.startsWith("//")
      ? requested
      : "/admin";

  // Already signed in and allowlisted - skip the button entirely.
  const session = await getAdminSession();
  if (session) redirect(callbackURL);

  return <SignIn callbackURL={callbackURL} />;
}

export default function SignInPage({ searchParams }: SignInPageProps) {
  return (
    <main className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="w-full max-w-sm space-y-6">
        {/* Static shell - pre-rendered, so the page paints instantly. */}
        <div className="space-y-2">
          <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
          <p className="text-sm text-muted-foreground">
            Admin access only. Sign in with the allowlisted Google account.
          </p>
        </div>
        <Suspense fallback={<Skeleton className="h-10 w-full" />}>
          <SignInAction searchParams={searchParams} />
        </Suspense>
      </div>
    </main>
  );
}
