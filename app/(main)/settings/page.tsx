import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import SettingsForm from "./settings-form";

export default async function Settings() {
  const supabase = await createClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claims?.claims) {
    return redirect("/auth/login");
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select()
    .eq("id", claims?.claims.sub)
    .single();

  if (!user || userError) {
    console.log(userError);

    return <div>Cant find user</div>;
  }

  return (
    <div>
      <SettingsForm user={user} />
    </div>
  );
}
