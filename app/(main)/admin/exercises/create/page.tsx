"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  InputGroup,
  InputGroupInput,
  InputGroupAddon,
  InputGroupTextarea,
} from "@/components/ui/input-group";

import {
  ArrowBigLeftDash,
  Clipboard,
  FolderPen,
  Info,
  Video,
} from "lucide-react";
import { createExercise, isVideoUrl } from "./actions";
import { toast } from "sonner";
import { Label } from "@/components/ui/label";

export default function CreateExercise() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;

    const formData = new FormData(form);

    toast.loading("Checking video URL...");

    const url = formData.get("video_url") as string;

    const isVideo = await isVideoUrl(url);

    toast.dismiss();

    if (!isVideo) {
      setIsLoading(false);
      setError("Invalid Video URL");
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

  const pasteRef = useRef<HTMLInputElement>(null);

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      if (pasteRef.current) {
        pasteRef.current.value = text;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-5 w-full">
      <a href="/admin/exercises">
        <Button variant="outline" className="text-primary">
          <ArrowBigLeftDash className="size-7" />
          Exercises
        </Button>
      </a>

      <form
        className="grid gap-4  max-w-3xl mx-auto my-5"
        onSubmit={handleCreate}
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
            Paste URL
          </Label>
        </div>

        <InputGroup>
          <InputGroupInput
            ref={pasteRef}
            name="video_url"
            type="url"
            placeholder="Paste Video URL"
            required
          />
          <InputGroupAddon align="inline-start">
            <Video />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Button
              type="button"
              onClick={handlePaste}
              variant="ghost"
              size="sm"
            >
              <Clipboard />
            </Button>
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

        <Button size="lg" type="submit" disabled={isLoading}>
          {isLoading ? <Spinner className="size-4" /> : "Create"}
        </Button>
      </form>
    </div>
  );
}
