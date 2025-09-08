import type { AbstractIntlMessages } from "next-intl";
import { getRequestConfig } from "next-intl/server";

import type messages from "@/messages/ko.json";

declare module "next-intl" {
  interface AppConfig {
    Messages: typeof messages;
  }
}

export default getRequestConfig(async () => {
  const locale = "ko";
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`))
      .default as AbstractIntlMessages,
  };
});
