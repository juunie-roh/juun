import { getSessionCookie } from "better-auth/cookies";
import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";

import { routing } from "./i18n/routing";

const handleI18n = createMiddleware(routing);

/**
 * Locale-prefixed admin paths, e.g. `/ko/admin`, `/en/admin/posts/1`.
 * The bare `/admin` form is handled too, since i18n redirects it here first.
 */
const ADMIN_PATTERN = /^\/(?:[a-z]{2}\/)?admin(?:\/|$)/;

export default function proxy(request: NextRequest) {
  // i18n runs first so the locale prefix is already resolved by the time we
  // decide whether this is an admin route. Doing it the other way round makes
  // `/admin` and `/ko/admin` two different cases to guard.
  const response = handleI18n(request);

  // A redirect from i18n (e.g. `/admin` -> `/ko/admin`) must be followed
  // before the guard can apply; the redirected request comes back through here.
  if (response.headers.has("location")) return response;

  if (!ADMIN_PATTERN.test(request.nextUrl.pathname)) return response;

  // Cookie-presence check only. This is an optimistic guard for redirecting
  // signed-out visitors; it does NOT validate the session. Every admin page
  // and write action must still verify the session server-side, because a
  // forged cookie passes this check.
  if (!getSessionCookie(request)) {
    const signIn = new URL("/auth", request.url);
    signIn.searchParams.set("redirect", request.nextUrl.pathname);
    return NextResponse.redirect(signIn);
  }

  return response;
}

export const config = {
  matcher: [
    // Match all path names except for
    // - ... if they start with `/api`, `/trpc`, `/_next`, `/_vercel`, or `/100days`
    // - ... the ones containing a dot (e.g. `favicon.ico`)
    "/((?!api|trpc|_next|_vercel|100days|.*\\..*).*)",
  ],
};
