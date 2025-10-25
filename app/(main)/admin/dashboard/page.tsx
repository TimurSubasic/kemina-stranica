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

  return (
    <div className="max-w-6xl mx-auto p-5">
      {/* Users box */}
      <div className="flex flex-col gap-4 text-xl font-semibold border rounded p-10 w-fit">
        <div className="flex gap-2">
          <p className="font-bold">Total Users:</p>

          <p>{active.length + inactive.length}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-primary">Active:</p>

          <p>{active.length}</p>
        </div>

        <div className="flex gap-2">
          <p className="text-destructive">Inactive:</p>

          <p>{inactive.length}</p>
        </div>

        <Link className="w-full" href="/admin/users">
          <Button className="w-full" size="lg">
            Manage
          </Button>
        </Link>
      </div>
    </div>
  );
}
