import { createClient } from "@/lib/supabase/server";
import React from "react";
import CreateProgram from "./create-program";
import SetupProgram from "./setup-program";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  const supabase = await createClient();

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .single();

  if (!user || userError) {
    console.log(userError);
    return <div className="w-full mt-10 text-center">No user Found</div>;
  }

  //! user has plan set up with exercises
  if (user && user.role === "active") {
    return <div>Has plan</div>;
  }

  const { data: program, error: programError } = await supabase
    .from("user-programs")
    .select()
    .eq("user_id", userId)
    .eq("status", "active")
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
    .select()
    .eq("program_id", program.id)
    .order("week", { ascending: true })
    .order("day", { ascending: true });

  if (!exercises || exercisesError) {
    console.log(exercisesError);
    return <div>Error fetching Exercises</div>;
  }

  //! set up  exercisese selction
  return <SetupProgram days={program.days} />;
}
