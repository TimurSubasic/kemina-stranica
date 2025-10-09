"use server";

import { createClient } from "@/lib/supabase/server";

interface programProps {
  props: {
    formData: FormData;
    userId: string;
  };
}

export async function createProgram({ props }: programProps) {
  const name = props.formData.get("name") as string;

  const days = props.formData.get("days") as string;

  const userId = props.userId as string;

  const supabase = await createClient();

  const { data, error } = await supabase.from("user-programs").insert([
    {
      user_id: userId,
      name: name,
      days: days,
    },
  ]);

  if (error) {
    console.error("Error inserting data:", error);
    return {
      error: "Error inserting data",
    };
  } else {
    console.log("Inserted data:", data);
    return {
      success: true,
    };
  }
}
