import {
  Dumbbell,
  Home,
  ShieldUser,
  Users,
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

// Menu items.
const items = [
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

export function AdminSidebar() {
  return (
    <Sidebar side="right">
      <SidebarContent>
        <SidebarTrigger className="rotate-180 m-5" />
        <SidebarGroup>
          <SidebarGroupLabel>Admin</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
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
