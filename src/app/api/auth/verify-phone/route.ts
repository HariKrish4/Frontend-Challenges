import { NextResponse } from "next/server";

import {
  mapSupabaseAuthError,
  parsePhoneOtpPayload,
} from "@/lib/supabase/auth";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  const parsed = parsePhoneOtpPayload(body);

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
  const { phone, token } = parsed.data;

  const { data, error } = await supabase.auth.verifyOtp({
    phone,
    token,
    type: "sms",
  });

  if (error) {
    return NextResponse.json(
      {
        ok: false,
        message: mapSupabaseAuthError(error) ?? "Failed to verify OTP.",
      },
      { status: 400 },
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
    message: "Phone verified successfully.",
  });
}
