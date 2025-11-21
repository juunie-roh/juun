"use client";

import { Button } from "@juun/ui/button";
import { useRouter } from "next/navigation";
import React from "react";

interface NavigationBackButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "onClick"> {}

export default function NavigationBackButton({
  ...props
}: NavigationBackButtonProps) {
  const router = useRouter();
  return (
    <Button
      {...props}
      onClick={() => {
        router.back();
      }}
    />
  );
}
