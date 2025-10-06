"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FolderPen, Info, Video } from "lucide-react";
import { createExercise } from "./actions";
import { toast } from "sonner";

export default function CreateExercise() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const res = await createExercise(formData);

    if (res.error) setError(res.error);

    if (res.success) {
      toast.success("Exercise created successfully");
      e.currentTarget.reset();
    }
    setIsLoading(false);
  };

  return (
    <form
      onSubmit={handleCreate}
      className="grid gap-4 w-full max-w-3xl mx-auto p-5"
    >
      <Label>Exercise Name</Label>
      <InputGroup>
        <InputGroupInput name="name" placeholder="Name" required />
        <InputGroupAddon>
          <FolderPen />
        </InputGroupAddon>
      </InputGroup>

      <Label>Exercise Video</Label>
      <InputGroup>
        <InputGroupInput type="file" name="video" accept="video/*" required />
        <InputGroupAddon>
          <Video />
        </InputGroupAddon>
      </InputGroup>

      <Label>Exercise Description</Label>
      <InputGroup>
        <InputGroupTextarea
          name="description"
          placeholder="Description about how the exercise should be done"
          className="min-h-[100px]"
          required
        />
        <InputGroupAddon align="inline-start">
          <Info />
        </InputGroupAddon>
      </InputGroup>

      {error && <p className="text-red-500">{error}</p>}

      <Button type="submit" disabled={isLoading}>
        {isLoading ? <Spinner className="size-4" /> : "Create"}
      </Button>
    </form>
  );
}
