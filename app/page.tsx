import { DeployButton } from "@/components/deploy-button";
import { EnvVarWarning } from "@/components/env-var-warning";
import { AuthButton } from "@/components/auth-button";
import { ThemeSwitcher } from "@/components/theme-switcher";
import { hasEnvVars } from "@/lib/utils";
import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import NotAuthenticated from "@/components/not-authenticated";
import { Divide } from "lucide-react";
import Navbar from "@/components/navbar";

export default async function Home() {
  const supabase = await createClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError || !claims?.claims) {
    return <NotAuthenticated />;
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", claims?.claims.sub)
    .single();
  if (userError) {
    console.log("Error fetching user data:", userError.message);
    return null;
  } else {
    console.log("User data:", userData);
  }

  return (
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navbar />

        {userData ? (
          <div>
            <p>Welcome, {userData.name}</p>
          </div>
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </div>
    </main>
  );
}
