import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import DayWeekUser from "./day-week-user";

export default async function ProgramPage() {
  const supabase = await createClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();

  if (!claims?.claims || claimsError) {
    return redirect("/auth/login");
  }

  const { data: program, error: programError } = await supabase
    .from("user-programs")
    .select()
    .eq("user_id", claims.claims.sub)
    .single();

  if (!program || programError) {
    console.log(programError);
    return (
      <div className="mt-10 font-semibold text-xl text-center">
        No program found
      </div>
    );
  }

  // get all program ex
  const { data: exercises, error: exercisesError } = await supabase
    .from("program-exercises")
    .select(
      `
    id,
    week,
    day,
    order,
    sets,
    reps,
    weight,
    instructions,
    time,
    distance,
    exercise: exercise_id (id, name, description, video_url)
  `
    )
    .eq("program_id", program.id)
    .order("week", { ascending: true })
    .order("day", { ascending: true })
    .order("order", { ascending: true });

  if (!exercises || exercisesError) {
    console.log(exercisesError);
    return null;
    //TODO: maybe redirect back
  }

  type RawExercise = {
    id: string;
    week: number;
    day: number;
    order: number;
    sets: number;
    reps: number;
    weight: string;
    instructions: string;
    time: string;
    distance: string;
    exercise:
      | {
          id: string;
          name: string;
          description: string;
          video_url: string;
        }[]
      | null;
  };

  const normalizedExercises = (exercises as RawExercise[]).map((e) => {
    const related = Array.isArray(e.exercise) ? e.exercise[0] : e.exercise;
    return {
      id: e.id,
      week: e.week,
      day: e.day,
      order: e.order,
      sets: e.sets,
      reps: e.reps,
      weight: e.weight,
      instructions: e.instructions,
      time: e.time,
      distance: e.distance,
      // ensure shape matches ProgramExerciseProps
      exercise: related ?? { id: "", name: "", description: "", video_url: "" },
    };
  });

  //days completed
  const { data: completed, error: completedError } = await supabase
    .from("days-completed")
    .select()
    .eq("program_id", program.id)
    .order("week", { ascending: true })
    .order("day", { ascending: true });

  if (!completed || completedError) {
    console.log(completedError);
    return null;
    //TODO: Maybe redirect back
  }

  return (
    <DayWeekUser
      program={program}
      exercises={normalizedExercises}
      completed={completed}
    />
  );
}
