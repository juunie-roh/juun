"use client";

import { Button } from "@juun/ui/button";
import { ClockArrowDown, ClockArrowUp } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

export default function TimelineOrderButton({
  order = "asc",
  ...props
}: React.ComponentProps<typeof Button> & {
  order?: "asc" | "desc";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOrder = (searchParams.get("order") as "asc" | "desc") || order;

  const handleToggle = React.useCallback(() => {
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams);
    params.set("order", newOrder);
    router.replace(`/about?${params.toString()}`, { scroll: false });
  }, [currentOrder, searchParams, router]);

  return (
    <Button variant="ghost" size="icon" {...props} onClick={handleToggle}>
      {currentOrder === "asc" ? <ClockArrowUp /> : <ClockArrowDown />}
    </Button>
  );
}
