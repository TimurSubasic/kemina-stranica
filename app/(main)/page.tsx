import { createClient } from "@/lib/supabase/server";
import NotAuthenticated from "@/components/not-authenticated";

export default async function Home() {
  const supabase = await createClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError || !claims?.claims) {
    return (
      <div className="min-h-screen flex flex-col items-center gap-10">
        {/* !! Landing */}
        <NotAuthenticated />
      </div>
    );
  }

  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", claims?.claims.sub)
    .single();
  if (userError) {
    console.log("Error fetching user data:", userError.message);
    return (
      <div className="text-center my-10 text-lg font-semibold">
        Error fetching user data!
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-5">
      <div>
        <p>Welcome, {userData.name}</p>
      </div>
    </div>
  );
}
