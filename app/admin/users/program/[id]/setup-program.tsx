import { createClient } from "@/lib/supabase/server";
import React from "react";
import DaySetup from "./day-setup";

export default async function SetupProgram({ days }: { days: number }) {
  const supabase = await createClient();

  const { data: exercises, error } = await supabase
    .from("exercises")
    .select()
    .order("name", { ascending: true });

  if (!exercises || error) {
    console.log(error);
    return <p>No exercises found</p>;
  }

  return <DaySetup exercises={exercises} day={1} />;
}
