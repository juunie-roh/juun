import { formats } from "./i18n/request";
import { routing } from "./i18n/routing";
import messages from "./messages/ko.json";

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number];
    Messages: typeof messages;
    Formats: typeof formats;
  }
}

// Cesium base URL global variable
declare global {
  interface Window {
    CESIUM_BASE_URL?: string;
  }

  // Global constant defined by webpack.DefinePlugin or Next.js env
  const CESIUM_BASE_URL: string;
}

export {};
