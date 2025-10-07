import ExerciseItem from "@/components/exercise-item";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { createClient } from "@/lib/supabase/server";
import React from "react";

export default async function Exercises() {
  const supabase = await createClient();
  const { data: exercises } = await supabase
    .from("exercises")
    .select("*")
    .order("name", { ascending: true });

  if (!exercises)
    return (
      <div className="flex-1 items-center justify-center">
        <Spinner className="size-10" />
      </div>
    );
  else
    return (
      <div className="p-5 mt-5">
        <div className="flex flex-col gap-5 items-center justify-between mb-5 sm:flex-row">
          <h1 className="text-2xl font-bold">Exercises</h1>

          <div className="flex items-center justify-around w-full sm:w-auto gap-4">
            <a href="/admin/exercises/delete">
              <Button variant="destructive">Delete Exercise</Button>
            </a>
            <a href="/admin/exercises/create">
              <Button>Create Exercise</Button>
            </a>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((exercise) => (
            <ExerciseItem key={exercise.id} exercise={exercise} />
          ))}
        </div>
      </div>
    );
}
