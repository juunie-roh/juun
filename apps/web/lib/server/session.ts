import "server-only";

import { headers } from "next/headers";
import { forbidden } from "next/navigation";

import { auth, isAllowedEmail } from "./auth";

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
 * Same as {@link getAdminSession}, but renders the 403 boundary instead of
 * returning `null`. Call this at the top of every admin page and mutation.
 */
export async function requireAdminSession() {
  const session = await getAdminSession();
  if (!session) forbidden();
  return session;
}
