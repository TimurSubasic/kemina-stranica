"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CreateProgram() {
  const [programName, setProgramName] = useState("");
  const [days, setDays] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("[v0] Form submitted:", { programName, days });
    // Handle form submission here
  };

  return (
    <div className="mt-5 flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleSubmit}>
          <FieldSet>
            <FieldLegend>Program Configuration</FieldLegend>
            <FieldDescription>
              Set up your program with a name and duration
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="program-name">Program Name</FieldLabel>
                <Input
                  id="program-name"
                  type="text"
                  placeholder="Enter program name"
                  value={programName}
                  onChange={(e) => setProgramName(e.target.value)}
                  required
                />
                <FieldDescription>
                  Choose a descriptive name for your program
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="days">Days per Week</FieldLabel>
                <Select value={days} onValueChange={setDays} required>
                  <SelectTrigger id="days">
                    <SelectValue placeholder="Select days" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                      <SelectItem key={day} value={day.toString()}>
                        {day} {day === 1 ? "day" : "days"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FieldDescription>
                  Select the number of days per week (1-7)
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>

          <div className="mt-6 flex gap-3">
            <Button type="submit" className="flex-1">
              Create Program
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setProgramName("");
                setDays("");
              }}
            >
              Reset
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
