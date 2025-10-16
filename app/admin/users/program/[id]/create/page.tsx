import { createClient } from "@/lib/supabase/server";
import React from "react";
import CreateProgram from "./create-program";
import SetupProgram from "./setup-program";
import { redirect } from "next/navigation";

export default async function ProgramPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const userId = (await params).id;

  const supabase = await createClient();

  const { data: program, error: programError } = await supabase
    .from("user-programs")
    .select()
    .eq("user_id", userId)
    .single();

  if (programError) {
    console.log(programError);
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .single();

  if (!user || userError) {
    console.log(userError);
    return <div>Cant find user</div>;
  }

  if (user.role === "active") {
    redirect(`/admin/users/program/${userId}`);
  } else if (!program) {
    return (
      <div>
        {" "}
        <CreateProgram userId={userId} />{" "}
      </div>
    );
  } else
    return (
      <SetupProgram
        days={program.days}
        programId={program.id}
        userId={userId}
      />
    );
}
