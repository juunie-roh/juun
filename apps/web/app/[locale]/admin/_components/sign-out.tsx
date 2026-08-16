"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/auth-client";

export default function SignOut() {
  const router = useRouter();
  const [pending, setPending] = useState(false);

  const handleSignOut = async () => {
    setPending(true);
    await authClient.signOut();
    // Refresh so the server re-evaluates the session and the proxy guard
    // bounces us back to /auth.
    router.replace("/auth");
    router.refresh();
  };

  return (
    <Button variant="outline" onClick={handleSignOut} disabled={pending}>
      {pending ? "Signing out..." : "Sign out"}
    </Button>
  );
}
