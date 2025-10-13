import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React, { startTransition } from "react";

export default async function EditProgram({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  const supabase = await createClient();

  const { data: program, error: programError } = await supabase
    .from("user-programs")
    .select()
    .eq("user_id", userId)
    .single();
  if (!program || programError) {
    console.log(programError);
    redirect(`/admin/users/program/${userId}`);
  }

  const { data: exercises, error: exercisesError } = await supabase
    .from("program-exercises")
    .select()
    .eq("program_id", program.id);

  if (!exercises || exercisesError) {
    console.log(exercisesError);
    //? maybe redirect back but not now
  }

  return <div></div>;
}
