import React from "react";
import { ProgramExerciseProps } from "./day-week-selector";
import ExerciseItem from "@/components/exercise-item";

export default function DayEditor({
  programId,
  day,
  week,
  exercises,
}: {
  programId: string;
  day: number;
  week: number;
  exercises: ProgramExerciseProps[];
}) {
  if (!exercises.length)
    return <p className="text-muted-foreground">No exercises for this day.</p>;

  return (
    <div className="space-y-2">
      <h2 className="font-semibold">
        Week {week}, Day {day}
      </h2>
      {exercises.map((ex) => (
        <div key={ex.id} className="border p-2 rounded-md">
          <ExerciseItem exercise={ex.exercise} />
          <p>Sets: {ex.sets}</p>
          <p>Reps: {ex.reps}</p>
          <p>Weight: {ex.weight}</p>
          <p>Program id: {programId} </p>
        </div>
      ))}
    </div>
  );
}
