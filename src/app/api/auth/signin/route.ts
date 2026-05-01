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

  const { data, error } = await supabase.auth.signInWithPassword(payload);

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        message: mapSupabaseAuthError(error) ?? "Failed to sign in.",
      },
      { status: 401 },
    );
  }

  return NextResponse.json({
    ok: true,
    user: data.user
      ? {
          id: data.user.id,
          email: data.user.email,
          phone: data.user.phone,
        }
      : null,
    message: "Signed in successfully.",
  });
}
