"use client";
import React from "react";
import {
  Dumbbell,
  Home,
  Users,
  User,
  SquarePen,
  Cog,
  LayoutDashboard,
  Trash2,
} from "lucide-react";

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
    title: "Delete Exercise",
    url: "/admin/exercises/delete",
    icon: Trash2,
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
    <SidebarMenu>
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
                <a href={item.url}>
                  <item.icon />
                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
    </SidebarMenu>
  );
}
