"use server";

import { createClient } from "@/lib/supabase/server";

interface EditProps {
  props: {
    formData: FormData;
  };
}

export async function editExercise({ props }: EditProps) {
  const supabase = await createClient();

  const weightValue = props.formData.get("weightValue")?.toString() || "";
  const weightType = props.formData.get("weightType")?.toString() || "";

  const weight = weightValue ? `${weightValue} ${weightType}` : null;

  const distanceValue = props.formData.get("distanceValue")?.toString() || "";
  const distanceType = props.formData.get("distanceType")?.toString() || "";

  const distance = distanceValue ? `${distanceValue} ${distanceType}` : null;

  const { error } = await supabase
    .from("program-exercises")
    .update({
      sets: props.formData.get("sets"),
      reps: props.formData.get("reps"),
      weight: weight,
      time: props.formData.get("time"),
      distance: distance,
      instructions: props.formData.get("instructions"),
    })
    .eq("id", props.formData.get("id"));
  if (error) {
    console.error(error);
    return {
      success: false,
    };
  } else
    return {
      success: true,
    };
}

export async function deleteExercise(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("program-exercises")
    .delete()
    .eq("id", id);

  if (error) {
    console.error(error);
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}

export async function addExercise({
  exerciseId,
  programId,
  week,
  day,
  order,
}: {
  exerciseId: string;
  programId: string;
  week: number;
  day: number;
  order: number;
}) {
  const supabase = await createClient();

  const { error } = await supabase.from("program-exercises").insert({
    exercise_id: exerciseId,
    program_id: programId,
    week,
    day,
    order,
  });

  if (error) {
    console.error(error);
    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}
