import React from "react";
import { Button } from "./ui/button";

interface userItemProps {
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    avatar_url: string | null;
  };
}

export default function UserItem({ user }: userItemProps) {
  if (!user) {
    return <div>No User Found</div>;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-2 w-full items-center">
      <div className="w-full sm:flex-1 flex justify-between items-center p-5 outline rounded text-lg font-semibold ">
        <div className="flex flex-col items-start justify-center ">
          <p className="text-sm text-muted-foreground">Name:</p>
          <p>{user.name}</p>
        </div>

        <div
          className={`flex flex-col items-start justify-center 
           ${user.role === "active" && "text-primary"}
           ${user.role === "inactive" && "text-destructive"}
          `}
        >
          <p className="text-sm text-muted-foreground">Status:</p>
          <p>{user.role}</p>
        </div>
      </div>

      <div className="flex flex-row-reverse justify-center gap-2 sm:flex-col w-full sm:w-auto">
        <a href={`/admin/users/program/${user.id}`}>
          {user.role === "inactive" ? (
            <Button size="lg">Create Plan</Button>
          ) : (
            <Button size="lg">View Plan</Button>
          )}
        </a>
        <Button variant="destructive" size="lg">
          Delete User
        </Button>
      </div>
    </div>
  );
}
