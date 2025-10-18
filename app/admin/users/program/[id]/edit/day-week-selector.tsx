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

export default function DayWeekSelector({
  programId,
  totalDays,
  exercises,
  completed,
  allExercises,
}: {
  programId: string;
  totalDays: number;
  exercises: ProgramExerciseProps[];
  completed: CompletedProps[];
  allExercises: AllExercisesProps[];
}) {
  const nextDay = completed.find((d) => !d.completed);

  const [week, setWeek] = useState(nextDay?.week || 1);
  const [day, setDay] = useState(nextDay?.day || 1);

  const filteredExercises = exercises.filter(
    (ex) => ex.week === week && ex.day === day
  );

  const isCompleted = completed.find(
    (comp) => comp.week === week && comp.day === day
  )?.completed;

  return (
    <div className="space-y-4 my-5 p-5">
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
    </div>
  );
}
