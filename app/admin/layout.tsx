import { AdminSidebar } from "@/components/admin-sidebar";
import Navbar from "@/components/navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import React from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <AdminSidebar />
      <main className="max-w-6xl mx-auto mt-5 flex-1">
        <Navbar />
        {children}
      </main>
    </SidebarProvider>
  );
}
