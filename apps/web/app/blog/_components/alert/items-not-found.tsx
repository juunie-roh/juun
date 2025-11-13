"use client";

import { Alert, AlertDescription, AlertTitle } from "@juun/ui/alert";
import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

export default function BlogItemsNotFoundAlert() {
  const t = useTranslations("blog.alert.items.notFound");

  return (
    <Alert>
      <TriangleAlert />
      <AlertTitle>{t("title")}</AlertTitle>
      <AlertDescription>{t("description")}</AlertDescription>
    </Alert>
  );
}
