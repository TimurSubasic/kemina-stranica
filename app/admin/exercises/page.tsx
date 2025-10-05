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
import React from "react";

export default async function Exercises() {
  return (
    <div className="grid gap-4 w-full max-w-3xl mx-auto p-5">
      <Label>Exercise Name</Label>
      <InputGroup>
        <InputGroupInput placeholder="Name" />
        <InputGroupAddon>
          <FolderPen />
        </InputGroupAddon>
      </InputGroup>

      <Label>Exercise Video</Label>
      <InputGroup>
        <InputGroupInput type="file" accept="video/*" />
        <InputGroupAddon>
          <Video />
        </InputGroupAddon>
      </InputGroup>

      <Label>Exercise Description</Label>
      <InputGroup>
        <InputGroupTextarea
          placeholder="Description about how the exercise should be done"
          className="min-h-[100px] "
        />
        <InputGroupAddon align="inline-start">
          <Info />
        </InputGroupAddon>
      </InputGroup>

      <Button>Create</Button>
    </div>
  );
}
