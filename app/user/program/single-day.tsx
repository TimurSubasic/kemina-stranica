"use client";
import React, { useState } from "react";
import { CompletedProps, ProgramExerciseProps } from "./day-week-user";
import { Button } from "@/components/ui/button";
import { BadgeCheck, BadgeX } from "lucide-react";
import ExerciseInfo from "@/components/exercise-info";
import { useRouter } from "next/navigation";
import { changeCompleted } from "./actions";
import { toast } from "sonner";

export default function SingleDay({
  day,
  week,
  exercises,
  completed,
}: {
  programId: string;
  day: number;
  week: number;
  exercises: ProgramExerciseProps[];
  completed: CompletedProps;
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async () => {
    toast.loading("Saving day...");
    setIsLoading(true);
    const res = await changeCompleted(completed);
    setIsLoading(false);

    toast.dismiss();

    if (res.success) {
      toast.success("Day Completed");
      router.refresh();
    } else {
      toast.error("Error saving, please try again");
    }
  };

  if (!exercises.length)
    return (
      <div>
        <p className="text-muted-foreground mb-5">No exercises for this day.</p>
      </div>
    );

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between font-semibold">
        <h2>
          Week {week}, Day {day}
        </h2>
        {completed?.completed ? (
          <div className="text-primary flex items-center gap-1">
            <BadgeCheck />
            Completed
          </div>
        ) : (
          <div className="text-destructive flex items-center gap-1">
            <BadgeX />
            Incomplete
          </div>
        )}
      </div>

      {/* EXERCISES  */}
      {exercises.map((ex) => (
        <div key={ex.id}>
          <ExerciseInfo exercise={ex} />
        </div>
      ))}

      {/* Buttons */}
      <div className="my-10 border-4 border-secondary rounded" />
      {completed.completed ? (
        <Button
          disabled={isLoading}
          className="w-full"
          size="lg"
          variant="outline"
          onClick={handleChange}
        >
          Uncomplete Day
        </Button>
      ) : (
        <Button
          disabled={isLoading}
          className="w-full"
          size="lg"
          onClick={handleChange}
        >
          Complete Day
        </Button>
      )}
    </div>
  );
}
