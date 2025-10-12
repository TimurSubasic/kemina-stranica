import { createClient } from "@/lib/supabase/server";
import React from "react";
import DaySetup from "./day-setup";

export default async function SetupProgram({
  days,
  programId,
}: {
  days: number;
  programId: string;
}) {
  const supabase = await createClient();

  const { data: exercises, error } = await supabase
    .from("exercises")
    .select()
    .order("name", { ascending: true });

  if (!exercises || error) {
    console.log(error);
    return <p>No exercises found</p>;
  }

  return (
    <div className="flex flex-col gap-10 p-5">
      {Array.from({ length: days }, (_, i) => (
        <DaySetup
          key={i + 1}
          day={i + 1}
          exercises={exercises}
          programId={programId}
        />
      ))}
    </div>
  );
}
