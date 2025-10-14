import { createClient } from "@/lib/supabase/server";
import React from "react";
import CreateProgram from "./create-program";
import SetupProgram from "./setup-program";
import { redirect } from "next/navigation";

export default async function ProgramPage({
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

  if (programError) {
    console.log(programError);
  }

  if (!program) {
    return (
      <div>
        {" "}
        <CreateProgram userId={userId} />{" "}
      </div>
    );
  }

  const { data: exercises, error: exercisesError } = await supabase
    .from("program-exercises")
    .select("day")
    .eq("program_id", program.id)
    .eq("week", 4)
    .eq("day", program.days);
  if (!exercises || exercisesError) {
    console.log(exercisesError);
    return <div>Error fetching Exercises</div>;
  }

  if (exercises.length === 0) {
    console.log(exercises);
    return (
      <SetupProgram
        days={program.days}
        programId={program.id}
        userId={userId}
      />
    );
  } else {
    redirect(`/admin/users/program/${userId}`);
  }
}
