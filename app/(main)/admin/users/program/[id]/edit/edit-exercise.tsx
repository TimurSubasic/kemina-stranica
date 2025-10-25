"use client";
import React, { useEffect, useState } from "react";
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
import { ChevronDown } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import ExerciseInfo from "@/components/exercise-info";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { deleteExercise, editExercise } from "./actions";

export default function EditExercise({
  exercise,
}: {
  exercise: ProgramExerciseProps;
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const [weightType, setWeightType] = useState("KG");
  const [distanceType, setDistanceType] = useState("M");

  useEffect(() => {
    if (open) {
      if (exercise.weight) {
        setWeightType(exercise.weight.split(" ")[1]);
      }
      if (exercise.distance) {
        setDistanceType(exercise.distance.split(" ")[1]);
      }
    }
  }, [open, exercise]);

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
    setOpen(false);
    const res = await editExercise(data);

    toast.dismiss();

    if (res.success) {
      toast.success("Exercise updated");
      router.refresh();
    } else {
      toast.error("Error updating exercise");
    }
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

    // Block all other keys
    evt.preventDefault();
  };

  <input type="text" onKeyDown={(e) => isNumberKey(e, e.currentTarget)} />;

  return (
    <div>
      <ExerciseInfo exercise={exercise} />

      {/* buttons */}
      <div className="flex w-full gap-2 my-2">
        <Button
          onClick={() => handleDelete(exercise.id)}
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
            <form
              onSubmit={(e) => {
                handleSave(exercise.id, e);
              }}
            >
              <div className="grid gap-4">
                {/* Sets */}
                <Field>
                  <FieldLabel>Sets</FieldLabel>
                  <Select defaultValue={exercise.sets.toString()} name="sets">
                    <SelectTrigger id="sets" name="sets">
                      <SelectValue
                        defaultValue={exercise.sets}
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
                  <Select defaultValue={exercise.reps.toString()} name="reps">
                    <SelectTrigger id="reps" name="reps">
                      <SelectValue
                        defaultValue={exercise.reps}
                        placeholder="Select reps"
                      />
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
                      defaultValue={exercise.weight?.split(" ")[0]}
                      type="number"
                      step="any"
                      onKeyDown={(e) => isNumberKey(e, e.currentTarget)}
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
                          <DropdownMenuItem onClick={() => setWeightType("KG")}>
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
                  <Input
                    defaultValue={exercise.time}
                    placeholder="1 min 30s"
                    name="time"
                    id="time"
                  />
                </Field>

                {/* Distance */}
                <Field>
                  <FieldLabel>Distance</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      defaultValue={exercise.distance?.split(" ")[0]}
                      type="number"
                      step="any"
                      onKeyDown={(e) => isNumberKey(e, e.currentTarget)}
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
                    defaultValue={exercise.instructions}
                  />
                </Field>

                <input type="hidden" name="weightType" value={weightType} />
                <input type="hidden" name="distanceType" value={distanceType} />
              </div>

              <DialogFooter className="mt-5">
                <DialogClose asChild>
                  <Button variant="destructive">Cancel</Button>
                </DialogClose>
                <Button type="submit">Save</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
