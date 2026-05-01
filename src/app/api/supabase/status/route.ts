import { NextResponse } from "next/server";

import { getSupabaseConfigStatus } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const status = getSupabaseConfigStatus();

  if (!status.isConfigured) {
    return NextResponse.json(
      {
        ok: false,
        configured: false,
        message: status.message,
      },
      { status: 500 },
    );
  }

  try {
    await createClient();

    return NextResponse.json({
      ok: true,
      configured: true,
      message: "Supabase client initialized.",
    });
  } catch (error) {
    return NextResponse.json(
      {
        ok: false,
        configured: true,
        message:
          error instanceof Error
            ? error.message
            : "Failed to initialize Supabase client.",
      },
      { status: 500 },
    );
  }
}
