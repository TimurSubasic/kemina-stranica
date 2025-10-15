import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";
import DayWeekSelector from "./day-week-selector";

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
    //? maybe redirect back but not now
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

  const { data: completed, error: completedError } = await supabase
    .from("days-completed")
    .select()
    .eq("program_id", program.id);

  if (!completed || completedError) {
    console.log(completedError);
    return null;
    //? Maybe redirect back
  }

  return (
    <DayWeekSelector
      programId={program.id}
      totalDays={program.days}
      exercises={normalizedExercises}
      completed={completed || []}
    />
  );
}
