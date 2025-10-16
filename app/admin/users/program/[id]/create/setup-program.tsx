import { createClient } from "@/lib/supabase/server";
import React from "react";
import DaySetup from "./day-setup";
import { changeToActive } from "./actions";
import { redirect } from "next/navigation";

export default async function SetupProgram({
  days,
  programId,
  userId,
}: {
  days: number;
  programId: string;
  userId: string;
}) {
  const supabase = await createClient();

  const { data: exercises, error } = await supabase
    .from("exercises")
    .select()
    .order("name", { ascending: true });

  if (!exercises || error) {
    console.log(error);
    return <p>No exercises found, please refresh the page!</p>;
  }

  const { data: daysCompleted, error: daysCompletedError } = await supabase
    .from("days-completed")
    .select("day")
    .eq("program_id", programId);

  if (!daysCompleted || daysCompletedError) {
    console.error(daysCompletedError);
  }

  const daysSet = daysCompleted?.map((d) => d.day) || [];

  const allDaysSet = Array.from({ length: days }, (_, i) => i + 1).every(
    (dayNumber) => daysSet.includes(dayNumber)
  );

  if (allDaysSet) {
    const res = await changeToActive({ userId });

    if (res.success) {
      redirect(`/admin/users/program/${userId}`);
    }
  }

  return (
    <div className="flex flex-col gap-10 p-5">
      {Array.from({ length: days }, (_, i) => (
        <DaySetup
          key={i + 1}
          day={i + 1}
          exercises={exercises}
          programId={programId}
          userId={userId}
          daysSet={daysSet}
        />
      ))}
    </div>
  );
}
