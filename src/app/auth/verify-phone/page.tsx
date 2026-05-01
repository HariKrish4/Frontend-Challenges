"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { getSafeRedirectPath } from "@/lib/safe-redirect";

type VerifyApiResponse = {
  ok: boolean;
  message?: string;
};

export default function VerifyPhonePage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const nextPath = getSafeRedirectPath(searchParams.get("next"));
  const [phone, setPhone] = useState(searchParams.get("phone") || "");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/verify-phone", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          token,
        }),
      });

      const payload = (await response
        .json()
        .catch(() => null)) as VerifyApiResponse | null;

      if (!response.ok || !payload?.ok) {
        setError(payload?.message ?? "Failed to verify OTP.");
        return;
      }

      setMessage(payload.message ?? "Phone verified successfully.");
      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-saffron-50 px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-saffron-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Verify Phone OTP</h1>
          <Link
            href="/auth"
            className="text-sm font-medium text-saffron hover:text-saffron-dark"
          >
            Back to Auth
          </Link>
        </div>

        <p className="mb-4 text-sm text-gray-600">
          Enter the 6-digit OTP sent by Supabase to your phone number.
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="phone"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Phone (+country code)
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="+919876543210"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-saffron focus:border-saffron focus:ring-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="token"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              OTP code
            </label>
            <input
              id="token"
              name="token"
              type="text"
              inputMode="numeric"
              pattern="\\d{6}"
              value={token}
              onChange={(event) => setToken(event.target.value)}
              placeholder="123456"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-saffron focus:border-saffron focus:ring-2"
              required
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {message ? <p className="text-sm text-green-700">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-saffron px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-saffron-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Verifying..." : "Verify OTP"}
          </button>
        </form>
      </div>
    </main>
  );
}
