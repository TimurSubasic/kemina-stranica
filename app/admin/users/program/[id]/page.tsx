import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { toast } from "sonner";

export default async function HandleProgram({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  const supabase = await createClient();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select()
    .eq("id", userId)
    .single();

  if (!user || userError) {
    console.log(userError);

    toast.error("User not found");

    redirect("/admin/users");
  }

  if (user.role === "inactive") {
    redirect(`/admin/users/program/${userId}/create`);
  } else {
    redirect(`/admin/users/program/${userId}/edit`);
  }
}
