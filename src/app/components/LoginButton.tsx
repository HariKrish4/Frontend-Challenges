"use client";

import Link from "next/link";

export default function LoginButton() {
  return (
    <Link
      href="/login"
      className="rounded-lg bg-saffron px-3 py-1.5 text-xs font-semibold text-white shadow-sm hover:bg-saffron-dark transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-saffron-light"
    >
      Login
    </Link>
  );
}
