"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createExercise(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const video_url = formData.get("video_url") as string;

  if (!name || !description || !video_url) return { error: "Missing fields" };

  const { error: insertError } = await supabase.from("exercises").insert({
    name,
    description,
    video_url,
  });

  if (insertError) {
    return { error: insertError.message };
  }

  revalidatePath("/admin/exercises");
  return { success: true };
}

export async function isVideoUrl(url: string) {
  try {
    const res = await fetch(url, { method: "HEAD" });
    const type = res.headers.get("content-type");
    return type ? type.startsWith("video/") : false;
  } catch {
    return false;
  }
}
