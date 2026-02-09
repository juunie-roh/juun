import { Locale } from "./types";

const VALID_LOCALES: readonly Locale[] = Object.values(Locale);

function validate(value?: string): Locale | undefined {
  return VALID_LOCALES.find((l) => l === value);
}

export const DEFAULT_LOCALE: Locale =
  validate(process.env.DEFAULT_LOCALE) ?? ("ko" as const);
