"use client";
import React, { useState } from "react";
import { AllExercisesProps, ProgramExerciseProps } from "./day-week-selector";
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
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteExercise, editExercise } from "./actions";
import AddExercise from "./add-exercise";

export default function DayEditor({
  programId,
  day,
  week,
  exercises,
  completed,
  allExercises,
}: {
  programId: string;
  day: number;
  week: number;
  exercises: ProgramExerciseProps[];
  completed: boolean;
  allExercises: AllExercisesProps[];
}) {
  //! so not unused
  console.log("Program Id: " + programId);

  const router = useRouter();

  const [activeExerciseId, setActiveExerciseId] = useState<string | null>(null);
  const [weightType, setWeightType] = useState("KG");
  const [distanceType, setDistanceType] = useState("M");

  const handleDelete = async (id: string) => {
    toast.loading("Deleting exercise...");

    const res = await deleteExercise(id);
    toast.dismiss();

    if (res.success) {
      toast.success("Exercise deleted");
      router.refresh();
    } else {
      toast.error("Error deleting exercise");
    }
  };

  const handleSave = async (
    id: string,
    e: React.FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();
    const form = e.currentTarget;

    const formData = new FormData(form);
    formData.append("id", id);

    const data = { props: { formData } };
    toast.loading("Updating exercise...");
    setActiveExerciseId(null);
    const res = await editExercise(data);

    toast.dismiss();

    if (res.success) {
      toast.success("Exercise updated");
      router.refresh();
    } else {
      toast.error("Error updating exercise");
    }
  };

  const handleCancel = () => {
    setActiveExerciseId(null);
  };
  if (!exercises.length)
    return (
      <div>
        <p className="text-muted-foreground mb-5">No exercises for this day.</p>

        <AddExercise
          exercises={allExercises}
          programId={programId}
          week={week}
          day={day}
          order={exercises.length + 1}
        />
      </div>
    );

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

      {/* EXERCISES  */}
      {exercises.map((ex) => (
        <div key={ex.id}>
          <ExerciseInfo exercise={ex} />

          {/* buttons */}
          <div className="flex w-full gap-2 my-2">
            <Button
              onClick={() => handleDelete(ex.id)}
              variant="destructive"
              className="flex-1"
              size="lg"
            >
              Delete
            </Button>
            <Dialog
              open={activeExerciseId === ex.id}
              onOpenChange={(isOpen) =>
                setActiveExerciseId(isOpen ? ex.id : null)
              }
            >
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
                <form
                  onSubmit={(e) => {
                    handleSave(ex.id, e);
                  }}
                >
                  <div className="grid gap-4">
                    {/* Sets */}
                    <Field>
                      <FieldLabel>Sets</FieldLabel>
                      <Select defaultValue={ex.sets.toString()} name="sets">
                        <SelectTrigger id="sets" name="sets">
                          <SelectValue
                            defaultValue={ex.sets}
                            placeholder="Select sets"
                          />
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
                      <Select defaultValue={ex.reps.toString()} name="reps">
                        <SelectTrigger id="reps" name="reps">
                          <SelectValue
                            defaultValue={ex.reps}
                            placeholder="Select reps"
                          />
                        </SelectTrigger>
                        <SelectContent>
                          {Array.from({ length: 20 }, (_, i) => i + 1).map(
                            (n) => (
                              <SelectItem key={n} value={n.toString()}>
                                {n} {n === 1 ? "rep" : "reps"}
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
                          name="weightValue"
                          id="weightValue"
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

                    {/* Time */}
                    <Field>
                      <FieldLabel>Time</FieldLabel>
                      <Input placeholder="1 min 30s" name="time" id="time" />
                    </Field>

                    {/* Distance */}
                    <Field>
                      <FieldLabel>Distance</FieldLabel>
                      <InputGroup>
                        <InputGroupInput
                          type="number"
                          step="any"
                          placeholder="15"
                          name="distanceValue"
                          id="distanceValue"
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
                              <DropdownMenuItem
                                onClick={() => setDistanceType("M")}
                              >
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
                        name="instructions"
                        id="instructions"
                        defaultValue={ex.instructions}
                      />
                    </Field>

                    <input type="hidden" name="weightType" value={weightType} />
                    <input
                      type="hidden"
                      name="distanceType"
                      value={distanceType}
                    />
                  </div>

                  <DialogFooter className="mt-5">
                    <DialogClose asChild>
                      <Button variant="destructive" onClick={handleCancel}>
                        Cancel
                      </Button>
                    </DialogClose>
                    <Button type="submit">Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      ))}

      {/* Buttons */}
      <div className="my-10 border border-primary rounded" />
      <div className="flex flex-row gap-5 w-full">
        <Button variant="outline" className="flex-1" size="lg">
          Reorder
        </Button>
        <AddExercise
          exercises={allExercises}
          programId={programId}
          week={week}
          day={day}
          order={exercises.length + 1}
        />
      </div>
      <div className="my-10 border border-destructive rounded" />
      <Button variant="destructive" size="lg" className="w-full">
        Delete Program
      </Button>
    </div>
  );
}
