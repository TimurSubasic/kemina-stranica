"use server";

import { createClient } from "@/lib/supabase/server";
import type { ProgramExerciseInput } from "./day-setup";

interface programProps {
  props: {
    formData: FormData;
    userId: string;
  };
}

export async function createProgram({ props }: programProps) {
  const name = props.formData.get("name") as string;

  const days = props.formData.get("days") as string;

  const userId = props.userId as string;

  const supabase = await createClient();

  const { data, error } = await supabase.from("user-programs").insert([
    {
      user_id: userId,
      name: name,
      days: days,
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
    return {
      error: "Error inserting data",
    };
  } else {
    console.log("Inserted data:", data);
    return {
      success: true,
    };
  }
}

export async function addExercisesToProgram({
  programId,
  day,
  items,
}: {
  programId: string;
  day: number;
  items: ProgramExerciseInput[];
}) {
  const supabase = await createClient();

  const rows = items.flatMap((item) =>
    [1, 2, 3, 4].map((week) => ({
      program_id: programId,
      exercise_id: item.exercise_id,
      week,
      day,
      order: item.order,
      sets: item.sets,
      reps: item.reps,
      weight: item.weight,
      instructions: item.instructions ?? null,
    }))
  );

  const { error } = await supabase.from("program-exercises").insert(rows);

  if (error) {
    console.error(error);
    throw new Error("Failed to insert exercises");
  }
}
