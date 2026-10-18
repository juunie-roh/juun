"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";

import { revalidateAll } from "../_actions/revalidate-all";

// TEMPORARY: see `_actions/revalidate-all.ts`.
export default function RevalidateAll() {
  const [pending, startTransition] = useTransition();

  const handleClick = () => {
    startTransition(async () => {
      try {
        await revalidateAll();
        toast.success("Cache revalidated");
      } catch {
        toast.error("Failed to revalidate cache");
      }
    });
  };

  return (
    <Button variant="outline" onClick={handleClick} disabled={pending}>
      {pending ? "Revalidating..." : "Revalidate all cache"}
    </Button>
  );
}
