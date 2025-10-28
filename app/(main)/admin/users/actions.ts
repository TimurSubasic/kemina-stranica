"use server";
import { createSecretClient } from "@/lib/supabase/server";

export async function deleteUser(id: string) {
  const supabase = await createSecretClient();

  const { error } = await supabase.auth.admin.deleteUser(id);

  if (error) {
    console.error(error);
    return false;
  } else return true;
}
