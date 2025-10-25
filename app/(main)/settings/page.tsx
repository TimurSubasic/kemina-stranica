import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import React from "react";

export default async function Settings() {
  const supabase = await createClient();

  const { data: claims, error: claimsError } = await supabase.auth.getClaims();
  if (claimsError || !claims?.claims) {
    return redirect("/auth/login");
  }

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", claims?.claims.sub)
    .single();

  if (!user || userError) {
    console.log(userError);

    return <div>Cant find user</div>;
  }

  return (
    <div>
      <div className="max-w-md mx-auto w-full mt-16 mb-5 ">
        <form>
          <FieldSet>
            <FieldLegend>User Settings</FieldLegend>

            <FieldGroup>
              <Field>
                <FieldLabel>Change Name</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="name"
                    name="name"
                    placeholder={user.name}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton variant="secondary">
                      Save
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>

              <Field>
                <FieldLabel>Change Email</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="name"
                    name="name"
                    type="email"
                    placeholder={user.email}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton variant="secondary">
                      Save
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  );
}
