import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claims?.claims) {
    return redirect("/auth/login");
  }

  if (!claims.claims.user_metadata.is_admin) {
    return redirect("/");
  }

  return <main className="max-w-6xl mx-auto flex-1">{children}</main>;
}
