"use client";

import { List } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/navigation";

export default function ListButton({
  className,
  ...props
}: Omit<
  React.ComponentProps<typeof Button>,
  "asChild" | "aria-label" | "variant"
>) {
  const t = useTranslations("components.blog.article.list");

  return (
    <Button
      asChild
      aria-label={t("title")}
      variant="link"
      className={className}
      {...props}
    >
      <Link href="/blog">
        <List />
        {t("title")}
      </Link>
    </Button>
  );
}
