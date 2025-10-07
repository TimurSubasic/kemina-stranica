"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import ExerciseItem from "@/components/exercise-item";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteExercises } from "./actions";

interface ExerciseItemProps {
  exercises: {
    id: string;
    name: string;
    description: string;
    video_url: string;
  }[];
}

interface SelectedExercise {
  id: string;
  video_url: string;
}

export default function SelectExercise({ exercises }: ExerciseItemProps) {
  const [selected, setSelected] = useState<SelectedExercise[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const toggleSelect = (exercise: { id: string; video_url: string }) => {
    setSelected((prev) =>
      prev.find((x) => x.id === exercise.id)
        ? prev.filter((x) => x.id !== exercise.id)
        : [...prev, { id: exercise.id, video_url: exercise.video_url }]
    );
  };
  const handleDelete = async () => {
    if (selected.length === 0) return;
    toast.loading("Deleting exercises...");
    setIsLoading(true);

    const res = await deleteExercises(selected);

    setIsLoading(false);
    toast.dismiss();

    if (res.success) {
      toast.success(res.message);

      //  Smooth re-fetch of server data (no full reload)
      startTransition(() => {
        router.refresh();
      });

      setSelected([]);
    } else {
      toast.error(res.message);
    }
  };

  return (
    <div className="space-y-4 p-5 my-5 max-w-4xl mx-auto">
      {exercises.map((exercise) => (
        <div
          key={exercise.id}
          className="flex flex-col w-full items-center gap-3 border rounded-lg p-3 md:flex-row"
        >
          <div className="w-full md:flex-1">
            <ExerciseItem exercise={exercise} />
          </div>

          <Label className="hover:bg-destructive/30 flex items-center justify-between gap-5 rounded-lg border p-3 has-[[aria-checked=true]]:border-red-600 has-[[aria-checked=true]]:bg-red-50 dark:has-[[aria-checked=true]]:border-red-900 dark:has-[[aria-checked=true]]:bg-red-950 w-full md:w-auto">
            <div className="flex gap-4 items-center">
              <Checkbox
                id={`toggle-${exercise.id}`}
                checked={!!selected.find((x) => x.id === exercise.id)}
                onCheckedChange={() => toggleSelect(exercise)}
                className="data-[state=checked]:border-red-600 data-[state=checked]:bg-red-600 data-[state=checked]:text-white dark:data-[state=checked]:border-red-700 dark:data-[state=checked]:bg-red-700"
              />
              <div className="grid gap-1.5 font-normal">
                <p className="text-sm leading-none font-medium">
                  Delete Exercise
                </p>
                <p className="text-muted-foreground text-sm">
                  This action cannot be undone.
                </p>
              </div>
            </div>

            <Trash2 className="size-7" />
          </Label>
        </div>
      ))}

      <Button
        variant="destructive"
        disabled={selected.length === 0 || isLoading || isPending}
        onClick={handleDelete}
        size="lg"
        className="w-full"
      >
        {isPending ? "Refreshing..." : `Delete Selected (${selected.length})`}
      </Button>
    </div>
  );
}
