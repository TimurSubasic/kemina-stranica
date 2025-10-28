"use server";
import { createClient, createSecretClient } from "@/lib/supabase/server";

export async function deleteAccount() {
  const supabase = await createSecretClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();

  if (!claims || claimsError) {
    console.error(claimsError);
    return {
      success: false,
      message: "Failed to find account",
    };
  }

  const { error } = await supabase.auth.admin.deleteUser(claims.claims.sub);

  if (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to delete account",
    };
  }

  return {
    success: true,
    message: "Account deleted",
  };
}

export async function changeName(name: string) {
  const supabase = await createClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();

  if (!claims || claimsError) {
    console.error(claimsError);
    return {
      success: false,
      message: "Failed to find account",
    };
  }

  const { error } = await supabase
    .from("users")
    .update({ name })
    .eq("id", claims.claims.sub);

  if (error) {
    console.error(error);
    return {
      success: false,
      message: "Failed to change name",
    };
  }

  return {
    success: true,
    message: "Name changed",
  };
}
