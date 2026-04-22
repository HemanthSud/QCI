import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

import {
  consumeRateLimit,
  getClientIp,
  isSignupCodeConfigured,
  isValidSignupCode,
} from "@/lib/server/signup-access";

export const runtime = "nodejs";

function normalizeText(value: unknown, maxLength: number) {
  return typeof value === "string" ? value.trim().slice(0, maxLength) : "";
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  const rateLimit = consumeRateLimit(`sign-up:${ip}`);

  if (!rateLimit.allowed) {
    return NextResponse.json(
      { error: "Too many sign up attempts. Try again later." },
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

  const email = normalizeText(body?.email, 254).toLowerCase();
  const password = typeof body?.password === "string" ? body.password : "";
  const firstName = normalizeText(body?.firstName, 80);
  const lastName = normalizeText(body?.lastName, 80);

  if (!email || !email.includes("@") || password.length < 8 || !firstName || !lastName) {
    return NextResponse.json(
      { error: "Enter a valid email, an 8+ character password, first name, and last name." },
      { status: 400 },
    );
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAdminKey = process.env.SUPABASE_SECRET_KEY ?? process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseAdminKey) {
    return NextResponse.json(
      { error: "Member sign up is missing its server-only Supabase admin key." },
      { status: 503 },
    );
  }

  const supabaseAdmin = createClient(supabaseUrl, supabaseAdminKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });

  const fullName = `${firstName} ${lastName}`.trim();
  const { error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
    user_metadata: {
      first_name: firstName,
      last_name: lastName,
      full_name: fullName,
    },
    app_metadata: {
      qci_member: true,
    },
  });

  if (error) {
    return NextResponse.json(
      { error: "Account could not be created. It may already exist." },
      { status: 400 },
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
