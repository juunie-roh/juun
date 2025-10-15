import "@config/tailwind/globals.css";

import { TooltipProvider } from "@juun/ui/tooltip";
import type { Preview } from "@storybook/nextjs";
import { NextIntlClientProvider } from "next-intl";
import { ThemeProvider } from "next-themes";

import {
  antonio,
  geistMono,
  geistSans,
  rix,
  stabilGroteskTrial,
  victorSerifTrial,
} from "@/assets/fonts";

const preview: Preview = {
  parameters: {
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
      <NextIntlClientProvider locale="ko" messages={{}}>
        <ThemeProvider>
          <TooltipProvider>
            <body
              className={`${geistSans.variable} ${geistMono.variable} ${antonio.variable} ${rix.variable} ${stabilGroteskTrial.variable} ${victorSerifTrial.variable} font-sans antialiased`}
            >
              <Story />
            </body>
          </TooltipProvider>
        </ThemeProvider>
      </NextIntlClientProvider>
    ),
  ],
};

export default preview;
