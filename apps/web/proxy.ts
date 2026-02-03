import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: [
    // Match all path names except for
    // - ... if they start with `/api`, `/trpc`, `/_next`, `/_vercel`, or `/100days`
    // - ... the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|trpc|_next|_vercel|100days|.*\\..*).*)",
  ],
};
