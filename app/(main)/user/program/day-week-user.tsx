"use client";

import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import SingleDay from "./single-day";
import { Button } from "@/components/ui/button";
import { ArrowBigLeftDash, ArrowBigRightDash } from "lucide-react";

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
interface ProgramProps {
  id: string;
  name: string;
  days: number;
}

export default function DayWeekUser({
  program,
  exercises,
  completed,
}: {
  program: ProgramProps;
  exercises: ProgramExerciseProps[];
  completed: CompletedProps[];
}) {
  const nextDay = completed.find((d) => !d.completed);

  const [week, setWeek] = useState(nextDay?.week || 1);
  const [day, setDay] = useState(nextDay?.day || 1);

  const filteredExercises = exercises.filter(
    (ex) => ex.week === week && ex.day === day
  );

  const dayCompleted = completed.find(
    (comp) => comp.week === week && comp.day === day
  );

  if (!dayCompleted) {
    console.log("Cant find day");
    return (
      <div className="mt-10 text-center">
        Can&apos;t find this day, please reload
      </div>
    );
  }
  const totalDays = program.days;

  const handleBack = () => {
    if (day !== 1) {
      const newDay = day - 1;
      setDay(newDay);
    } else if (week !== 1) {
      const newWeek = week - 1;
      setWeek(newWeek);
      setDay(totalDays);
    }
  };

  const handleNext = () => {
    if (day !== totalDays) {
      const newDay = day + 1;
      setDay(newDay);
    } else if (week !== 4) {
      const newWeek = week + 1;
      setWeek(newWeek);
      setDay(1);
    }
  };

  return (
    <div className="space-y-4 mb-5 p-5">
      <div className="text-lg font-semibold"> {program.name} </div>
      <div className="flex gap-4">
        <Select
          onValueChange={(v) => setWeek(Number(v))}
          value={week.toString()}
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

        <Select onValueChange={(v) => setDay(Number(v))} value={day.toString()}>
          <SelectTrigger className="w-[120px]">
            <SelectValue placeholder="Day" />
          </SelectTrigger>
          <SelectContent>
            {Array.from({ length: program.days }).map((_, i) => (
              <SelectItem key={i + 1} value={String(i + 1)}>
                Day {i + 1}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex w-full items-center justify-between">
        <h2>
          Week {week}, Day {day}
        </h2>
        <div className="flex gap-5">
          <Button onClick={handleBack} variant="outline">
            <ArrowBigLeftDash className="size-6" />
            Back
          </Button>

          <Button onClick={handleNext}>
            Next
            <ArrowBigRightDash className="size-6" />
          </Button>
        </div>
      </div>

      <SingleDay
        programId={program.id}
        week={week}
        day={day}
        exercises={filteredExercises}
        completed={dayCompleted}
      />
    </div>
  );
}
