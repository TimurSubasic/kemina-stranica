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
import { Input } from "@/components/ui/input";

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
  const [open, setOpen] = useState(true);
  const [weightType, setWeightType] = useState("KG");
  const [distanceType, setDistanceType] = useState("M");

  const handleSave = () => {
    if (value.weight) {
      onChange({
        weight: value.weight + " " + weightType,
      });
    }

    if (value.distance) {
      onChange({
        distance: value.distance + " " + distanceType,
      });
    }

    setOpen(false);
  };

  const isNumberKey = (
    evt: React.KeyboardEvent<HTMLInputElement>,
    element: HTMLInputElement
  ) => {
    const allowedKeys = [
      "Backspace",
      "Delete",
      "ArrowLeft",
      "ArrowRight",
      "Tab",
    ];

    if (allowedKeys.includes(evt.key)) return; // allow control keys

    // Allow digits
    if (evt.key >= "0" && evt.key <= "9") return;

    // Allow one dot
    if (evt.key === "." && !element.value.includes(".")) return;

    // Allow one x
    if (evt.key === "x" && !element.value.includes("x")) return;

    // Block all other keys
    evt.preventDefault();
  };

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
                        {n} {n === 1 ? "rep" : "reps"}
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
                    onKeyDown={(e) => isNumberKey(e, e.currentTarget)}
                    placeholder="100"
                    defaultValue={value.weight ? value.weight.toString() : ""}
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

              {/* Time */}
              <Field>
                <FieldLabel>Time</FieldLabel>
                <Input
                  placeholder="1 min 30s"
                  defaultValue={value.time ? value.time.toString() : ""}
                  onChange={(e) => onChange({ time: e.target.value })}
                />
              </Field>

              {/* Distance */}
              <Field>
                <FieldLabel>Distance</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    onKeyDown={(e) => isNumberKey(e, e.currentTarget)}
                    placeholder="15"
                    defaultValue={
                      value.distance ? value.distance.toString() : ""
                    }
                    onChange={(e) => onChange({ distance: e.target.value })}
                  />
                  <InputGroupAddon align={"inline-end"}>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <InputGroupButton
                          variant="ghost"
                          aria-label="Distance Type"
                        >
                          {distanceType}
                          <ChevronDown />
                        </InputGroupButton>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => setDistanceType("m")}>
                          Meters
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => setDistanceType("Feet")}
                        >
                          Feet
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
              <Button onClick={() => handleSave()}>Save</Button>
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
