type Bucket = {
  count: number;
  resetAt: number;
};

type Store = Map<string, Bucket>;

function getStore() {
  const globalWithStore = globalThis as typeof globalThis & {
    __helpRateLimitStore?: Store;
  };

  if (!globalWithStore.__helpRateLimitStore) {
    globalWithStore.__helpRateLimitStore = new Map();
  }

  return globalWithStore.__helpRateLimitStore;
}

function cleanupStore(store: Store, now: number) {
  for (const [key, value] of store.entries()) {
    if (value.resetAt <= now) {
      store.delete(key);
    }
  }
}

export function checkRateLimit({
  key,
  maxRequests,
  windowMs,
}: {
  key: string;
  maxRequests: number;
  windowMs: number;
}) {
  const now = Date.now();
  const store = getStore();

  if (store.size > 5000) {
    cleanupStore(store, now);
  }

  const bucket = store.get(key);
  if (!bucket || bucket.resetAt <= now) {
    store.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, retryAfterMs: 0 };
  }

  if (bucket.count >= maxRequests) {
    return { allowed: false, retryAfterMs: Math.max(0, bucket.resetAt - now) };
  }

  bucket.count += 1;
  store.set(key, bucket);
  return { allowed: true, retryAfterMs: 0 };
}

export function getClientIp(headers: Headers) {
  const forwarded = headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first;
  }
  const realIp = headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  return "unknown";
}

