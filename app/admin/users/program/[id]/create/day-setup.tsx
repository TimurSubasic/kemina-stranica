"use client";

import React, { startTransition, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CirclePlus } from "lucide-react";
import ExerciseRow from "./exercise-row";
import { addExercisesToProgram, changeToActive } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface ExerciseProps {
  id: string;
  name: string;
  description?: string;
  video_url?: string;
}

export interface ProgramExerciseInput {
  exercise_id: string;
  order: number;
  sets: number;
  reps: number;
  weight?: string;
  instructions?: string;
  time?: string;
  distance?: string;
  day: number;
}

interface DaySetupProps {
  exercises: ExerciseProps[];
  day: number;
  finalDay: number;
  programId: string;
  userId: string;
}

export default function DaySetup({
  exercises,
  day,
  finalDay,
  programId,
  userId,
}: DaySetupProps) {
  const [selectedExercises, setSelectedExercises] = useState<ExerciseProps[]>(
    []
  );
  const [exerciseData, setExerciseData] = useState<ProgramExerciseInput[]>([]);
  const [open, setOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [finished, setFinished] = useState(false);

  const router = useRouter();

  const handleSelect = (exercise: ExerciseProps) => {
    if (selectedExercises.some((ex) => ex.id === exercise.id)) return;
    setSelectedExercises((prev) => [...prev, exercise]);
    setExerciseData((prev) => [
      ...prev,
      {
        exercise_id: exercise.id,
        order: prev.length + 1,
        sets: 1,
        reps: 1,
        weight: "",
        instructions: "",
        time: "",
        distance: "",
        day,
      },
    ]);
  };

  const handleChange = (index: number, data: Partial<ProgramExerciseInput>) => {
    setExerciseData((prev) =>
      prev.map((ex, i) => (i === index ? { ...ex, ...data } : ex))
    );
  };

  const removeExercise = (index: number) => {
    setSelectedExercises((prev) => prev.filter((_, i) => i !== index));
    setExerciseData((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await addExercisesToProgram({
        programId,
        day,
        items: exerciseData,
      });
      toast.success(`Day ${day} saved successfully`);
      setFinished(true);
      if (finalDay === day) {
        try {
          await changeToActive({ userId });

          startTransition(() => {
            router.refresh();
          });
        } catch (e) {
          console.error(e);
          toast.error("Error occured");
        }
      }
    } catch (e) {
      console.error(e);
      toast.error("Error saving day");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div
      className={`my-5 p-5 flex flex-col items-center gap-5 w-full max-w-4xl mx-auto border border-border rounded-md ${
        finished && "hidden"
      } `}
    >
      <p className="text-base font-bold">Day: {day}</p>

      {/* Selected Exercises */}
      <div className="flex flex-col w-full gap-5">
        {selectedExercises.map((exercise, index) => (
          <ExerciseRow
            key={exercise.id}
            exercise={exercise}
            value={exerciseData[index]}
            onChange={(data) => handleChange(index, data)}
            onRemove={() => removeExercise(index)}
          />
        ))}
      </div>

      {/* Add Exercises */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger className="w-full py-5 flex items-center justify-center gap-3 outline outline-primary rounded bg-secondary text-primary hover:bg-primary/20 duration-150">
          <CirclePlus />
          Add Exercise
        </DialogTrigger>

        <DialogContent>
          <DialogTitle className="text-center mb-3">
            Click to add exercise
          </DialogTitle>
          <div className="grid grid-cols-1 gap-4">
            {exercises.map((exercise) => (
              <Button
                key={exercise.id}
                variant="outline"
                onClick={() => handleSelect(exercise)}
                className="w-full py-5"
              >
                {exercise.name}
              </Button>
            ))}
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="destructive">Close</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {selectedExercises.length > 0 && (
        <Button onClick={handleSave} disabled={saving} className="w-full mt-3">
          {saving ? "Saving..." : "Save Day"}
        </Button>
      )}
    </div>
  );
}
