import "server-only";

import { prisma } from "@juun/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

/**
 * Email addresses allowed to sign in.
 *
 * This is a single-author site, so rather than modelling roles we keep an
 * allowlist and refuse to create a user row for anyone else. Comma-separated so
 * a second address can be added without a code change.
 */
const allowedEmails = (process.env.ADMIN_ALLOWED_EMAILS ?? "")
  .split(",")
  .map((email) => email.trim().toLowerCase())
  .filter(Boolean);

export function isAllowedEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  // An empty allowlist must deny everyone. Were it to allow everyone, a missing
  // env var in production would silently open the admin area to any Google
  // account.
  if (allowedEmails.length === 0) return false;
  return allowedEmails.includes(email.toLowerCase());
}

export const auth = betterAuth({
  database: prismaAdapter(prisma, { provider: "postgresql" }),
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  // Sign-in is Google-only; there are no passwords to manage.
  emailAndPassword: { enabled: false },
  databaseHooks: {
    user: {
      create: {
        // Returning false aborts creation, so a non-allowlisted Google account
        // never gets a user row and therefore can never hold a session.
        before: async (user) => isAllowedEmail(user.email),
      },
    },
  },
  // Required for Next.js: lets Better Auth set cookies from server actions and
  // route handlers.
  plugins: [nextCookies()],
});

type Route = (
  request: Request,
  ...args: any[]
) => Promise<NextResponse<unknown>>;

/**
 * Resolve and validate the current admin session.
 *
 * The `proxy.ts` guard only checks that a session cookie exists, which a
 * forged cookie satisfies. This is the real check: it verifies the session
 * against the database and re-applies the allowlist, so revoking access is a
 * matter of removing the address from `ADMIN_ALLOWED_EMAILS`, without having
 * to delete the user row.
 *
 * @returns The session, or `null` when signed out or not allowlisted.
 */
export async function getAdminSession() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) return null;
  if (!isAllowedEmail(session.user.email)) return null;
  return session;
}

/**
 * Same as {@link getAdminSession}, but sends the visitor to sign in instead of
 * returning `null`. Call this at the top of every admin page and Server Action.
 *
 * Uses `redirect` rather than `forbidden()`: the latter needs
 * `experimental.authInterrupts`, and without that flag it throws an unrelated
 * error on exactly the path that is hardest to notice.
 *
 * There is no redirect loop here - `/auth` calls {@link getAdminSession}, gets
 * `null` for the same reason, and simply renders the sign-in button.
 *
 * Not for Route Handlers: a `POST` should get a 403 response, not a 307 to an
 * HTML page. Use {@link getAdminSession} and return a status there.
 */
export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) redirect("/auth");
  return session;
}

export function AdminRoute(route: Route): Route {
  return async (request, args) => {
    const session = await getAdminSession();
    if (!session) return new NextResponse("Unauthorized", { status: 401 });

    return route(request, args);
  };
}
