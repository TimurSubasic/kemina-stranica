import React from "react";
import { Button } from "./ui/button";

interface ExerciseItemProps {
  exercise: {
    id: string;
    name: string;
    description: string;
    video_url: string;
  };
}

export default function ExerciseItem({ exercise }: ExerciseItemProps) {
  return (
    <a href={`/exercise/${exercise.id}`} className="flex-1 block">
      <Button
        variant="outline"
        size="lg"
        className="w-full py-10 text-base font-semibold"
      >
        {exercise.name}
      </Button>
    </a>
  );
}
