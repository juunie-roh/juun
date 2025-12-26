"use client";

import { ClockArrowDown, ClockArrowUp } from "lucide-react";
import type { LinkProps } from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";

import { Button } from "@/components/ui/button";

export default function TimelineOrderButton({
  href,
  order = "desc",
  ...props
}: React.ComponentProps<typeof Button> & {
  href: LinkProps["href"];
  order?: "asc" | "desc";
}) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentOrder = (searchParams.get("order") as "asc" | "desc") || order;

  const handleToggle = () => {
    const newOrder = currentOrder === "asc" ? "desc" : "asc";
    const params = new URLSearchParams(searchParams);
    params.set("order", newOrder);
    router.replace(`${href}?${params.toString()}`, { scroll: false });
  };

  return (
    <Button variant="ghost" size="icon" {...props} onClick={handleToggle}>
      {currentOrder === "asc" ? <ClockArrowUp /> : <ClockArrowDown />}
    </Button>
  );
}
