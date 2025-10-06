import {
  Dumbbell,
  Home,
  ShieldUser,
  Users,
  User,
  SquarePen,
  UserCog,
  LayoutDashboard,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThemeSwitcher } from "./theme-switcher";
import { LogoutButton } from "./logout-button";
import { createClient } from "@/lib/supabase/server";

// Menu items.
const adminItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Admin",
    url: "/admin",
    icon: ShieldUser,
  },
  {
    title: "Exercises",
    url: "/admin/exercises",
    icon: Dumbbell,
  },
  {
    title: "Create Exercise",
    url: "/admin/exercises/create",
    icon: SquarePen,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
];

const userItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "User",
    url: "/user",
    icon: User,
  },
  {
    title: "Dashboard",
    url: "/user/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Profile",
    url: "/user/profile",
    icon: UserCog,
  },
];

export async function AppSidebar() {
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
  } else
    return (
      <Sidebar side="right">
        <SidebarContent>
          <SidebarTrigger className="m-5" />
          <SidebarGroup>
            <SidebarGroupLabel>Menu</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {userData.role === "admin"
                  ? adminItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))
                  : userItems.map((item) => (
                      <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                          <a href={item.url}>
                            <item.icon />
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
              </SidebarMenu>
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
