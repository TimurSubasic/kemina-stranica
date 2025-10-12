"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import type { ProgramExerciseInput } from "./day-setup";
import { Textarea } from "@/components/ui/textarea";

interface ExerciseProps {
  id: string;
  name: string;
  description?: string;
  video_url?: string;
}

interface Props {
  exercise: ExerciseProps;
  value: ProgramExerciseInput;
  onChange: (data: Partial<ProgramExerciseInput>) => void;
  onRemove: () => void;
}

export default function ExerciseRow({
  exercise,
  value,
  onChange,
  onRemove,
}: Props) {
  const [open, setOpen] = useState(false);
  const [weightType, setWeightType] = useState("KG");

  return (
    <div className="flex gap-5 items-center justify-center border p-3 rounded-md">
      <div className="flex-1">
        <p className="font-semibold">{exercise.name}</p>
      </div>

      <div className="flex flex-col gap-2">
        {/* Edit dialog */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button variant="secondary" className="w-full">
              Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Exercise Info</DialogTitle>
              <DialogDescription>
                Sets, reps, weight, and instructions
              </DialogDescription>
            </DialogHeader>

            <div className="grid gap-4">
              {/* Sets */}
              <Field>
                <FieldLabel>Sets</FieldLabel>
                <Select
                  onValueChange={(v) => onChange({ sets: parseInt(v) })}
                  defaultValue={value.sets ? value.sets.toString() : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select sets" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n} {n === 1 ? "set" : "sets"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              {/* Reps */}
              <Field>
                <FieldLabel>Reps</FieldLabel>
                <Select
                  onValueChange={(v) => onChange({ reps: parseInt(v) })}
                  defaultValue={value.reps ? value.reps.toString() : ""}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select reps" />
                  </SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 20 }, (_, i) => i + 1).map((n) => (
                      <SelectItem key={n} value={n.toString()}>
                        {n}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </Field>

              {/* Weight */}
              <Field>
                <FieldLabel>Weight</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    type="number"
                    step="any"
                    placeholder="100"
                    onChange={(e) => onChange({ weight: e.target.value })}
                  />
                  <InputGroupAddon align={"inline-end"}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <InputGroupButton
                          variant="ghost"
                          aria-label="Weight Type"
                        >
                          {weightType}
                          <ChevronDown />
                        </InputGroupButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setWeightType("KG")}>
                          KG
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setWeightType("LBS")}>
                          LBS
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              {/* Instructions */}
              <Field>
                <FieldLabel>Instructions</FieldLabel>
                <Textarea
                  placeholder="Example: Slow tempo, focus on form..."
                  defaultValue={value.instructions || ""}
                  onChange={(e) => onChange({ instructions: e.target.value })}
                />
              </Field>
            </div>

            <DialogFooter>
              <DialogClose asChild>
                <Button variant="destructive">Cancel</Button>
              </DialogClose>
              <Button onClick={() => setOpen(false)}>Save</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Remove */}
        <Button variant="destructive" className="w-full" onClick={onRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
}
