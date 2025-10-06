"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function createExercise(formData: FormData) {
  const supabase = await createClient();

  const name = formData.get("name") as string;
  const description = formData.get("description") as string;
  const video = formData.get("video") as File | null;

  if (!name || !description || !video) return { error: "Missing fields" };

  const { data: uploadData, error: uploadError } = await supabase.storage
    .from("videos")
    .upload(`public/${name}`, video);

  if (uploadError) return { error: uploadError.message };

  const video_url = `${
    supabase.storage.from("videos").getPublicUrl(uploadData.path).data.publicUrl
  }`;

  const { error: insertError } = await supabase.from("exercises").insert({
    name,
    description,
    video_url,
  });

  if (insertError) return { error: insertError.message };

  revalidatePath("/admin/exercises");
  return { success: true };
}
