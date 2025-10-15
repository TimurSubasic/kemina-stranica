import React from "react";
import ExerciseItem from "./exercise-item";

interface ExerciseInfoProps {
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

export default function ExerciseInfo({
  exercise,
  sets,
  reps,
  weight,
  time,
  distance,
  instructions,
}: ExerciseInfoProps) {
  return (
    <div className="border p-2 rounded-md space-y-5">
      <ExerciseItem exercise={exercise} />
      <div className="grid grid-cols-2  gap-10 text-lg font-semibold text-center">
        <div className="flex flex-col items-center justify-center">
          <p className="text-primary font-bold uppercase">Sets</p>
          <p>{sets}</p>
        </div>
        <div className="flex flex-col items-center justify-center">
          <p className="text-primary font-bold uppercase">Reps</p>
          <p>{reps}</p>
        </div>
        {weight && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-primary font-bold uppercase">Weight</p>
            <p>{weight}</p>
          </div>
        )}
        {time && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-primary font-bold uppercase">Time</p>
            <p>{time}</p>
          </div>
        )}
        {distance && (
          <div className="flex flex-col items-center justify-center">
            <p className="text-primary font-bold uppercase">Distance</p>
            <p>{distance}</p>
          </div>
        )}
      </div>
      {instructions && (
        <p className="text-lg text-center my-5">{instructions}</p>
      )}
    </div>
  );
}
