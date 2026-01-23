"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { LogoAvatar } from "@/components/ui/logo-avatar";
import { Link } from "@/i18n/navigation";

export default function XShareButton() {
  const t = useTranslations("/blog.article");

  return (
    <Button asChild variant="ghost" size="icon" aria-label={t("x")}>
      <Link
        target="_blank"
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window?.location.href)}`}
      >
        <LogoAvatar color="#000000">
          <svg
            role="img"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <title>X</title>
            <path d="M14.234 10.162 22.977 0h-2.072l-7.591 8.824L7.251 0H.258l9.168 13.343L.258 24H2.33l8.016-9.318L16.749 24h6.993zm-2.837 3.299-.929-1.329L3.076 1.56h3.182l5.965 8.532.929 1.329 7.754 11.09h-3.182z" />
          </svg>
        </LogoAvatar>
      </Link>
    </Button>
  );
}
