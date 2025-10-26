import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import React from "react";

export default async function AdminDashboard() {
  const supabase = await createClient();

  const { data: active, error: errorActive } = await supabase
    .from("users")
    .select()
    .eq("role", "active");

  if (!active || errorActive) {
    console.log(errorActive);

    return <div>Error getting active users</div>;
  }

  const { data: inactive, error: errorInactive } = await supabase
    .from("users")
    .select()
    .eq("role", "inactive");

  if (!inactive || errorInactive) {
    console.log(errorInactive);

    return <div>Error getting inactive users</div>;
  }

  const { data: daysComp, error: daysCompError } = await supabase
    .from("days-completed")
    .select()
    .eq("completed", true);

  if (!daysComp || daysCompError) {
    console.log(daysCompError);

    return <div>Error getting completed days</div>;
  }

  const { data: daysInc, error: daysIncError } = await supabase
    .from("days-completed")
    .select()
    .eq("completed", false);

  if (!daysInc || daysIncError) {
    console.log(daysIncError);

    return <div>Error getting incomplete days</div>;
  }

  const totalDays = daysComp.length + daysInc.length;

  const progress = (daysComp.length / daysInc.length) * 100;

  return (
    <div className="max-w-6xl mx-auto p-5 mt-5">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Users box */}
        <div className="flex flex-col gap-10 text-xl font-semibold border rounded p-10">
          <div className="flex gap-2 justify-center">
            <p className="font-bold">Total Users:</p>

            <p>{active.length + inactive.length}</p>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <p className="text-primary">Active:</p>

              <p>{active.length}</p>
            </div>

            <div className="flex gap-2">
              <p className="text-destructive">Inactive:</p>

              <p>{inactive.length}</p>
            </div>
          </div>

          <Link className="w-full" href="/admin/users">
            <Button variant="outline" className="w-full" size="lg">
              Manage
            </Button>
          </Link>
        </div>

        {/* Days box */}
        <div className="flex flex-col gap-10 text-xl font-semibold border rounded p-10">
          <div className="flex gap-2 justify-center">
            <p className="font-bold">Total Days:</p>

            <p>{totalDays}</p>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <p className="text-primary">Completed:</p>

              <p>{daysComp.length}</p>
            </div>

            <div className="flex gap-2">
              <p className="text-destructive">Incomplete:</p>

              <p>{daysInc.length}</p>
            </div>
          </div>
          {/* Progress bar */}
          {totalDays > 0 ? (
            <div className="w-full h-9 border dark:border-input rounded-md overflow-hidden bg-secondary ">
              <div
                className="h-full bg-primary transition-all  duration-300"
                style={{
                  width: `${progress}%`,
                }}
              />
            </div>
          ) : (
            <div className="w-full flex items-center justify-center text-base font-medium">
              There are 0 days
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
