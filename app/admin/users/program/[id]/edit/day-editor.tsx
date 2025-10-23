"use client";
import React from "react";
import { AllExercisesProps, ProgramExerciseProps } from "./day-week-selector";
import { BadgeCheck, BadgeX } from "lucide-react";
import AddExercise from "./add-exercise";
import Reorder from "./reorder";
import EditExercise from "./edit-exercise";

export default function DayEditor({
  programId,
  day,
  week,
  exercises,
  completed,
  allExercises,
}: {
  programId: string;
  day: number;
  week: number;
  exercises: ProgramExerciseProps[];
  completed: boolean;
  allExercises: AllExercisesProps[];
}) {
  if (!exercises.length)
    return (
      <div>
        <p className="text-muted-foreground mb-5">No exercises for this day.</p>

        <AddExercise
          exercises={allExercises}
          programId={programId}
          week={week}
          day={day}
          order={exercises.length + 1}
        />
      </div>
    );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between font-semibold">
        <h2>
          Week {week}, Day {day}
        </h2>
        {completed ? (
          <div className="text-primary flex items-center gap-1">
            <BadgeCheck />
            Completed
          </div>
        ) : (
          <div className="text-destructive flex items-center gap-1">
            <BadgeX />
            In progress
          </div>
        )}
      </div>

      {/* EXERCISES  */}
      {exercises.map((ex) => (
        <div key={ex.id}>
          <EditExercise exercise={ex} />
        </div>
      ))}

      {/* Buttons */}
      <div className="my-10 border border-primary rounded" />
      <div className="flex flex-row gap-5 w-full">
        <Reorder exercises={exercises} />
        <AddExercise
          exercises={allExercises}
          programId={programId}
          week={week}
          day={day}
          order={exercises.length + 1}
        />
      </div>
    </div>
  );
}
