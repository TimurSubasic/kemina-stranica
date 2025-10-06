import Navbar from "@/components/navbar";
import React from "react";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claims?.claims) {
    return redirect("/auth/login");
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", claims?.claims.sub)
    .single();
  if (userError) {
    console.log("Error fetching user data:", userError.message);
    return redirect("/");
  }

  if (!userData || userData.role !== "user") {
    return redirect("/");
  }

  return (
    <main className="max-w-6xl mx-auto mt-5 flex-1">
      <Navbar />
      {children}
    </main>
  );
}
