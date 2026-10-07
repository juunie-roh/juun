import "@config/tailwind/globals.css";

import type { Preview } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";

import {
  geistMono,
  geistSans,
  notoSansKR,
  stabilGroteskTrial,
  victorSerifTrial,
} from "@/assets/fonts";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProvider from "@/contexts/theme-provider";

import nextIntl from "./next-intl";

const preview: Preview = {
  initialGlobals: {
    locale: "en",
    locales: {
      en: "English",
      ko: "한국어",
    },
  },
  parameters: {
    nextIntl,
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      codePanel: true,
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: ["Components"],
        locales: "",
      },
    },
  },
  decorators: [
    (Story, { globals }) => {
      // Vitest only applies this file's annotations, not the addon's, so this
      // provider must carry messages and formats itself.
      const locale = globals.locale ?? nextIntl.defaultLocale;
      return (
        <NextIntlClientProvider
          locale={locale}
          messages={nextIntl.messagesByLocale[locale]}
          formats={nextIntl.formats}
        >
          <ThemeProvider>
            <TooltipProvider>
              <div
                className={`${geistSans.variable} ${geistMono.variable} ${notoSansKR.variable} ${stabilGroteskTrial.variable} ${victorSerifTrial.variable} font-sans antialiased`}
              >
                <Story />
              </div>
            </TooltipProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      );
    },
  ],
};

export default preview;
