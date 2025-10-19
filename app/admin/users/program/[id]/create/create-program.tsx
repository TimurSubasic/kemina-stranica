"use client";

import type React from "react";

import { startTransition, useState } from "react";
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
import { createProgram } from "./actions";
import { toast } from "sonner";
import { Spinner } from "@/components/ui/spinner";
import { useRouter } from "next/navigation";

export default function CreateProgram({ userId }: { userId: string }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const form = e.currentTarget;

    const formData = new FormData(form);

    const fileInput = formData.get("video") as File | null;
    if (fileInput && fileInput.size > 50 * 1024 * 1024) {
      setError("File size should be less than 50MB");
      setIsLoading(false);
      return;
    }

    toast.loading("Creating program...");

    const data = { props: { formData, userId } };

    const res = await createProgram(data);

    toast.dismiss();

    if (res.error) setError(res.error);

    if (res.success) {
      toast.success("Program created successfully");
      //reset form data
      form.reset();
      startTransition(() => {
        router.refresh();
      });
    }
    setIsLoading(false);
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <form onSubmit={handleCreate}>
          <FieldSet>
            <FieldLegend>Program Configuration</FieldLegend>
            <FieldDescription>Set up your program</FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="program-name">Program Name</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  placeholder="Enter program name"
                  required
                />
                <FieldDescription>
                  Choose a descriptive name for your program
                </FieldDescription>
              </Field>

              <Field>
                <FieldLabel htmlFor="days">Days per Week</FieldLabel>
                <Select name="days" required>
                  <SelectTrigger id="days" name="days">
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
                  Select the number of days per week
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldSet>

          {error && <p className="text-sm text-red-500 mb-2">{error}</p>}

          <Button
            className="w-full my-5"
            size="lg"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? <Spinner className="size-4" /> : "Create Program"}
          </Button>
        </form>
      </div>
    </div>
  );
}
