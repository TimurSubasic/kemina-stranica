"use client";
import React from "react";
import { Dumbbell, Home, Users, Cog, LayoutDashboard } from "lucide-react";

import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "./ui/sidebar";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

// Menu items.
const adminItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Dashboard",
    url: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "User Management",
    url: "/admin/users",
    icon: Users,
  },
  {
    title: "Exercise Management",
    url: "/admin/exercises",
    icon: Dumbbell,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Cog,
  },
];

const userItems = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Program",
    url: "/user/program",
    icon: Dumbbell,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Cog,
  },
];

export default function ClientSidebar({ isAdmin }: { isAdmin: boolean }) {
  const { toggleSidebar } = useSidebar();
  const router = useRouter();

  const handleClick = (location: string) => {
    toggleSidebar();

    router.replace(location);

    router.refresh();
  };

  return (
    <SidebarMenu className="mt-2">
      {isAdmin
        ? adminItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Button
                  onClick={() => handleClick(item.url)}
                  variant="ghost"
                  className="justify-start"
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))
        : userItems.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <Button
                  onClick={() => handleClick(item.url)}
                  variant="ghost"
                  className="justify-start"
                >
                  <item.icon />
                  <span>{item.title}</span>
                </Button>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
    </SidebarMenu>
  );
}
