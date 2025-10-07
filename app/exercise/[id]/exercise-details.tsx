"use client";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../../../components/ui/button";
import { ArrowBigLeftDash } from "lucide-react";

interface ExerciseDetailsProps {
  exercise: {
    id: string;
    name: string;
    description: string;
    video_url: string;
  };
}

export default function ExerciseDetails({ exercise }: ExerciseDetailsProps) {
  const router = useRouter();

  return (
    <div className="p-5 max-w-4xl mx-auto">
      <Button
        variant="outline"
        onClick={() => router.back()}
        className="mb-5 text-primary"
      >
        <ArrowBigLeftDash className="size-7" />
        Back
      </Button>

      <div className="flex flex-col gap-6 items-center">
        <h1 className="text-3xl font-bold">{exercise.name}</h1>

        <p className="text-lg text-secondary-foreground">
          {exercise.description}
        </p>

        <video
          src={exercise.video_url}
          controls
          loop
          className="w-full rounded-md border border-muted"
        />
      </div>
    </div>
  );
}
