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

    const form = e.currentTarget;

    const formData = new FormData(form);

    const fileInput = formData.get("video") as File | null;
    if (fileInput && fileInput.size > 50 * 1024 * 1024) {
      setError("File size should be less than 50MB");
      setIsLoading(false);
      return;
    }

    toast.loading("Creating exercise...");

    const res = await createExercise(formData);

    toast.dismiss();

    if (res.error) setError(res.error);

    if (res.success) {
      toast.success("Exercise created successfully");
      //reset form data
      form.reset();
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

      <div className="flex items-center justify-between">
        <Label>Exercise Video</Label>
        <Label className="text-muted-foreground text-sm font-semibold">
          Max 50MB
        </Label>
      </div>

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
