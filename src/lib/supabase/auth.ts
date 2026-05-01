import type { AuthError } from "@supabase/supabase-js";

export type IdentityType = "email" | "phone";

export type ParsedAuthPayload = {
  identityType: IdentityType;
  identifier: string;
  password: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value: string): boolean {
  // E.164 format, example: +919876543210
  return /^\+[1-9]\d{7,14}$/.test(value);
}

export function parseAuthPayload(input: unknown): {
  data?: ParsedAuthPayload;
  error?: string;
} {
  if (!isRecord(input)) {
    return { error: "Invalid request body." };
  }

  const password =
    typeof input.password === "string" ? input.password.trim() : "";
  if (password.length < 6) {
    return { error: "Password must be at least 6 characters." };
  }

  const rawIdentityType =
    typeof input.identityType === "string" ? input.identityType : undefined;
  const identityType =
    rawIdentityType === "email" || rawIdentityType === "phone"
      ? rawIdentityType
      : undefined;

  const identifier =
    typeof input.identifier === "string" ? input.identifier.trim() : "";

  if (!identityType) {
    return { error: "identityType must be email or phone." };
  }

  if (!identifier) {
    return { error: "Identifier is required." };
  }

  if (identityType === "email") {
    const normalized = identifier.toLowerCase();
    if (!isEmail(normalized)) {
      return { error: "Enter a valid email address." };
    }

    return {
      data: {
        identityType,
        identifier: normalized,
        password,
      },
    };
  }

  if (!isPhone(identifier)) {
    return {
      error:
        "Enter a valid phone number in international format, e.g. +919876543210.",
    };
  }

  return {
    data: {
      identityType,
      identifier,
      password,
    },
  };
}

export function parsePhoneOtpPayload(input: unknown): {
  data?: { phone: string; token: string };
  error?: string;
} {
  if (!isRecord(input)) {
    return { error: "Invalid request body." };
  }

  const phone = typeof input.phone === "string" ? input.phone.trim() : "";
  const token = typeof input.token === "string" ? input.token.trim() : "";

  if (!isPhone(phone)) {
    return {
      error:
        "Enter a valid phone number in international format, e.g. +919876543210.",
    };
  }

  if (!/^\d{6}$/.test(token)) {
    return { error: "OTP must be a 6-digit code." };
  }

  return { data: { phone, token } };
}

export function mapSupabaseAuthError(error: AuthError | null): string | null {
  if (!error) {
    return null;
  }

  const message = error.message.toLowerCase();

  if (message.includes("invalid login credentials")) {
    return "Invalid credentials.";
  }

  if (message.includes("email not confirmed")) {
    return "Email is not confirmed. Please verify your email first.";
  }

  if (message.includes("phone") && message.includes("confirm")) {
    return "Phone number is not verified. Verify OTP first.";
  }

  if (message.includes("token") && message.includes("invalid")) {
    return "Invalid OTP code.";
  }

  return error.message;
}
