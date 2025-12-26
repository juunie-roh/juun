"use client";

import { TriangleAlert } from "lucide-react";
import { useTranslations } from "next-intl";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

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
