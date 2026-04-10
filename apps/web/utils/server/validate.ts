import "server-only";

import type { Locale } from "next-intl";
import { z } from "zod";

import { API_KEYS } from "@/app/[locale]/cesium-utils/_data";
import { routing } from "@/i18n/routing";

// cesium utils api
const apiSchema = z.enum(API_KEYS as [string, ...string[]]);
// max integer from postgres
const idSchema = z.coerce.number().int().positive().max(2147483647);
// locales
const localeSchema = z.enum(routing.locales);

// Maps known param keys to their validated output types
type KnownParams = {
  api: string;
  id: number;
  locale: Locale;
};

type ValidatedParams<T> = {
  [K in keyof T]: K extends keyof KnownParams ? KnownParams[K] : T[K];
};

const paramValidators: {
  [K in keyof KnownParams]: z.ZodType<KnownParams[K]>;
} = {
  api: apiSchema,
  id: idSchema,
  locale: localeSchema,
};

export async function validateParams<T extends Record<string, string>>(
  params: Promise<T>,
): Promise<ValidatedParams<T> | null> {
  const p = await params;
  const result: Record<string, unknown> = {};

  for (const key of Object.keys(p) as (keyof T & string)[]) {
    const validator = paramValidators[key as keyof KnownParams];
    if (validator) {
      const parsed = validator.safeParse(p[key]);
      if (!parsed.success) return null;
      result[key] = parsed.data;
    } else {
      result[key] = p[key];
    }
  }

  return result as ValidatedParams<T>;
}
