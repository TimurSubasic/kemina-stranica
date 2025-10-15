"use client";
import React, { useState } from "react";
import { ProgramExerciseProps } from "./day-week-selector";
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
import { BadgeCheck, BadgeX, ChevronDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ExerciseInfo from "@/components/exercise-info";

export default function DayEditor({
  programId,
  day,
  week,
  exercises,
  completed,
}: {
  programId: string;
  day: number;
  week: number;
  exercises: ProgramExerciseProps[];
  completed: boolean;
}) {
  //! so not unused
  console.log("Program Id: " + programId);

  const [open, setOpen] = useState(false);
  const [weightType, setWeightType] = useState("KG");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [weight, setWeight] = useState("");
  const [instructions, setInsturctions] = useState("");

  const handleSave = (id: string) => {
    console.log(sets);
    console.log(reps);
    console.log(weight);
    console.log(instructions);
    console.log("Exercise Id: " + id);

    setSets("");
    setReps("");
    setWeightType("");
    setWeight("");
    setInsturctions("");
    setOpen(false);
  };

  const handleCancel = () => {
    setSets("");
    setReps("");
    setWeightType("");
    setWeight("");
    setInsturctions("");
    setOpen(false);
  };
  if (!exercises.length)
    return <p className="text-muted-foreground">No exercises for this day.</p>;

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between font-semibold">
        <h2>
          Week {week}, Day {day}
        </h2>
        {completed ? (
          <div className="text-primary flex items-center gap-1">
            <BadgeCheck />
            Completed
          </div>
        ) : (
          <div className="text-destructive flex items-center gap-1">
            <BadgeX />
            In progress
          </div>
        )}
      </div>

      {exercises.map((ex) => {
        const exerciseObj = Array.isArray(ex.exercise)
          ? ex.exercise[0]
          : ex.exercise;
        return (
          <div key={ex.id}>
            <ExerciseInfo
              sets={ex.sets}
              reps={ex.reps}
              weight={ex.weight}
              time={ex.time}
              distance={ex.distance}
              instructions={ex.instructions}
              exercise={exerciseObj}
            />

            {/* buttons */}
            <div className="flex w-full gap-2 my-2">
              <Button
                onClick={() => console.log(ex)}
                variant="destructive"
                className="flex-1"
                size="lg"
              >
                Delete
              </Button>
              <Dialog open={open} onOpenChange={setOpen}>
                <DialogTrigger asChild>
                  <Button className="flex-1" size="lg">
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
                      <Select onValueChange={setSets} defaultValue={sets}>
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
                      <Select onValueChange={setReps} defaultValue={reps}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select reps" />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => i + 1).map(
                            (n) => (
                              <SelectItem key={n} value={n.toString()}>
                                {n}
                              </SelectItem>
                            )
                          )}
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
                          defaultValue={weight}
                          onChange={(e) =>
                            setWeight(e.target.value + weightType)
                          }
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
                              <DropdownMenuItem
                                onClick={() => setWeightType("None")}
                              >
                                None
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
                        defaultValue={instructions}
                        onChange={(e) => setInsturctions(e.target.value)}
                      />
                    </Field>
                  </div>

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="destructive" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button onClick={() => handleSave(ex.id)}>Save</Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
        );
      })}
    </div>
  );
}
