"use server";

import { createClient } from "@/lib/supabase/server";

interface SelectedExercise {
  id: string;
  video_url: string;
}

export async function deleteExercises(exercises: SelectedExercise[]) {
  if (!exercises || exercises.length === 0) {
    return {
      error: "Error getting exercises",
    };
  }

  const supabase = await createClient();

  for (const exercise of exercises) {
    // Delete exercise from table
    const { error: dbError } = await supabase
      .from("exercises")
      .delete()
      .eq("id", exercise.id);

    if (dbError) {
      console.error("Error deleting exercise:", dbError);
      return {
        success: false,
        message: "Error deleting exercises",
      };
    }

    // Delete video from storage
    if (exercise.video_url) {
      const { error: storageError } = await supabase.storage
        .from("videos") // Replace with your bucket
        .remove([exercise.video_url]);

      if (storageError) {
        console.error("Error deleting video from storage:", storageError);
        return {
          success: false,
          message: "Error deleting video",
        };
      }
    }
  }

  return {
    success: true,
    message: "Exercises deleted",
  };
}
