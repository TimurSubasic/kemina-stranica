import { createClient } from "@/lib/supabase/server";
import DeleteExercise from "./delete-exercise";

export default async function ExercisesPage() {
  const supabase = await createClient();

  const { data: exercises, error } = await supabase
    .from("exercises")
    .select("*")
    .order("name", { ascending: true });

  if (error || !exercises) {
    return <div>No exercises found.</div>;
  }

  return (
    <div className="space-y-4">
      <DeleteExercise exercises={exercises} />
    </div>
  );
}
