import { createClient } from "@/lib/supabase/server";
import NotAuthenticated from "@/components/not-authenticated";
import Navbar from "@/components/navbar";
import { Spinner } from "@/components/ui/spinner";

export default async function Home() {
  const supabase = await createClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();

  if (claimsError || !claims?.claims) {
    return (
      <div className="min-h-screen flex flex-col items-center gap-10">
        <Navbar />
        {/* !! Landing */}
        <NotAuthenticated />
      </div>
    );
  }

  console.log(claims.claims.user_metadata.is_admin);

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
    <main className="min-h-screen flex flex-col items-center">
      <div className="flex-1 w-full flex flex-col gap-20 items-center">
        <Navbar />

        {userData ? (
          <div>
            <p>Welcome, {userData.name}</p>
          </div>
        ) : (
          <div>
            <Spinner />
          </div>
        )}
      </div>
    </main>
  );
}
