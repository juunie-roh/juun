import "@config/tailwind/globals.css";

import type { Preview } from "@storybook/nextjs-vite";
import { NextIntlClientProvider } from "next-intl";

import {
  antonio,
  geistMono,
  geistSans,
  rix,
  stabilGroteskTrial,
  victorSerifTrial,
} from "@/assets/fonts";
import { TooltipProvider } from "@/components/ui/tooltip";
import ThemeProvider from "@/contexts/theme-provider";

const preview: Preview = {
  parameters: {
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
      <NextIntlClientProvider locale="ko" messages={{}}>
        <ThemeProvider>
          <TooltipProvider>
            <div
              className={`${geistSans.variable} ${geistMono.variable} ${antonio.variable} ${rix.variable} ${stabilGroteskTrial.variable} ${victorSerifTrial.variable} font-sans antialiased`}
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
