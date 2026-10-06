import * as rootParams from "next/root-params";
import { type AbstractIntlMessages, hasLocale, IntlErrorCode } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import { formats } from "./formats";
import { routing } from "./routing";

export default getRequestConfig(async ({ locale: override }) => {
  // An explicit `locale` (e.g. `getMessages({ locale })`) wins; otherwise read
  // the `[locale]` root param. Invalid values fall back to the default locale -
  // the root layout already 404s them, and its not-found UI still needs messages.
  const requested = override ?? (await rootParams.locale());
  const locale = hasLocale(routing.locales, requested)
    ? requested
    : routing.defaultLocale;

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`))
      .default as AbstractIntlMessages,
    formats,
    onError: (error) => {
      if (error.code === IntlErrorCode.MISSING_MESSAGE) {
        console.warn(`Missing translation: ${error.message}`);
      }
    },
  };
});
