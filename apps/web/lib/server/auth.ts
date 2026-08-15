import "server-only";

import { prisma } from "@juun/db";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { nextCookies } from "better-auth/next-js";

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
