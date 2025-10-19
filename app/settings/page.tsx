import Navbar from "@/components/navbar";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
      <Navbar />
      <div className="max-w-md mx-auto w-full mt-10 mb-5">
        <form>
          <FieldSet>
            <FieldLegend>User Settings</FieldLegend>

            <FieldGroup>
              <Field>
                <FieldLabel>Change Name</FieldLabel>
                <Input id="name" name="name" placeholder={user.name} />
              </Field>

              <Field>
                <FieldLabel>Change Email</FieldLabel>
                <Input
                  id="name"
                  name="name"
                  type="email"
                  placeholder={user.email}
                />
              </Field>
            </FieldGroup>
          </FieldSet>
        </form>
      </div>
    </div>
  );
}
