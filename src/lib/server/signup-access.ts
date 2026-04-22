import { createHash, timingSafeEqual } from "crypto";

type RateLimitEntry = {
  count: number;
  resetAt: number;
};

const rateLimitStore = new Map<string, RateLimitEntry>();

const defaultWindowMs = 15 * 60 * 1000;
const defaultMaxAttempts = 8;

function hashValue(value: string) {
  return createHash("sha256").update(value).digest();
}

export function isSignupCodeConfigured() {
  return Boolean(process.env.QCI_SIGNUP_CODE?.trim());
}

export function isValidSignupCode(input: string) {
  const expectedCode = process.env.QCI_SIGNUP_CODE?.trim();

  if (!expectedCode) {
    return false;
  }

  const inputHash = hashValue(input.trim().toUpperCase());
  const expectedHash = hashValue(expectedCode.toUpperCase());

  return timingSafeEqual(inputHash, expectedHash);
}

export function getClientIp(request: Request) {
  const forwardedFor = request.headers.get("x-forwarded-for");

  if (forwardedFor) {
    return forwardedFor.split(",")[0]?.trim() || "unknown";
  }

  return (
    request.headers.get("x-real-ip") ??
    request.headers.get("cf-connecting-ip") ??
    "unknown"
  );
}

export function consumeRateLimit(
  key: string,
  {
    limit = defaultMaxAttempts,
    windowMs = defaultWindowMs,
  }: {
    limit?: number;
    windowMs?: number;
  } = {},
) {
  const now = Date.now();
  const existing = rateLimitStore.get(key);

  if (!existing || existing.resetAt <= now) {
    const resetAt = now + windowMs;
    rateLimitStore.set(key, { count: 1, resetAt });

    return {
      allowed: true,
      remaining: limit - 1,
      retryAfterSeconds: Math.ceil(windowMs / 1000),
    };
  }

  if (existing.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
    };
  }

  existing.count += 1;

  return {
    allowed: true,
    remaining: Math.max(0, limit - existing.count),
    retryAfterSeconds: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  };
}
