import UserItem from "@/components/user-item";
import { createClient } from "@/lib/supabase/server";
import React, { Suspense } from "react";

export default async function UserManagement() {
  const supabase = createClient();

  const { data: users } = await (await supabase)
    .from("users")
    .select("*")
    .not("role", "eq", "admin")
    .order("name", { ascending: true });

  if (!users || users.length === 0) {
    return (
      <div className="text-2xl font-bold text-center w-full">
        No Users Found
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-5 max-w-3xl mx-auto my-5 p-5">
      <Suspense fallback={<p>Loading users...</p>}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </Suspense>
    </div>
  );
}
