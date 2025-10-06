import ExerciseDetails from "@/components/exercise-details";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export default async function Exercise({ params }: { params: { id: string } }) {
  const supabase = await createClient();
  const { id } = await params;
  const { data: exercise, error } = await supabase
    .from("exercises")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !exercise) {
    return <div className="p-6 text-red-500">Exercise not found</div>;
  } else return <ExerciseDetails exercise={exercise} />;
}
