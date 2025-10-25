"use client";
import React, { useState } from "react";
import { AllExercisesProps } from "./day-week-selector";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { addExercise } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function AddExercise({
  exercises,
  programId,
  week,
  day,
  order,
}: {
  exercises: AllExercisesProps[];
  programId: string;
  week: number;
  day: number;
  order: number;
}) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleSelect = async (exerciseId: string) => {
    setOpen(false);

    toast.loading("Adding exercise");

    const res = await addExercise({
      exerciseId,
      programId,
      week,
      day,
      order,
    });

    toast.dismiss();

    if (res.success) {
      toast.success("Exercise Added");
      router.refresh();
    } else {
      toast.error("Error adding exercise");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild className="flex-1">
        <Button variant="outline" className="w-full" size="lg">
          Add Exercise
        </Button>
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
              onClick={() => handleSelect(exercise.id)}
              className="w-full py-5"
            >
              {exercise.name}
            </Button>
          ))}
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="destructive">Cancel</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
