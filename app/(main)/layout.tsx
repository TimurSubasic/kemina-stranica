import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Toaster } from "sonner";
import Navbar from "@/components/navbar";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SidebarProvider defaultOpen={false}>
      <SidebarInset>
        <Navbar />
        <main className="flex-1">{children}</main>
        <Toaster />
      </SidebarInset>
      <AppSidebar side="right" />
    </SidebarProvider>
  );
}
