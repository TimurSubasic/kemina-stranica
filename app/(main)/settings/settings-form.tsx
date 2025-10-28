"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { changeName, deleteAccount } from "./actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

export default function SettingsForm({
  user,
}: {
  user: {
    name: string;
    email: string;
  };
}) {
  const router = useRouter();
  const [name, setName] = useState("");

  const [open, setOpen] = useState(false);

  const [nameError, setNameError] = useState("");

  const [email, setEmail] = useState("");

  const [emailError, setEmailError] = useState("");

  const handleDelete = async () => {
    setOpen(false);

    toast.loading("Deleting account...");

    const res = await deleteAccount();

    toast.dismiss();

    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
  };

  function hasAtLeastTwoLetters(str: string): boolean {
    const letters = str.replace(/[^a-zA-Z]/g, "");
    return letters.length >= 2;
  }

  const handleNameSave = async () => {
    if (!hasAtLeastTwoLetters(name)) {
      setNameError("Name must have at least 2 letters");
      return;
    }

    setNameError("");

    toast.loading("Changing name...");

    const res = await changeName(name);

    toast.dismiss();

    if (res.success) {
      toast.success(res.message);
      router.refresh();
    } else {
      toast.error(res.message);
    }
    setName("");
  };

  const handleEmailSave = async () => {
    console.log(email);

    setEmailError("Still not in function");
  };
  return (
    <div className="max-w-md mx-auto w-full mt-10 mb-5 ">
      <FieldSet>
        <FieldLegend className="mb-5 w-full text-center">
          User Settings
        </FieldLegend>

        <FieldGroup>
          <Field>
            <FieldLabel>Change Name</FieldLabel>
            <InputGroup>
              <InputGroupInput
                onChange={(e) => setName(e.target.value)}
                id="name"
                name="name"
                placeholder={user.name}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton onClick={handleNameSave} variant="secondary">
                  Save
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <p className="text-destructive text-sm">{nameError}</p>

          <Field>
            <FieldLabel>Change Email</FieldLabel>
            <InputGroup>
              <InputGroupInput
                onChange={(e) => setEmail(e.target.value)}
                id="name"
                name="name"
                type="email"
                placeholder={user.email}
              />
              <InputGroupAddon align="inline-end">
                <InputGroupButton onClick={handleEmailSave} variant="secondary">
                  Save
                </InputGroupButton>
              </InputGroupAddon>
            </InputGroup>
          </Field>

          <p className="text-destructive text-sm">{emailError}</p>
        </FieldGroup>
      </FieldSet>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild className="flex-1">
          <Button size="sm" variant="destructive" className="mt-10 mb-5">
            Delete Account
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogTitle>
            Are you sure you want to delete your account?
          </DialogTitle>

          <div className="mb-10">This action cannot be undone!</div>

          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>

            <Button variant="destructive" onClick={handleDelete}>
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
