/**
 * GUID shape check, shared by the client hooks and the server-side item loader.
 *
 * It lives here (and not in `features/siteServiceItems/usePublicServiceItems`)
 * because that module is a `"use client"` file: importing a plain function across
 * the boundary would hand the server a client reference instead of a callable.
 */
const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

export function isUUID(value: string | null | undefined): boolean {
  return typeof value === "string" && UUID_RE.test(value);
}
