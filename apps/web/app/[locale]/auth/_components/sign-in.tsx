"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

interface GoogleSignInProps {
  /**
   * Path to return to after a successful sign-in.
   */
  callbackURL: string;
}

export default function GoogleSignIn({ callbackURL }: GoogleSignInProps) {
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // This call is what makes the OAuth flow valid: Better Auth generates the
  // `state`, persists it, and only then redirects to Google. Reaching the
  // callback without it is what produces "State not found in OAuth callback".
  const handleSignIn = async () => {
    setPending(true);
    setError(null);

    const { error } = await authClient.signIn.social({
      provider: "google",
      callbackURL,
    });

    if (error) {
      // Better Auth often returns a code with no message (e.g. a failed
      // verification insert). Swallowing that behind a generic string makes
      // the real cause invisible, so surface whatever the server actually sent.
      console.error("[auth] Google sign-in failed:", error);
      setError(
        [error.status, error.code, error.message ?? error.statusText]
          .filter(Boolean)
          .join(" · ") || "Sign-in failed. Check the server console.",
      );
      setPending(false);
    }
    // On success the browser navigates to Google, so there is no success path
    // to handle here and `pending` stays true until the page unloads.
  };

  return (
    <div className="flex flex-col gap-3">
      <Button onClick={handleSignIn} disabled={pending} size="lg">
        {pending ? "Redirecting to Google..." : "Continue with Google"}
      </Button>
      {error && (
        <p role="alert" className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
