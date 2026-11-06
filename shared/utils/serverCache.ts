// ---------------------------------------------------------------------------
// A minimal in-process TTL cache for server-only lookups.
//
// Two places ask the backend a question whose answer is the same for every
// visitor and changes on the scale of hours, not seconds: the legacy redirect
// map (a slug index over the whole catalogue) and /sitemap.xml (the same rows,
// enumerated). Without a cache, every crawler hit turns into a paged crawl of
// the API; with it, the cost is one build per TTL window per process.
//
// Deliberately not a general-purpose cache: no eviction beyond expiry, no
// stampede lock. Entries are small and rebuilt on the next call.
// ---------------------------------------------------------------------------

interface Entry<T> {
  value: T;
  expiresAt: number;
}

const store = new Map<string, Entry<unknown>>();

/**
 * Returns the cached result of `build` for `key`, rebuilding it once it is older
 * than `ttlMs`. An in-flight call is not deduplicated: two concurrent misses do
 * the same work twice, which is cheaper than the bookkeeping of a lock.
 *
 * `force` skips the stored value and replaces it. Callers use it to double-check
 * an answer before acting on it, which is why the value stays cached afterwards:
 * the re-read has to refresh the entry, not just this one request.
 */
export async function cachedValue<T>(
  key: string,
  ttlMs: number,
  build: () => Promise<T>,
  options: { force?: boolean } = {}
): Promise<T> {
  const hit = store.get(key);
  if (!options.force && hit && hit.expiresAt > Date.now()) return hit.value as T;
  const value = await build();
  store.set(key, { value, expiresAt: Date.now() + ttlMs });
  return value;
}

/** Drops expired entries. Handy for tests and long-lived processes. */
export function clearCachedValues(): void {
  store.clear();
}
