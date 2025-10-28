"use client";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import { deleteUser } from "./actions";
import { useRouter } from "next/navigation";

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
  const [open, setOpen] = useState(false);

  const router = useRouter();

  const handleDelete = async (id: string) => {
    setOpen(false);
    toast.loading("Deleting user...");

    const res = await deleteUser(id);

    toast.dismiss();

    if (res) {
      toast.success("User deleted");
      router.refresh();
    } else {
      toast.error("Failed to delete user");
    }
  };

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
           ${user.role === "active" && "text-emerald-500"}
           ${user.role === "inactive" && "text-destructive"}
          `}
        >
          <p className="text-sm text-muted-foreground">Status:</p>
          <p className="font-bold capitalize">{user.role}</p>
        </div>
      </div>

      <div className="flex flex-row-reverse justify-center gap-2 sm:flex-col w-full sm:w-auto">
        <a href={`/admin/users/program/${user.id}`} className="flex-1">
          {user.role === "inactive" ? (
            <Button size="lg" className="w-full">
              Create Plan
            </Button>
          ) : (
            <Button size="lg" className="w-full">
              View Plan
            </Button>
          )}
        </a>
        <div className="flex-1">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild className="flex-1">
              <Button className="w-full" variant="destructive" size="lg">
                Delete User
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogTitle>
                Are you sure you want to delete {user.name}&apos;s profile?
              </DialogTitle>

              <div className="mb-10">This action cannot be undone!</div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>

                <Button
                  variant="destructive"
                  onClick={() => handleDelete(user.id)}
                >
                  Delete
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  );
}
