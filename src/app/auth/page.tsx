"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

import { getSafeRedirectPath } from "@/lib/safe-redirect";

type AuthMode = "signin" | "signup";
type IdentityType = "email" | "phone";

type AuthApiResponse = {
  ok: boolean;
  message?: string;
  requiresVerification?: boolean;
  nextStep?: string;
};

export default function AuthPage() {
  const [mode, setMode] = useState<AuthMode>("signin");
  const [identityType, setIdentityType] = useState<IdentityType>("email");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const nextPath = getSafeRedirectPath(searchParams.get("next"));

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const endpoint =
        mode === "signup" ? "/api/auth/signup" : "/api/auth/signin";
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          identityType,
          identifier,
          password,
        }),
      });

      const payload = (await response
        .json()
        .catch(() => null)) as AuthApiResponse | null;

      if (!response.ok || !payload?.ok) {
        setError(payload?.message ?? "Authentication failed.");
        return;
      }

      if (
        mode === "signup" &&
        identityType === "phone" &&
        payload.requiresVerification
      ) {
        const query = new URLSearchParams({
          phone: identifier.trim(),
          next: nextPath,
        });
        router.push(`/auth/verify-phone?${query.toString()}`);
        return;
      }

      if (
        mode === "signup" &&
        identityType === "email" &&
        payload.nextStep === "verify_email"
      ) {
        setMessage(
          payload.message ??
            "Signup complete. Check your email for verification.",
        );
        return;
      }

      setMessage(payload.message ?? "Authentication successful.");
      router.push(nextPath);
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    setError(null);
    setMessage(null);
    setLoading(true);

    try {
      const response = await fetch("/api/auth/signout", {
        method: "POST",
      });

      const payload = (await response
        .json()
        .catch(() => null)) as AuthApiResponse | null;

      if (!response.ok || !payload?.ok) {
        setError(payload?.message ?? "Failed to sign out.");
        return;
      }

      setMessage(payload.message ?? "Signed out successfully.");
      router.refresh();
    } catch {
      setError("Failed to sign out.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-saffron-50 px-4 py-10 sm:py-16">
      <div className="mx-auto w-full max-w-md rounded-2xl border border-saffron-100 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Supabase Auth</h1>
          <Link
            href="/"
            className="text-sm font-medium text-saffron hover:text-saffron-dark"
          >
            முகப்பு
          </Link>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1 text-sm">
          <button
            type="button"
            onClick={() => setMode("signin")}
            className={`rounded-md px-3 py-2 font-medium transition ${
              mode === "signin"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sign In
          </button>
          <button
            type="button"
            onClick={() => setMode("signup")}
            className={`rounded-md px-3 py-2 font-medium transition ${
              mode === "signup"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Sign Up
          </button>
        </div>

        <div className="mb-4 grid grid-cols-2 gap-2 rounded-lg bg-gray-100 p-1 text-sm">
          <button
            type="button"
            onClick={() => setIdentityType("email")}
            className={`rounded-md px-3 py-2 font-medium transition ${
              identityType === "email"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Email
          </button>
          <button
            type="button"
            onClick={() => setIdentityType("phone")}
            className={`rounded-md px-3 py-2 font-medium transition ${
              identityType === "phone"
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-600 hover:text-gray-900"
            }`}
          >
            Phone
          </button>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="identifier"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              {identityType === "email" ? "Email" : "Phone (+country code)"}
            </label>
            <input
              id="identifier"
              name="identifier"
              type={identityType === "email" ? "email" : "tel"}
              autoComplete={identityType === "email" ? "email" : "tel"}
              value={identifier}
              onChange={(event) => setIdentifier(event.target.value)}
              placeholder={
                identityType === "email" ? "you@example.com" : "+919876543210"
              }
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-saffron focus:border-saffron focus:ring-2"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="At least 6 characters"
              className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm outline-none ring-saffron focus:border-saffron focus:ring-2"
              required
              minLength={6}
            />
          </div>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {message ? <p className="text-sm text-green-700">{message}</p> : null}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-saffron px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-saffron-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading
              ? "Please wait..."
              : mode === "signin"
                ? "Sign In"
                : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 border-t border-gray-200 pt-4">
          <button
            type="button"
            onClick={handleSignOut}
            disabled={loading}
            className="w-full rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Sign Out
          </button>
        </div>

        <p className="mt-4 text-xs text-gray-500">
          For phone sign-up, OTP verification is required before password
          sign-in.
        </p>
      </div>
    </main>
  );
}
