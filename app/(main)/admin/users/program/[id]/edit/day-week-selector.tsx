"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import DayEditor from "./day-editor";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { deleteProgram } from "./actions";
import { useRouter } from "next/navigation";

export interface ProgramExerciseProps {
  id: string;
  week: number;
  day: number;
  order: number;
  sets: number;
  reps: number;
  weight?: string;
  instructions?: string;
  time?: string;
  distance?: string;
  exercise: {
    id: string;
    name: string;
    description: string;
    video_url: string;
  };
}

export interface CompletedProps {
  id: string;
  program_id: string;
  day: number;
  week: number;
  completed: boolean;
}

export interface AllExercisesProps {
  id: string;
  name: string;
}

interface UserProps {
  id: string;
  name: string;
  role: string;
}

export default function DayWeekSelector({
  programId,
  totalDays,
  exercises,
  completed,
  allExercises,
  user,
}: {
  programId: string;
  totalDays: number;
  exercises: ProgramExerciseProps[];
  completed: CompletedProps[];
  allExercises: AllExercisesProps[];
  user: UserProps;
}) {
  const nextDay = completed.find((d) => !d.completed);

  const [week, setWeek] = useState(nextDay?.week || 1);
  const [day, setDay] = useState(nextDay?.day || 1);

  const [open, setOpen] = useState(false);
  const router = useRouter();

  const filteredExercises = exercises.filter(
    (ex) => ex.week === week && ex.day === day
  );

  const isCompleted = completed.find(
    (comp) => comp.week === week && comp.day === day
  )?.completed;

  const handleDelete = async () => {
    setOpen(false);
    toast.loading("Deleting program...");

    const res = await deleteProgram({
      userId: user.id,
      programId,
    });

    toast.dismiss();

    if (res.success) {
      toast.success("Program deleted");
      router.replace("/admin/users");
    } else {
      toast.error(res.message);
      router.refresh();
    }
  };

  return (
    <div className="space-y-4 mb-5 p-5">
      <div className="text-lg font-semibold">{user.name}</div>
      <div className="flex gap-4">
        <Select
          onValueChange={(v) => setWeek(Number(v))}
          defaultValue={week.toString()}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Week" />
          </SelectTrigger>
          <SelectContent>
            {[1, 2, 3, 4].map((w) => (
              <SelectItem key={w} value={String(w)}>
                Week {w}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          onValueChange={(v) => setDay(Number(v))}
          defaultValue={day.toString()}
        >
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: totalDays }).map((_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>
                Day {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <DayEditor
        programId={programId}
        week={week}
        day={day}
        exercises={filteredExercises}
        completed={isCompleted || false}
        allExercises={allExercises}
      />
      <div className="my-10 border border-destructive rounded" />
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="flex-1">
          <Button className="w-full" variant="destructive" size="lg">
            Delete
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>
            Are you sure you want to delete this program?
          </DialogTitle>

          <div className="mb-10">This action cannot be undone!</div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
