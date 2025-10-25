"use server";
import { createClient } from "@/lib/supabase/server";
import { CompletedProps } from "./day-week-user";

export async function changeCompleted(props: CompletedProps) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("days-completed")
    .update({
      completed: !props.completed,
    })
    .eq("id", props.id);

  if (error) {
    console.error(error);

    return {
      success: false,
    };
  }

  return {
    success: true,
  };
}
