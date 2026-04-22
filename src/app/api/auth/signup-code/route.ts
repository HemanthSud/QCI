import { NextResponse } from "next/server";

import {
  consumeRateLimit,
  getClientIp,
  isSignupCodeConfigured,
  isValidSignupCode,
} from "@/lib/server/signup-access";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = consumeRateLimit(`signup-code:${ip}`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many attempts. Try again later." },
      {
        status: 429,
        headers: {
          "Retry-After": String(rateLimit.retryAfterSeconds),
        },
      },
    );
  }

  if (!isSignupCodeConfigured()) {
    return NextResponse.json(
      { error: "Member sign up is not configured yet." },
      { status: 503 },
    );
  }

  const body = await request.json().catch(() => null);
  const accessCode = typeof body?.accessCode === "string" ? body.accessCode : "";

  if (!isValidSignupCode(accessCode)) {
    return NextResponse.json(
      { error: "That access code does not match. Ask QCI leadership for the current code." },
      { status: 401 },
    );
  }

  return NextResponse.json(
    { ok: true },
    {
      headers: {
        "Cache-Control": "no-store",
      },
    },
  );
}
