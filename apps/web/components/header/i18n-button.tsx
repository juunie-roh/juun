"use client";

import { Globe } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "@/i18n/navigation";

export default function I18nButton() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations("components.header.i18n");

  const handleLocaleChange = () => {
    const newLocale = locale === "ko" ? "en" : "ko";
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative"
      aria-label={t("aria-label")}
      onClick={handleLocaleChange}
    >
      <Globe />
      <span className="absolute right-0.5 bottom-0.5 font-black tracking-tighter [-webkit-text-stroke:1px_var(--color-background)] [text-stroke:1px_var(--color-background)]">
        {locale.toUpperCase()}
      </span>
      <span className="sr-only">{t("span")}</span>
    </Button>
  );
}
