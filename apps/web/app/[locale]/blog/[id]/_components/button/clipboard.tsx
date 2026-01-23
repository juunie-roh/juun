"use client";

import { Link } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LogoAvatar } from "@/components/ui/logo-avatar";

export default function ClipboardButton() {
  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label="Copy URL to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(window.location.href);
        toast.success("URL copied to clipboard!", {
          id: "article-copied",
          duration: 2000,
        });
      }}
    >
      <LogoAvatar>
        <Link />
      </LogoAvatar>
    </Button>
  );
}
