import { NextResponse } from "next/server";

import { mapSupabaseAuthError, parseAuthPayload } from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = parseAuthPayload(body);

  if (!parsed.data) {
    return NextResponse.json(
      {
        ok: false,
        message: parsed.error ?? "Invalid request.",
      },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { identityType, identifier, password } = parsed.data;

  const payload =
    identityType === "email"
      ? { email: identifier, password }
      : { phone: identifier, password };

  const { data, error } = await supabase.auth.signUp(payload);

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        message: mapSupabaseAuthError(error) ?? "Failed to sign up.",
      },
      { status: 400 },
    );
  }

  const needsVerification = !data.session;

  return NextResponse.json({
    ok: true,
    identityType,
    requiresVerification: needsVerification,
    nextStep:
      identityType === "phone"
        ? needsVerification
          ? "verify_phone"
          : "signed_in"
        : needsVerification
          ? "verify_email"
          : "signed_in",
    message:
      identityType === "phone" && needsVerification
        ? "Signup successful. Enter the OTP sent to your phone to finish verification."
        : identityType === "email" && needsVerification
          ? "Signup successful. Check your email to confirm your account."
          : "Signup successful.",
  });
}
