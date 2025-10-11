"use client";

import ExerciseItem from "@/components/exercise-item";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { ChevronDown, CirclePlus } from "lucide-react";
import React, { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
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

interface ExerciseProps {
  id: string;
  name: string;
  description: string;
  video_url: string;
}

interface FullExerciseProps {
  day: number;
  exerciseId: string;
  order: number;
  sets: number;
  reps: number;
  weight: string;
  instructions: string;
  programId: string;
}

interface DaySetupProps {
  exercises: ExerciseProps[];
  day: number;
}

export default function DaySetup({ exercises, day }: DaySetupProps) {
  const [selectedExercises, setSelectedExercises] = useState<ExerciseProps[]>(
    []
  );
  const [sets, setSets] = useState<number>();
  const [reps, setReps] = useState<number>();
  const [weight, setWeight] = useState("");
  const [weightType, setWeightType] = useState("KG");

  const [popOpen, setPopOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const exercisePicker = (exercise: ExerciseProps) => {
    const exists = selectedExercises.some((ex) => ex.id === exercise.id);

    if (exists) {
      return null;
    }

    return (
      <Button
        onClick={() => handleSelect(exercise)}
        variant="outline"
        className="w-full"
      >
        {exercise.name}
      </Button>
    );
  };

  const handleSelect = (exercise: ExerciseProps) => {
    setSelectedExercises((prev) => [...prev, exercise]);
    setPopOpen(false);
    setDialogOpen(true);
  };

  const removeExercise = (exerciseId: string) => {
    setSelectedExercises((prev) => prev.filter((ex) => ex.id !== exerciseId));
  };

  return (
    <div className="my-5 p-5 flex flex-col items-center justify-center gap-5 w-full max-w-4xl mx-auto">
      <p className="text-base font-bold">Day: {day}</p>
      <div className="grid grid-cols-1 w-full gap-5">
        {selectedExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="flex gap-5 items-center justify-center"
          >
            <ExerciseItem exercise={exercise} />

            <div className="flex flex-col gap-2">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <form>
                  <DialogTrigger asChild>
                    <Button className="w-full">Edit</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Edit Exercise Info</DialogTitle>
                      <DialogDescription>
                        Make changes to exercise info. Click save when
                        you&apos;re done.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4">
                      <div className="grid gap-3">
                        <Field>
                          <FieldLabel htmlFor="sets">Sets</FieldLabel>
                          <Select name="sets" required>
                            <SelectTrigger id="sets" name="sets">
                              <SelectValue placeholder="Select sets" />
                            </SelectTrigger>
                            <SelectContent>
                              {[1, 2, 3, 4, 5].map((set) => (
                                <SelectItem key={set} value={set.toString()}>
                                  {set} {set === 1 ? "set" : "sets"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                      <div className="grid gap-3">
                        <Field>
                          <FieldLabel htmlFor="reps">Reps</FieldLabel>
                          <Select name="reps" required>
                            <SelectTrigger id="reps" name="reps">
                              <SelectValue placeholder="Select reps" />
                            </SelectTrigger>
                            <SelectContent>
                              {[
                                1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14,
                                15, 16, 17, 18, 19, 20,
                              ].map((rep) => (
                                <SelectItem key={rep} value={rep.toString()}>
                                  {rep} {rep === 1 ? "rep" : "reps"}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </Field>
                      </div>
                      <div className="grid gap-3">
                        <Field>
                          <FieldLabel htmlFor="weight">Weigh</FieldLabel>
                          <InputGroup>
                            <InputGroupInput
                              type="number"
                              step="any"
                              placeholder="100"
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
                                  <DropdownMenuItem
                                    onClick={() => setWeightType("KG")}
                                  >
                                    KG
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => setWeightType("LBS")}
                                  >
                                    LBS
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </InputGroupAddon>
                          </InputGroup>
                        </Field>
                      </div>
                    </div>
                    <DialogFooter>
                      <DialogClose asChild>
                        <Button variant="outline">Cancel</Button>
                      </DialogClose>
                      <Button type="submit">Save changes</Button>
                    </DialogFooter>
                  </DialogContent>
                </form>
              </Dialog>

              <Button
                variant="destructive"
                className="w-full"
                onClick={() => removeExercise(exercise.id)}
              >
                Remove
              </Button>
            </div>
          </div>
        ))}
      </div>
      <Popover open={popOpen} onOpenChange={setPopOpen}>
        <PopoverTrigger className="w-full py-7 flex items-center justify-center gap-5 outline outline-primary rounded bg-secondary text-primary hover:bg-primary/20 duration-150">
          <CirclePlus />
          Add Exercise
        </PopoverTrigger>

        <PopoverContent>
          <h1 className="text-center mb-5">Click on an exercise to add it</h1>
          <div className="flex flex-col gap-4 w-full">
            {exercises.map((exercise) => (
              <div key={exercise.id} className="w-full">
                {exercisePicker(exercise)}
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
