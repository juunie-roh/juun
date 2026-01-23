"use client";

import { Link } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { LogoAvatar } from "@/components/ui/logo-avatar";

export default function ClipboardButton() {
  const t = useTranslations("/blog.article.clipboard");

  return (
    <Button
      variant="ghost"
      size="icon"
      aria-label={t("label")}
      onClick={() => {
        if (!window) return;
        navigator.clipboard.writeText(window?.location.href);
        toast.success(t("success"), {
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
