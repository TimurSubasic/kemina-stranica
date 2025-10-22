import React from "react";
import ExerciseItem from "./exercise-item";

interface ExerciseInfoProps {
  exercise: {
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
  };
}

export default function ExerciseInfo({ exercise }: ExerciseInfoProps) {
  return (
    <div className="border p-4 rounded-md space-y-5 shadow-lg ">
      <ExerciseItem exercise={exercise.exercise} />
      <div className="grid grid-cols-2  gap-10 text-lg font-semibold text-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-primary font-bold uppercase">Sets</p>
          <p>{exercise.sets}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-primary font-bold uppercase">Reps</p>
          <p>{exercise.reps}</p>
        </div>
        {exercise.weight && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-primary font-bold uppercase">Weight</p>
            <p>{exercise.weight}</p>
          </div>
        )}
        {exercise.time && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-primary font-bold uppercase">Time</p>
            <p>{exercise.time}</p>
          </div>
        )}
        {exercise.distance && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-primary font-bold uppercase">Distance</p>
            <p>{exercise.distance}</p>
          </div>
        )}
      </div>
      {exercise.instructions && (
        <p className="text-lg text-center my-5">{exercise.instructions}</p>
      )}
    </div>
  );
}
