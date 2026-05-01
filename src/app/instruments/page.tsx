import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function InstrumentsData() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/instruments");
  }

  const { data: instruments } = await supabase.from("instruments").select();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-semibold">Protected Instruments Data</h1>
        <Link
          href="/login"
          className="text-sm text-saffron hover:text-saffron-dark"
        >
          Account
        </Link>
      </div>
      <pre>{JSON.stringify(instruments, null, 2)}</pre>
    </div>
  );
}

export default function Instruments() {
  return (
    <Suspense fallback={<div>Loading instruments...</div>}>
      <InstrumentsData />
    </Suspense>
  );
}
