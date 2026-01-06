import { formats } from "@/i18n/request";

import en from "../messages/en.json";
import ko from "../messages/ko.json";

const messagesByLocale: Record<string, any> = { ko, en };

const nextIntl = {
  defaultLocale: "en",
  messagesByLocale,
  formats,
};

export default nextIntl;
