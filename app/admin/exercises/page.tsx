"use client";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupTextarea,
} from "@/components/ui/input-group";
import { Spinner } from "@/components/ui/spinner";
import { Label } from "@radix-ui/react-dropdown-menu";
import { FolderPen, Info, Video } from "lucide-react";
import React, { useState } from "react";

export default function Exercises() {
  const [name, setName] = useState("");
  const [video, setVideo] = useState<File | null>(null);
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();

    console.log("Creating exercise...");
    console.log({ name, video, description });
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center absolute top-0 left-0 w-full h-full">
        <Spinner className="size-10" />
      </div>
    );
  }

  return (
    <form
      onSubmit={handleCreate}
      className="grid gap-4 w-full max-w-3xl mx-auto p-5"
    >
      <Label>Exercise Name</Label>
      <InputGroup>
        <InputGroupInput
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
        <InputGroupAddon>
          <FolderPen />
        </InputGroupAddon>
      </InputGroup>

      <Label>Exercise Video</Label>
      <InputGroup>
        <InputGroupInput
          onChange={(e) => {
            if (!e.target.files?.length) return;
            setVideo(e.target.files[0]); // store file in state
          }}
          type="file"
          accept="video/*"
        />
        <InputGroupAddon>
          <Video />
        </InputGroupAddon>
      </InputGroup>

      <Label>Exercise Description</Label>
      <InputGroup>
        <InputGroupTextarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description about how the exercise should be done"
          className="min-h-[100px] "
        />
        <InputGroupAddon align="inline-start">
          <Info />
        </InputGroupAddon>
      </InputGroup>

      <Button type="submit">Create</Button>
    </form>
  );
}
