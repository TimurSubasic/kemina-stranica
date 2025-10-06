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
      <div className="p-5 mt-10">
        <div className="flex items-center justify-between mb-5">
          <h1 className="text-2xl font-bold">Exercises</h1>
          <a href="/admin/exercises/create">
            <Button>Create Exercise</Button>
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {exercises.map((exercise) => (
            <div
              key={exercise.id}
              className="border rounded-lg p-4 shadow hover:shadow-lg transition"
            >
              <h2 className="text-xl font-semibold mb-2">{exercise.name}</h2>
              <p className="text-gray-600 mb-4">{exercise.description}</p>
              {exercise.video_url && (
                <video
                  src={exercise.video_url}
                  controls
                  loop
                  className="w-full h-auto rounded"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    );
}
