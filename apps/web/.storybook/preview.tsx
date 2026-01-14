import "@config/tailwind/globals.css";

import type { Preview } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";

import {
  attilaSansSharpTrial,
  geistMono,
  geistSans,
  rix,
  stabilGroteskTrial,
  victorNarrowTrial,
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
    (Story) => (
      <NextIntlClientProvider locale="en">
        <ThemeProvider>
          <TooltipProvider>
            <div
              className={`${geistSans.variable} ${geistMono.variable} ${rix.variable} ${stabilGroteskTrial.variable} ${victorNarrowTrial.variable} ${victorSerifTrial.variable} ${attilaSansSharpTrial.variable} font-sans antialiased`}
            >
              <Story />
            </div>
          </TooltipProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;
