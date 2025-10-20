import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "./theme-switcher";
import { LogoutButton } from "./logout-button";
import { createClient } from "@/lib/supabase/server";
import ClientSidebar from "./client-sidebar";

export async function AppSidebar({
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getClaims();
  if (error || !data?.claims) {
    return null;
  }
  const { data: userData, error: userError } = await supabase
    .from("users")
    .select("*")
    .eq("id", data.claims.sub)
    .single();

  if (userError || !userData) {
    console.log("Error fetching user data:", userError?.message);
    return null;
  }

  return (
    <Sidebar {...props}>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            {/* client sidebar here */}
            {userData.role === "admin" ? (
              <ClientSidebar isAdmin={true} />
            ) : (
              <ClientSidebar isAdmin={false} />
            )}
            <div className="flex gap-2 justify-around items-center mt-10">
              <ThemeSwitcher />
              <LogoutButton />
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
